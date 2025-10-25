import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from 'utils/colors';
import { Typography } from 'components/common';
import { AppWrapper } from 'components/common/AppWapper';
import { ms } from 'react-native-size-matters';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

interface LicenseItem {
  name: string;
  number: string;
  issuedDate: string;
}

interface CertificateItem {
  name: string;
}

interface LicenseStepProps {
  onNext: (payload: { licenses: LicenseItem[]; certificates: CertificateItem[] }) => void;
  onBack?: () => void;
}

const LicenseStep: React.FC<LicenseStepProps> = ({ onNext }) => {
  const [licenses, setLicenses] = useState<LicenseItem[]>([
    { name: '', number: '', issuedDate: '' },
  ]);
  const [certificates, setCertificates] = useState<CertificateItem[]>([{ name: '' }]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Fade-in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  /** ---------------------- 🗓️ Date Picker ---------------------- */
  const showDatePicker = (index: number) => {
    setSelectedIndex(index);
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
    setSelectedIndex(null);
  };

  const handleDateConfirm = (date: Date) => {
    if (selectedIndex !== null) {
      const updated = [...licenses];
      updated[selectedIndex].issuedDate = moment(date).format('YYYY-MM-DD');
      setLicenses(updated);
      clearError(`license_date_${selectedIndex}`);
    }
    hideDatePicker();
  };

  /** ---------------------- 🧠 Input Handlers ---------------------- */
  const handleInputChange = (
    type: 'license' | 'certificate',
    index: number,
    field: keyof LicenseItem | keyof CertificateItem,
    value: string,
  ) => {
    if (type === 'license') {
      const updated = [...licenses];
      updated[index][field as keyof LicenseItem] = value;
      setLicenses(updated);
      clearError(`license_${field}_${index}`);
    } else {
      const updated = [...certificates];
      updated[index][field as keyof CertificateItem] = value;
      setCertificates(updated);
      clearError(`cert_${field}_${index}`);
    }
  };

  /** ---------------------- 🚫 Clear Error ---------------------- */
  const clearError = (key: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  /** ---------------------- ✅ Validation ---------------------- */
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    licenses.forEach((license, i) => {
      if (!license.name.trim()) newErrors[`license_name_${i}`] = 'License name is required';
      if (!license.number.trim()) newErrors[`license_number_${i}`] = 'License number is required';
      if (!license.issuedDate.trim()) newErrors[`license_date_${i}`] = 'Issued date is required';
    });
    certificates.forEach((cert, i) => {
      if (!cert.name.trim()) newErrors[`cert_name_${i}`] = 'Certificate name is required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** ---------------------- ➕ Add Handlers ---------------------- */
  const handleAddLicense = () => {
    const last = licenses[licenses.length - 1];
    if (!last.name || !last.number || !last.issuedDate) {
      validateForm();
      return;
    }
    setLicenses([...licenses, { name: '', number: '', issuedDate: '' }]);
  };

  const handleAddCertificate = () => {
    const last = certificates[certificates.length - 1];
    if (!last.name) {
      validateForm();
      return;
    }
    setCertificates([...certificates, { name: '' }]);
  };

  /** ---------------------- 🔜 Next ---------------------- */
  const handleNext = () => {
    if (validateForm()) onNext({ licenses, certificates });
  };

  /** ---------------------- 🖥️ Render ---------------------- */
  return (
    <AppWrapper useSafeArea={false} Header={false}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Typography style={styles.title}>License & Certification</Typography>

        {/* 🔸 License Section */}
        {licenses.map((license, index) => (
          <View key={index} style={styles.block}>
            <TextInput
              placeholder='License Name'
              value={license.name}
              onChangeText={text => handleInputChange('license', index, 'name', text)}
              style={styles.input}
              placeholderTextColor='#999'
            />
            {errors[`license_name_${index}`] && (
              <Typography style={styles.errorText}>{errors[`license_name_${index}`]}</Typography>
            )}

            <TextInput
              placeholder='License Number'
              value={license.number}
              onChangeText={text => handleInputChange('license', index, 'number', text)}
              style={styles.input}
              placeholderTextColor='#999'
            />
            {errors[`license_number_${index}`] && (
              <Typography style={styles.errorText}>{errors[`license_number_${index}`]}</Typography>
            )}

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => showDatePicker(index)}
              style={styles.input}
            >
              <Typography
                style={{
                  color: license.issuedDate ? COLORS.BLACK : '#999',
                  fontSize: ms(13),
                }}
              >
                {license.issuedDate || 'Date Issued'}
              </Typography>
            </TouchableOpacity>
            {errors[`license_date_${index}`] && (
              <Typography style={styles.errorText}>{errors[`license_date_${index}`]}</Typography>
            )}
          </View>
        ))}

        <TouchableOpacity onPress={handleAddLicense} style={styles.addBtn}>
          <Typography style={styles.addText}>+ Add Another License</Typography>
        </TouchableOpacity>

        {/* 🔸 Certificate Section */}
        {certificates.map((cert, index) => (
          <View key={index} style={styles.block}>
            <TextInput
              placeholder='Certificate Name'
              value={cert.name}
              onChangeText={text => handleInputChange('certificate', index, 'name', text)}
              style={styles.input}
              placeholderTextColor='#999'
            />
            {errors[`cert_name_${index}`] && (
              <Typography style={styles.errorText}>{errors[`cert_name_${index}`]}</Typography>
            )}
          </View>
        ))}

        <TouchableOpacity onPress={handleAddCertificate} style={styles.addBtn}>
          <Typography style={styles.addText}>+ Add Another Certificate</Typography>
        </TouchableOpacity>

        {/* 🔸 Next Step Button */}
        <TouchableOpacity activeOpacity={0.8} onPress={handleNext}>
          <LinearGradient
            colors={[COLORS.HEADER_BACKGROUND, COLORS.HEADER_BACKGROUND]}
            style={styles.gradient}
          >
            <Typography style={styles.nextText}>Next Step</Typography>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* 🗓️ Date Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
    </AppWrapper>
  );
};

export default LicenseStep;

const styles = StyleSheet.create({
  scroll: { padding: ms(15), paddingBottom: ms(30) },
  container: { flex: 1 },
  title: {
    fontSize: ms(18),
    fontWeight: '700',
    marginBottom: ms(20),
    color: COLORS.BLACK,
  },
  block: {
    marginBottom: ms(12),
  },
  input: {
    borderWidth: 1,
    borderRadius: ms(8),
    paddingHorizontal: ms(10),
    justifyContent: 'center',
    marginBottom: ms(5),
    color: COLORS.BLACK,
    fontSize: ms(13),
    height: ms(42),
    borderColor: '#E2E2E2',
  },
  errorText: {
    color: COLORS.ERROR || 'red',
    fontSize: ms(11),
    marginBottom: ms(4),
  },
  addBtn: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: ms(8),
    padding: ms(10),
    alignItems: 'center',
    marginVertical: ms(15),
  },
  addText: {
    color: COLORS.WHITE,
    fontSize: ms(13),
    fontWeight: '600',
  },
  gradient: {
    padding: ms(14),
    borderRadius: ms(10),
    alignItems: 'center',
    marginTop: ms(10),
  },
  nextText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(14),
  },
});
