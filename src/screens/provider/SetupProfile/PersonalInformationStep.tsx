import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/common';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface PersonalInformationStepProps {
  onNext: (payload: any) => void;
  onBack?: () => void;
}

const PersonalInformationStep: React.FC<PersonalInformationStepProps> = ({ onNext }) => {
  const [form, setForm] = useState({ location: '', email: '', phone: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?\d{10,14}$/.test(form.phone)) newErrors.phone = 'Invalid phone number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      const payload = {
        location: form.location.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      };
      onNext(payload);
    }
  };

  return (
    <AppWrapper useSafeArea={false} Header={false}>
      <Animated.View entering={FadeInUp.duration(600)}>
        <Typography style={styles.title}>Personal Information</Typography>

        {/* Location */}
        <TextInput
          placeholder='Enter your location'
          placeholderTextColor='#999'
          style={[styles.input, errors.location && styles.errorInput]}
          value={form.location}
          onChangeText={text => handleChange('location', text)}
        />
        {errors.location && <Typography style={styles.errorText}>{errors.location}</Typography>}

        {/* Email */}
        <TextInput
          placeholder='Enter your email'
          placeholderTextColor='#999'
          style={[styles.input, errors.email && styles.errorInput]}
          value={form.email}
          onChangeText={text => handleChange('email', text)}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        {errors.email && <Typography style={styles.errorText}>{errors.email}</Typography>}

        {/* Phone */}
        <TextInput
          placeholder='Enter your phone number'
          placeholderTextColor='#999'
          style={[styles.input, errors.phone && styles.errorInput]}
          value={form.phone}
          onChangeText={text => handleChange('phone', text)}
          keyboardType='phone-pad'
        />
        {errors.phone && <Typography style={styles.errorText}>{errors.phone}</Typography>}

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
    </AppWrapper>
  );
};

export default PersonalInformationStep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: ms(20),
  },
  title: {
    fontSize: ms(18),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: ms(25),
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: ms(10),
    paddingHorizontal: ms(12),
    marginBottom: ms(10),
    color: COLORS.BLACK,
    fontSize: ms(14),
    height: ms(45),
    backgroundColor: COLORS.WHITE,
  },
  gradient: {
    paddingVertical: ms(14),
    borderRadius: ms(10),
    alignItems: 'center',
    marginTop: ms(20),
  },
  nextText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(14),
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: ms(12),
    marginBottom: ms(6),
    marginLeft: ms(4),
  },
});
