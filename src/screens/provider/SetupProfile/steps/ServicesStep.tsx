import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/common';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const serviceOptions = [
  'Wellness Exams',
  'Vaccination',
  'Emergency Care',
  'Pet Grooming',
  'Dental Cleaning',
  'Microchipping',
  'Surgery',
  'Nutritional Consultation',
];

interface ServicesStepProps {
  onNext: (services: string[]) => void;
  onBack?: () => void;
}

const ServicesStep: React.FC<ServicesStepProps> = ({ onNext }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSelectService = (value: string) => {
    if (value && !selected.includes(value)) {
      setSelected(prev => [...prev, value]);
      setSelectedService('');
      setError(''); // clear error when user selects something
    }
  };

  const removeService = (service: string) => {
    setSelected(prev => prev.filter(s => s !== service));
  };

  const handleNext = () => {
    if (selected.length === 0) {
      setError('Please select at least one service before continuing.');
      return;
    }
    onNext(selected);
  };

  return (
    <AppWrapper useSafeArea={false} Header={false}>
      <Typography style={styles.title}>Services You Offer</Typography>

      {/* 🔽 Dropdown Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedService}
          onValueChange={handleSelectService}
          style={styles.picker}
        >
          <Picker.Item label="Select Your Services" value="" />
          {serviceOptions.map(service => (
            <Picker.Item key={service} label={service} value={service} />
          ))}
        </Picker>
      </View>

      {/* 🔴 Validation Error */}
      {error ? <Typography style={styles.errorText}>{error}</Typography> : null}

      {/* 🏷️ Selected Services */}
      {selected.length > 0 && (
        <View style={styles.skillContainer}>
          {selected.map(service => (
            <TouchableOpacity
              key={service}
              style={[styles.skillTag, styles.selectedSkill]}
              activeOpacity={0.8}
              onPress={() => removeService(service)}
            >
              <View style={styles.skillContent}>
                <Icon name="close" size={ms(14)} color="#4FC3C9" style={{ marginRight: ms(6) }} />
                <Typography style={[styles.skillText, styles.selectedText]}>
                  {service}
                </Typography>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* 🔸 Next Step Button */}
      <TouchableOpacity activeOpacity={0.8} onPress={handleNext}>
        <LinearGradient
          colors={[COLORS.HEADER_BACKGROUND, COLORS.HEADER_BACKGROUND]}
          style={styles.gradient}
        >
          <Typography style={styles.nextText}>Next Step</Typography>
        </LinearGradient>
      </TouchableOpacity>
    </AppWrapper>
  );
};

export default ServicesStep;

const styles = StyleSheet.create({
  title: {
    fontSize: ms(15),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: ms(20),
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: ms(10),
    marginBottom: ms(10),
    backgroundColor: COLORS.WHITE,
    overflow: 'hidden',
  },
  picker: {
    height: ms(45),
    color: COLORS.BLACK,
  },
  errorText: {
    color: COLORS.ERROR || 'red',
    fontSize: ms(13),
    marginBottom: ms(10),
    textAlign: 'center',
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F9F9F9',
    borderRadius: ms(10),
    padding: ms(12),
    marginBottom: ms(25),
  },
  skillTag: {
    borderRadius: ms(8),
    paddingHorizontal: ms(10),
    paddingVertical: ms(6),
    margin: ms(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedSkill: {
    backgroundColor: '#E6F6F8',
  },
  selectedText: {
    color: '#4FC3C9',
    fontWeight: '600',
  },
  skillText: {
    fontSize: ms(12),
  },
  gradient: {
    paddingVertical: ms(14),
    borderRadius: ms(10),
    alignItems: 'center',
  },
  nextText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(14),
  },
});
