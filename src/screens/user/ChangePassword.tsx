import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Platform } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography, Icon } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms, mvs } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Validate inputs whenever they change
  useEffect(() => {
    validateForm();
  }, [currentPassword, newPassword, confirmPassword]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!currentPassword.trim()) {
      newErrors.current = 'Please enter your current password';
      valid = false;
    }

    if (!newPassword.trim()) {
      newErrors.new = 'Please enter a new password';
      valid = false;
    } else if (newPassword.length < 8) {
      newErrors.new = 'Password must be at least 8 characters';
      valid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirm = 'Please confirm your new password';
      valid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirm = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    setIsValid(valid);
  };

  const handleChangePassword = () => {
    validateForm();
    if (isValid) {
      console.log('✅ Password Changed Successfully');
      // handle API call here
    }
  };

  return (
    <AppWrapper title='Change Password'>
      {/* Current Password */}
      <View style={styles.inputWrapper}>
        <Typography style={styles.label}>Current Password</Typography>
        <View
          style={[styles.inputBoxWrapper, errors.current && { borderColor: COLORS.ERROR || 'red' }]}
        >
          <TextInput
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder='Enter current password'
            placeholderTextColor='#AAA'
            style={styles.inputBox}
            secureTextEntry={!showCurrent}
          />
          <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
            <Icon
              componentName='Ionicons'
              iconName={showCurrent ? 'eye-off' : 'eye'}
              size={20}
              color={COLORS.GRAY}
            />
          </TouchableOpacity>
        </View>
        {errors.current && <Text style={styles.errorText}>{errors.current}</Text>}
      </View>

      {/* New Password */}
      <View style={styles.inputWrapper}>
        <Typography style={styles.label}>New Password</Typography>
        <View
          style={[styles.inputBoxWrapper, errors.new && { borderColor: COLORS.ERROR || 'red' }]}
        >
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder='Enter new password'
            placeholderTextColor='#AAA'
            style={styles.inputBox}
            secureTextEntry={!showNew}
          />
          <TouchableOpacity onPress={() => setShowNew(!showNew)}>
            <Icon
              componentName='Ionicons'
              iconName={showNew ? 'eye-off' : 'eye'}
              size={20}
              color={COLORS.GRAY}
            />
          </TouchableOpacity>
        </View>
        {errors.new && <Text style={styles.errorText}>{errors.new}</Text>}
      </View>

      {/* Confirm Password */}
      <View style={styles.inputWrapper}>
        <Typography style={styles.label}>Confirm Password</Typography>
        <View
          style={[styles.inputBoxWrapper, errors.confirm && { borderColor: COLORS.ERROR || 'red' }]}
        >
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder='Confirm new password'
            placeholderTextColor='#AAA'
            style={styles.inputBox}
            secureTextEntry={!showConfirm}
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Icon
              componentName='Ionicons'
              iconName={showConfirm ? 'eye-off' : 'eye'}
              size={20}
              color={COLORS.GRAY}
            />
          </TouchableOpacity>
        </View>
        {errors.confirm && <Text style={styles.errorText}>{errors.confirm}</Text>}
      </View>

      {/* Save Button */}
      <Animatable.View animation='fadeInUp' delay={400}>
        <TouchableOpacity
          style={[styles.saveButton, !isValid && { opacity: 0.6 }]}
          activeOpacity={isValid ? 0.9 : 1}
          onPress={isValid ? handleChangePassword : validateForm}
        >
          <Typography style={styles.saveText}>Change Password</Typography>
        </TouchableOpacity>
      </Animatable.View>
    </AppWrapper>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
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
  inputBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.SILVER,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    elevation: 2,
  },
  inputBox: {
    flex: 1,
    fontSize: ms(12),
    color: COLORS.BLACK,
    paddingVertical: 0,
  },
  errorText: {
    color: COLORS.ERROR || 'red',
    fontSize: ms(11),
    marginTop: 4,
    marginLeft: 5,
  },
  saveButton: {
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
  saveText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(15),
  },
});