import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from 'utils/colors';
import { Typography } from 'components/common';
import { AppWrapper } from 'components/common/AppWapper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

interface Education {
  school: string;
  degree: string;
  from: string;
  to: string;
}

interface Props {
  onNext: (payload: Education[]) => void;
  onBack: () => void;
}

const EducationStep: React.FC<Props> = ({ onNext }) => {
  const [educations, setEducations] = useState<Education[]>([
    { school: '', degree: '', from: '', to: '' },
  ]);
  const [errors, setErrors] = useState<Record<number, Partial<Education>>>({});
  const [addError, setAddError] = useState<string>('');

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedField, setSelectedField] = useState<'from' | 'to' | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  /** 🧠 Handle Input Change */
  const handleInputChange = (index: number, field: keyof Education, value: string) => {
    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);

    // clear error if user starts typing
    if (errors[index]?.[field]) {
      setErrors(prev => ({
        ...prev,
        [index]: { ...prev[index], [field]: '' },
      }));
    }

    if (addError) setAddError('');
  };

  /** 📅 Show Date Picker */
  const showDatePicker = (index: number, field: 'from' | 'to') => {
    setSelectedIndex(index);
    setSelectedField(field);
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
    setSelectedIndex(null);
    setSelectedField(null);
  };

  const handleDateConfirm = (date: Date) => {
    if (selectedIndex !== null && selectedField) {
      const updated = [...educations];
      updated[selectedIndex][selectedField] = moment(date).format('YYYY-MM-DD');
      setEducations(updated);
    }
    hideDatePicker();
  };

  /** ➕ Add New Education Entry */
  const addNewEducation = () => {
    const first = educations[0];
    const isFirstIncomplete = !first.school || !first.degree || !first.from || !first.to;

    if (isFirstIncomplete) {
      setAddError('Please complete the first education before adding another.');
      return;
    }

    setAddError('');
    setEducations(prev => [...prev, { school: '', degree: '', from: '', to: '' }]);
  };

  /** ❌ Remove Education Entry */
  const removeEducation = (index: number) => {
    setEducations(prev => prev.filter((_, i) => i !== index));
  };

  /** ✅ Validate All Fields Before Next Step */
  const handleNext = () => {
    const newErrors: Record<number, Partial<Education>> = {};
    let isValid = true;

    educations.forEach((edu, index) => {
      const currentErrors: Partial<Education> = {};
      if (!edu.school.trim()) currentErrors.school = 'School name is required';
      if (!edu.degree.trim()) currentErrors.degree = 'Degree name is required';
      if (!edu.from.trim()) currentErrors.from = 'Start date required';
      if (!edu.to.trim()) currentErrors.to = 'End date required';

      if (Object.keys(currentErrors).length > 0) {
        newErrors[index] = currentErrors;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      onNext(educations);
    }
  };

  return (
    <AppWrapper useSafeArea={false} Header={false}>
      <Animated.View
        style={[styles.container, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
      >
        <Typography style={styles.title}>Education</Typography>

        {educations.map((edu, index) => (
          <View key={index} style={styles.card}>
            {/* School */}
            <TextInput
              placeholder="Add School"
              value={edu.school}
              onChangeText={text => handleInputChange(index, 'school', text)}
              style={styles.input}
              placeholderTextColor={COLORS.GRAY_LIGHT}
            />
            {errors[index]?.school && (
              <Typography style={styles.errorText}>{errors[index]?.school}</Typography>
            )}

            {/* Degree */}
            <TextInput
              placeholder="Degree Name"
              value={edu.degree}
              onChangeText={text => handleInputChange(index, 'degree', text)}
              style={styles.input}
              placeholderTextColor={COLORS.GRAY_LIGHT}
            />
            {errors[index]?.degree && (
              <Typography style={styles.errorText}>{errors[index]?.degree}</Typography>
            )}

            {/* From / To */}
            <View style={styles.row}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => showDatePicker(index, 'from')}
                style={[styles.input, styles.half, { justifyContent: 'center' }]}
              >
                <Typography
                  style={{
                    color: edu.from ? COLORS.BLACK : COLORS.GRAY_LIGHT,
                    fontSize: ms(13),
                  }}
                >
                  {edu.from || 'From'}
                </Typography>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => showDatePicker(index, 'to')}
                style={[styles.input, styles.half, { justifyContent: 'center' }]}
              >
                <Typography
                  style={{
                    color: edu.to ? COLORS.BLACK : COLORS.GRAY_LIGHT,
                    fontSize: ms(13),
                  }}
                >
                  {edu.to || 'To'}
                </Typography>
              </TouchableOpacity>
            </View>

            {errors[index]?.from && (
              <Typography style={styles.errorText}>{errors[index]?.from}</Typography>
            )}
            {errors[index]?.to && (
              <Typography style={styles.errorText}>{errors[index]?.to}</Typography>
            )}

            {/* Remove */}
            {educations.length > 1 && (
              <TouchableOpacity
                onPress={() => removeEducation(index)}
                style={styles.removeBtn}
                activeOpacity={0.7}
              >
                <Typography style={styles.removeText}>Remove</Typography>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {addError ? <Typography style={styles.addError}>{addError}</Typography> : null}

        {/* Add Another */}
        <TouchableOpacity onPress={addNewEducation} style={styles.addBtn} activeOpacity={0.8}>
          <Typography style={styles.addText}>+ Add Another Education</Typography>
        </TouchableOpacity>

        {/* Next Button */}
        <TouchableOpacity
          style={{ flex: 1, width: '100%', marginTop: ms(5) }}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[COLORS.HEADER_BACKGROUND, COLORS.HEADER_BACKGROUND]}
            style={styles.gradient}
          >
            <Typography style={styles.nextText}>Next Step</Typography>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Date Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </AppWrapper>
  );
};

export default EducationStep;

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: ms(18),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: ms(20),
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(10),
    padding: ms(12),
    marginBottom: ms(15),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: ms(8),
    paddingHorizontal: ms(10),
    marginBottom: ms(6),
    color: COLORS.BLACK,
    fontSize: ms(13),
    height: ms(42),
    borderColor: '#E2E2E2',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '48%',
  },
  errorText: {
    color: COLORS.RED,
    fontSize: ms(11),
    marginBottom: ms(4),
  },
  addError: {
    color: COLORS.RED,
    fontSize: ms(12),
    textAlign: 'center',
    marginBottom: ms(10),
  },
  addBtn: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: ms(8),
    padding: ms(12),
    alignItems: 'center',
    marginVertical: ms(20),
  },
  addText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(13),
  },
  removeBtn: {
    marginTop: ms(10),
    alignSelf: 'flex-end',
  },
  removeText: {
    color: COLORS.RED,
    fontSize: ms(12),
  },
  gradient: {
    paddingVertical: ms(14),
    borderRadius: ms(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    color: COLORS.WHITE,
    fontWeight: '700',
    fontSize: ms(14),
  },
});