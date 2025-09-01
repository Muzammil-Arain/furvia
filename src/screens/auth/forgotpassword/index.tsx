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

const ForgotPasswordScreen: React.FC<{ route: any }> = ({ route }) => {
  const { theme } = useTheme();

  // ✅ Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
  });

  return (
    <BackgroundWrapper loading={false}>
      <View style={styles.container}>
        {/* Heading */}
        <View style={styles.heading}>
          <Text style={[styles.title, { color: theme.primary }]}>
            Forget Password?
          </Text>
          <Text style={[styles.subtitle, { color: theme.white }]}>
            Select how you want to receive code
          </Text>
        </View>

        {/* ✅ Formik Form */}
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={values => {
            // navigation with email parameter
            navigate('Verification', { email: values.email ,type:'forgotpasswod'});
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
                iconName="mail"
                iconType="Ionicons"
                placeholder="Email"
                name="email"
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                error={touched.email ? errors.email : undefined}
              />

              {/* Continue Button */}
              <AppButton
                title="Continue"
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

export default ForgotPasswordScreen;
