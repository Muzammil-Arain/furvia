import React, { useRef, useState, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { ms } from 'react-native-size-matters';
import { Button, Typography, Wrapper } from '../../../components';
import AppTextInput from 'components/common/Input';
import { COLORS } from 'utils/colors';
import { navigate } from 'navigation/index';
import { IMAGES } from 'constants/assets';
import PhoneInputField, { PhoneInputFieldRef } from 'components/appComponents/PhoneInputField';
import { SCREENS } from 'constants/routes';
import { loginUser, signupUser } from 'api/functions/auth';
import { useAppSelector } from 'types/reduxTypes';
import { setItem } from 'utils/storage';
import { VARIABLES } from 'constants/common';
import store from 'store/store';
import { setIsUserLoggedIn } from 'store/slices/appSettings';

type TabType = 'login' | 'signup';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('login');
  const phoneRef = useRef<PhoneInputFieldRef>(null);
  const role = useAppSelector(state => state.app.userRole);
  console.log('🚀 ~ Login ~ role:', role);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // Validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const nameRegex = /^[a-zA-Z\s]{3,}$/;

  const handleChange = useCallback((field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  }, []);

  const validateLogin = () => {
    let valid = true;
    const newErrors: Record<string, string> = {};

    if (!emailRegex.test(form.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const validateSignup = () => {
    let valid = true;
    const newErrors: Record<string, string> = {};

    if (!nameRegex.test(form.name)) {
      newErrors.name = 'Enter a valid full name (min 3 characters)';
      valid = false;
    }
    if (!emailRegex.test(form.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        'Password must contain uppercase, lowercase, number & special char (min 8 chars)';
      valid = false;
    }
    if (form.password !== form.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  /* 🔹 Handle Login */
  const handleLogin = async () => {
    setItem(VARIABLES.IS_USER_LOGGED_IN, VARIABLES.IS_USER_LOGGED_IN);
    store.dispatch(setIsUserLoggedIn(true));
    return;

    if (validateLogin()) {
      const payload = {
        email: form.email.trim(),
        password: form.password,
      };
      console.log('🚀 ~ handleLogin ~ payload:', payload);

      setLoading(true);
      try {
        const response = await loginUser(payload);
        console.log('🚀 ~ handleLogin ~ response:', response?.data);
        // return;
        if (response?.data?.user?.type == 'user') {
          navigate(SCREENS.MAPLOCATIONSCREEN);
        } else {
          navigate(SCREENS.QuestionScreen);
        }
      } catch (e) {
        console.error('Login Error:', e);
      } finally {
        setLoading(false);
      }
    }
  };

  /* 🔹 Handle Signup */
  const handleSignup = async () => {
    if (validateSignup()) {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        type: role,
        confirm_password: form.confirm_password,
        phone: phoneRef.current?.getValue?.() || '',
      };
      console.log('🚀 ~ handleSignup ~ payload:', payload);

      setLoading(true);
      try {
        const response = await signupUser(payload);
        console.log('🚀 ~ handleSignup ~ response:', response);
        navigate('Verification', {
          type: 'signup',
          email: form.email.trim(),
          password: form.password,
        });
      } catch (e) {
        console.error('Signup Error:', e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Wrapper loading={loading} goBack={false}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {(['login', 'signup'] as TabType[]).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
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

      {/* Loader */}
      {/* {loading && (
        <ActivityIndicator size="large" color={COLORS.PRIMARY} style={{ marginVertical: 10 }} />
      )} */}

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
            secure
            showpass
            error={errors.password}
            value={form.password}
            onChangeText={text => handleChange('password', text)}
          />

          <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
            <Typography style={[styles.forgotPassword, { color: COLORS.PRIMARY }]}>
              Forgot Password?
            </Typography>
          </TouchableOpacity>

          <Button title='Sign In' onPress={handleLogin} disabled={loading} />

          <Divider label='Or Continue With' />
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
            showpass
            error={errors.password}
            value={form.password}
            onChangeText={text => handleChange('password', text)}
          />

          <AppTextInput
            iconName='lock-closed'
            iconType='Ionicons'
            placeholder='Confirm Password'
            name='confirm_password'
            secure
            showpass
            error={errors.confirm_password}
            value={form.confirm_password}
            onChangeText={text => handleChange('confirm_password', text)}
          />

          <Button title='Sign Up' onPress={handleSignup} disabled={loading} />

          <Divider label='Or Continue With' />
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

/* 🔹 Reusable Divider */
const Divider = ({ label }: { label: string }) => (
  <View style={styles.dividerContainer}>
    <View style={styles.dividerLine} />
    <Typography style={styles.dividerText}>{label}</Typography>
    <View style={styles.dividerLine} />
  </View>
);

/* 🔹 Reusable Social Button */
const SocialButton = ({ icon, label }: { icon: any; label: string }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={[styles.socialBtn, { backgroundColor: COLORS.WHITE }]}
  >
    <Image source={icon} resizeMode='contain' style={styles.socialIcon} />
    <Typography style={[styles.socialText, { color: COLORS.BLACK }]}>{label}</Typography>
  </TouchableOpacity>
);

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
  activeTab: {
    backgroundColor: COLORS.PRIMARY,
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
  dividerContainer: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerLine: {
    backgroundColor: COLORS.WHITE,
    height: 1,
    flex: 1,
  },
  dividerText: {
    color: COLORS.WHITE,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default Login;
