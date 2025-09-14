import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ms } from 'react-native-size-matters';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Typography, Wrapper } from 'components/index';
import AppTextInput from 'components/common/Input';
import { navigate } from 'navigation/index';
import { COLORS } from 'utils/colors';

const ResetPassword: React.FC = () => {
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
    <Wrapper>
      <View style={styles.container}>
        {/* Heading */}
        <View style={styles.heading}>
          <Typography style={[styles.title, { color:COLORS.PRIMARY}]}>Reset Password</Typography>
          <Typography style={[styles.subtitle, { color: COLORS.WHITE }]}>
            Make sure to create a strong password.
          </Typography>
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
          {({ handleChange, handleSubmit, values, errors, touched, setFieldTouched, isValid }) => (
            <>
              <AppTextInput
                iconName='lock-closed'
                iconType='Ionicons'
                placeholder='New Password'
                name='password'
                secure
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                error={touched.password ? errors.password : undefined}
              />

              <AppTextInput
                iconName='lock-closed'
                iconType='Ionicons'
                placeholder='Confirm Password'
                name='confirmPassword'
                secure
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')}
                error={touched.confirmPassword ? errors.confirmPassword : undefined}
              />

              {/* Continue Button */}
              <Button title='Reset Password' onPress={handleSubmit} disabled={!isValid} />
            </>
          )}
        </Formik>
      </View>
    </Wrapper>
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
    fontSize: ms(25),
    fontWeight:'bold'
  },
  subtitle: {
    fontSize: ms(12),
    marginTop: ms(7),
  },
});

export default ResetPassword;
