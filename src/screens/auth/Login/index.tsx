import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { ms } from 'react-native-size-matters';
import { Button, Typography, Wrapper } from '../../../components';
import AppTextInput from 'components/common/Input';
import { COLORS } from 'utils/colors';
import { navigate } from 'navigation/index';
import { IMAGES } from 'constants/assets';
import { screenWidth } from 'utils/helpers';
import PhoneInputField, { PhoneInputFieldRef } from 'components/appComponents/PhoneInputField';
import { SCREENS } from 'constants/routes';

const Login: React.FC<{ navigation: any }> = ({}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const phoneRef = useRef<PhoneInputFieldRef>(null);

  // 🔹 Create refs for inputs
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const nameRef = useRef<TextInput>(null);

  // State
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const nameRegex = /^[a-zA-Z\s]{3,}$/;

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateLogin = () => {
    let valid = true;
    let newErrors: any = {};

    if (!emailRegex.test(form.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
    if (!passwordRegex.test(form.password)) {
      newErrors.password = 'Password must be at least 6 characters and include a number';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateSignup = () => {
    let valid = true;
    let newErrors: any = {};

    if (!nameRegex.test(form.name)) {
      newErrors.name = 'Enter a valid full name (min 3 characters)';
      valid = false;
    }
    if (!emailRegex.test(form.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
    if (!passwordRegex.test(form.password)) {
      newErrors.password = 'Password must be at least 6 characters and include a number';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // const handleLogin = () => {
  //   if (validateLogin()) {
  //     Alert.alert('Success', 'Login successful ✅');
  //   }
  // };

  const handleSignup = () => {
    // if (validateSignup()) {
    navigate('Verification', { type: 'signup' });
    // }
  };

  // Social button reusable component
  // eslint-disable-next-line react/no-unstable-nested-components
  const SocialButton = ({ icon, label }: { icon: any; label: string }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.socialBtn, { backgroundColor: COLORS.WHITE }]}
    >
      <Image source={icon} resizeMode='contain' style={styles.socialIcon} />
      <Typography style={[styles.socialText, { color: COLORS.BLACK }]}>{label}</Typography>
    </TouchableOpacity>
  );

  return (
    <Wrapper goBack={false}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['login', 'signup'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && { backgroundColor: COLORS.PRIMARY }]}
            onPress={() => setActiveTab(tab as 'login' | 'signup')}
            activeOpacity={0.8}
          >
            <Typography
              style={[
                styles.tabText,
                { color: activeTab === tab ? COLORS.BLACK : COLORS.LIGHT_PERPLE },
              ]}
            >
              {tab === 'login' ? 'Login' : 'Sign Up'}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>

      {/* Heading */}
      <View style={styles.heading}>
        <Typography style={[styles.title, { color: COLORS.PRIMARY }]}>
          {activeTab === 'login' ? 'Welcome Back!' : 'Welcome!'}
        </Typography>
        <Typography style={[styles.subtitle, { color: COLORS.WHITE }]}>
          {activeTab === 'login'
            ? 'Enter your credentials to continue.'
            : 'Enter your details to continue.'}
        </Typography>
      </View>

      {/* Tab Content */}
      {activeTab === 'login' ? (
        <View style={styles.form}>
          <AppTextInput
            iconName='mail'
            iconType='Ionicons'
            placeholder='Email'
            name='email'
            keyboardType='email-address'
            value={form.email}
            error={errors.email}
            onChangeText={text => handleChange('email', text)}
          />

          <AppTextInput
            iconName='lock-closed'
            iconType='Ionicons'
            placeholder='Password'
            name='password'
            secure={true}
            showpass={true}
            error={errors.password}
            value={form.password}
            onChangeText={text => handleChange('password', text)}
          />

          <TouchableOpacity
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              zIndex: 999,
            }}
            onPress={() => navigate('ForgotPassword', { type: 'ForgotPassword' })}
          >
            <Typography style={[styles.forgotPassword, { color: COLORS.PRIMARY }]}>
              Forgot Password?
            </Typography>
          </TouchableOpacity>

          <Button title='Sign In' onPress={() => navigate(SCREENS.MAPLOCATIONSCREEN)} />

          {/* Social Content Overlay */}
          <View
            style={{
              marginTop: 40,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-betweenF',
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.WHITE,
                height: 1,
                width: screenWidth(27),
                marginRight: 20,
              }}
            />
            <Typography
              style={{
                color: COLORS.WHITE,
                textAlign: 'center',
              }}
            >
              Or Continue With
            </Typography>
            <View
              style={{
                backgroundColor: COLORS.WHITE,
                height: 1,
                width: screenWidth(27),
                marginLeft: 20,
              }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.form}>
          <AppTextInput
            iconName='user'
            iconType='FontAwesome'
            placeholder='Full Name'
            name='name'
            error={errors.name}
            value={form.name}
            onChangeText={text => handleChange('name', text)}
          />

          <AppTextInput
            iconName='mail'
            iconType='Ionicons'
            placeholder='Email'
            name='email'
            keyboardType='email-address'
            value={form.email}
            error={errors.email}
            onChangeText={text => handleChange('email', text)}
          />
          <PhoneInputField ref={phoneRef} touched={false} />

          <AppTextInput
            iconName='lock-closed'
            iconType='Ionicons'
            placeholder='Password'
            name='password'
            secure
            error={errors.password}
            value={form.password}
            onChangeText={text => handleChange('password', text)}
          />

          <Button title='Sign Up' onPress={handleSignup} />

          <View
            style={{
              marginTop: 40,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-betweenF',
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.WHITE,
                height: 1,
                width: screenWidth(27),
                marginRight: 20,
              }}
            />
            <Typography
              style={{
                color: COLORS.WHITE,
                textAlign: 'center',
              }}
            >
              Or Continue With
            </Typography>
            <View
              style={{
                backgroundColor: COLORS.WHITE,
                height: 1,
                width: screenWidth(27),
                marginLeft: 20,
              }}
            />
          </View>
        </View>
      )}

      {/* Social Buttons */}
      <View style={styles.socialWrapper}>
        <SocialButton icon={IMAGES.GOOGLE} label='Sign in with Google' />
        <SocialButton icon={IMAGES.APPLE} label='Sign in with Apple' />
        <SocialButton icon={IMAGES.FACEBOOK} label='Sign in with Facebook' />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#390453',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    width: ms(150),
    justifyContent: 'center',
    height: ms(35),
    alignItems: 'center',
    borderRadius: 8,
  },
  tabText: {
    fontSize: ms(16),
    textAlign: 'center',
  },
  heading: {
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: ms(25),
  },
  subtitle: {
    fontWeight: '500',
    fontSize: ms(12),
    marginTop: 5,
  },
  form: {
    paddingTop: ms(20),
  },
  forgotPassword: {
    marginBottom: 10,
    fontSize: ms(15),
    textAlign: 'right',
  },
  socialBg: {
    width: '100%',
    position: 'absolute',
  },
  socialWrapper: {
    marginTop: ms(20),
  },
  socialBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 8,
    elevation: 3,
  },
  socialIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  socialText: {
    fontSize: ms(14),
  },
  error: {
    color: 'red',
  },
});

export default Login;
