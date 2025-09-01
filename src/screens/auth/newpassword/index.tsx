import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ms } from 'react-native-size-matters';
import { BackgroundWrapper } from '../../../components';
import { useTheme } from '../../../context/ThemeContext';
import { AppButton, AppTextInput } from '../../../components/common';
import { navigate } from '../../../util/navigation';
import fonts from '../../../assets/fonts';
import { Formik } from 'formik';
import * as Yup from 'yup';

const NewPasswordScreen: React.FC = () => {
  const { theme } = useTheme();

  // ✅ Validation schema
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Confirm Password is required'),
  });

  return (
    <BackgroundWrapper loading={false}>
      <View style={styles.container}>
        {/* Heading */}
        <View style={styles.heading}>
          <Text style={[styles.title, { color: theme.primary }]}>
            Reset Password
          </Text>
          <Text style={[styles.subtitle, { color: theme.white }]}>
            Make sure to create a strong password.
          </Text>
        </View>

        {/* Formik Form */}
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log('New Password:', values.password);
            navigate('Login');
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldTouched,
            isValid,
          }) => (
            <>
              <AppTextInput
                iconName="lock-closed"
                iconType="Ionicons"
                placeholder="New Password"
                name="password"
                secure
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                error={touched.password ? errors.password : undefined}
              />

              <AppTextInput
                iconName="lock-closed"
                iconType="Ionicons"
                placeholder="Confirm Password"
                name="confirmPassword"
                secure
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')}
                error={
                  touched.confirmPassword ? errors.confirmPassword : undefined
                }
              />

              {/* Continue Button */}
              <AppButton
                title="Reset Password"
                onPress={handleSubmit}
                disabled={!isValid}
              />
            </>
          )}
        </Formik>
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    marginVertical: ms(20),
  },
  title: {
    fontSize: ms(20),
    fontFamily: fonts.PoppinsMedium,
  },
  subtitle: {
    fontSize: ms(12),
    marginTop: ms(4),
    fontFamily: fonts.PoppinsRegular,
  },
});

export default NewPasswordScreen;
