import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import { Button, Typography, Wrapper } from '../../../components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { COLORS } from 'utils/colors';
import { navigate } from 'navigation/index';
import AppTextInput from 'components/common/Input';

const ForgotPassword: React.FC<{ route: any }> = ({ route }) => {
  // ✅ Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Enter a valid email').required('Email is required'),
  });

  return (
    <Wrapper>
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
          onSubmit={values => {
            // navigation with email parameter
            navigate('Verification', { email: values.email, type: 'forgotpasswod' });
          }}
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
              <Button title='Continue' onPress={handleSubmit} disabled={!isValid} />
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
    fontWeight:'bold',
  },
  subtitle: {
    fontSize: ms(12),
    marginTop: ms(10),
  },
});

export default ForgotPassword;
