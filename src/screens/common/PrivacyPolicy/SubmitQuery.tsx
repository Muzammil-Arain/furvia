import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms, mvs } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import { reset } from 'navigation/index';
import { SCREENS } from 'constants/routes';

const SubmitQuery = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!name.trim()) {
      newErrors.name = 'Please enter your name';
      valid = false;
    }
    if (!email.trim()) {
      newErrors.email = 'Please enter your email';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email';
      valid = false;
    }
    if (!subject.trim()) {
      newErrors.subject = 'Please enter a subject';
      valid = false;
    }
    if (!message.trim()) {
      newErrors.message = 'Please enter your message';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('✅ Query Submitted:', { name, email, subject, message });
      reset(SCREENS.BOTTOM_STACK)
    }
  };

  return (
    <AppWrapper title='Submit a Query'>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Name Field */}
        <View style={styles.inputWrapper}>
          <Typography style={styles.label}>Full Name</Typography>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder='Enter your name'
            placeholderTextColor='#AAA'
            style={[styles.input, errors.name && { borderColor: 'red' }]}
          />
          {errors.name && <Typography style={styles.errorText}>{errors.name}</Typography>}
        </View>

        {/* Email Field */}
        <View style={styles.inputWrapper}>
          <Typography style={styles.label}>Email Address</Typography>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder='Enter your email'
            placeholderTextColor='#AAA'
            style={[styles.input, errors.email && { borderColor: 'red' }]}
            keyboardType='email-address'
          />
          {errors.email && <Typography style={styles.errorText}>{errors.email}</Typography>}
        </View>

        {/* Subject Field */}
        <View style={styles.inputWrapper}>
          <Typography style={styles.label}>Subject</Typography>
          <TextInput
            value={subject}
            onChangeText={setSubject}
            placeholder='Enter subject'
            placeholderTextColor='#AAA'
            style={[styles.input, errors.subject && { borderColor: 'red' }]}
          />
          {errors.subject && <Typography style={styles.errorText}>{errors.subject}</Typography>}
        </View>

        {/* Message Field */}
        <View style={styles.inputWrapper}>
          <Typography style={styles.label}>Message</Typography>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder='Type your message here...'
            placeholderTextColor='#AAA'
            multiline
            numberOfLines={5}
            style={[styles.input, styles.textArea, errors.message && { borderColor: 'red' }]}
          />
          {errors.message && <Typography style={styles.errorText}>{errors.message}</Typography>}
        </View>

        {/* Submit Button */}
        <Animatable.View animation='fadeInUp' delay={400}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.9}>
            <Typography style={styles.buttonText}>Submit</Typography>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </AppWrapper>
  );
};

export default SubmitQuery;

const styles = StyleSheet.create({
  container: {
    paddingBottom: ms(100),
    backgroundColor: COLORS.WHITE,
  },
  inputWrapper: {
    marginHorizontal: ms(20),
    marginTop: mvs(18),
  },
  label: {
    fontSize: ms(13),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.SILVER,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: ms(12),
    color: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
    elevation: 2,
  },
  textArea: {
    textAlignVertical: 'top',
    height: mvs(100),
  },
  errorText: {
    color: 'red',
    fontSize: ms(11),
    marginTop: 4,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    width: '88%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    marginTop: mvs(35),
    elevation: 3,
    shadowColor: COLORS.PRIMARY,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(15),
  },
});
