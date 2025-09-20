import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { ms } from 'react-native-size-matters';
import { Button, Typography, Wrapper } from '../../../components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { COLORS } from 'utils/colors';
import { navigate } from 'navigation/index';
import AppTextInput from 'components/common/Input';
import { showToast } from 'utils/toast';
import { forgotPassword } from 'api/functions/auth';

const ForgotPassword: React.FC<{ route: any }> = ({ route }) => {
  const [loading, setLoading] = useState(false);

  // ✅ Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Enter a valid email').required('Email is required'),
  });

  const handleForgotPassword = async (email: string) => {
    try {
      setLoading(true);
      const res = await forgotPassword({ email });

      if (res.status == 'success') {
        // ✅ Success toast
        showToast({ message: res.message || 'Code sent successfully!', isError: false });

        // ✅ Navigate to Verification screen with email param
        navigate('Verification', { email, type: 'forgotpassword' });
      } else {
        showToast({ message: res.message || 'Something went wrong!', isError: true });
      }
    } catch (err: any) {
      showToast({ message: err?.message || 'Request failed!', isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper loading={loading}>
      <View style={styles.container}>
        {/* Heading */}
        <View style={styles.heading}>
          <Typography style={[styles.title, { color: COLORS.PRIMARY }]}>
            Forget Password?
          </Typography>
          <Typography style={[styles.subtitle, { color: COLORS.WHITE }]}>
            Select how you want to receive code
          </Typography>
        </View>

        {/* ✅ Formik Form */}
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={values => handleForgotPassword(values.email)}
        >
          {({ handleChange, handleSubmit, values, errors, touched, setFieldTouched, isValid }) => (
            <>
              <AppTextInput
                iconName='mail'
                iconType='Ionicons'
                placeholder='Email'
                name='email'
                keyboardType='email-address'
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                error={touched.email ? errors.email : undefined}
              />

              {/* Continue Button */}
              <Button
                title={loading ? '' : 'Continue'}
                onPress={handleSubmit}
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
    marginTop: ms(10),
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: ms(60), // ✅ Button ke upar loader aayega
  },
});

export default ForgotPassword;
