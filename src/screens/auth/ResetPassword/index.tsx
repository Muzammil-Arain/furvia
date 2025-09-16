import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ms } from 'react-native-size-matters';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Typography, Wrapper } from 'components/index';
import AppTextInput from 'components/common/Input';
import { navigate } from 'navigation/index';
import { COLORS } from 'utils/colors';
import { resetPassword } from 'api/functions/auth';

interface ResetPasswordProps {
  route?: {
    params?: {
      email?: string;
      code?: string;
    };
  };
}

interface FormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ route }) => {
  const [loading, setLoading] = useState(false);

  // ✅ Validation schema
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Confirm Password is required'),
  });

  // ✅ API Call
  const handleResetPassword = async (values: FormValues) => {
    try {
      setLoading(true);

      const response = await resetPassword({
        email: route?.params?.email ?? '',
        password: values.password,
        password_confirmation: values.confirmPassword,
        code: route?.params?.code ?? '',
      });

      console.log('✅ Password reset success:', response);

      navigate('Login');
    } catch (error: any) {
      console.error('❌ Reset password error:', error?.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <View style={styles.container}>
        {/* Heading */}
        <View style={styles.heading}>
          <Typography style={[styles.title, { color: COLORS.PRIMARY }]}>
            Reset Password
          </Typography>
          <Typography style={[styles.subtitle, { color: COLORS.WHITE }]}>
            Make sure to create a strong password.
          </Typography>
        </View>

        {/* Loader */}
        {loading && (
          <ActivityIndicator size="large" color={COLORS.PRIMARY} style={styles.loader} />
        )}

        {/* Formik Form */}
        <Formik<FormValues>
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleResetPassword}
        >
          {({ handleChange, handleSubmit, values, errors, touched, setFieldTouched, isValid }) => (
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
                error={touched.confirmPassword ? errors.confirmPassword : undefined}
              />

              <Button
                title={loading ? 'Please wait...' : 'Reset Password'}
                onPress={handleSubmit as any}
                disabled={!isValid || loading}
              />
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
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: ms(12),
    marginTop: ms(7),
  },
  loader: {
    marginVertical: ms(10),
  },
});

export default ResetPassword;