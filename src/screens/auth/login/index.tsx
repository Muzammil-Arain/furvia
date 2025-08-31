import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import { AppButton, AppTextInput } from '../../../components/common';
import { useTheme } from '../../../context/ThemeContext';
import { BackgroundWrapper } from '../../../components';
import { APPLE, FACEBOOK, GOOGLE, SOCIAL_CONTENT } from '../../../assets';
import fonts from '../../../assets/fonts';
import PhoneInputField, {
  PhoneInputFieldRef,
} from '../../../components/appComponents/PhoneInputField';
import { navigate } from '../../../util/navigation';

const { width } = Dimensions.get('window');

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const { theme } = useTheme();
  const phoneRef = useRef<PhoneInputFieldRef>(null);

  // State
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // at least 6 chars, letters+numbers
  const nameRegex = /^[a-zA-Z\s]{3,}$/; // at least 3 letters, alphabets only

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
      newErrors.password =
        'Password must be at least 6 characters and include a number';
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
      newErrors.password =
        'Password must be at least 6 characters and include a number';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validateLogin()) {
      Alert.alert('Success', 'Login successful ✅');
    }
  };

  const handleSignup = () => {
    if (validateSignup()) {
      navigate('Verification', { type: 'signup' });
    }
  };

  // Social button reusable component
  const SocialButton = ({ icon, label }: { icon: any; label: string }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.socialBtn, { backgroundColor: theme.white }]}
    >
      <Image source={icon} resizeMode="contain" style={styles.socialIcon} />
      <Text style={[styles.socialText, { color: theme.text }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <BackgroundWrapper>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['login', 'signup'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && { backgroundColor: theme.primary },
            ]}
            onPress={() => setActiveTab(tab as 'login' | 'signup')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab ? theme.text : theme.gray },
              ]}
            >
              {tab === 'login' ? 'Login' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Heading */}
      <View style={styles.heading}>
        <Text style={[styles.title, { color: theme.primary }]}>
          {activeTab === 'login' ? 'Welcome Back!' : 'Welcome!'}
        </Text>
        <Text style={[styles.subtitle, { color: theme.white }]}>
          {activeTab === 'login'
            ? 'Enter your credentials to continue.'
            : 'Enter your details to continue.'}
        </Text>
      </View>

      {/* Tab Content */}
      {activeTab === 'login' ? (
        <View style={styles.form}>
          <AppTextInput
            iconName="mail"
            iconType="Ionicons"
            placeholder="Email"
            name="email"
            keyboardType="email-address"
            value={form.email}
            error={errors.email}
            onChangeText={text => handleChange('email', text)}
          />

          <AppTextInput
            iconName="lock-closed"
            iconType="Ionicons"
            placeholder="Password"
            name="password"
            secure
            error={errors.password}
            value={form.password}
            onChangeText={text => handleChange('password', text)}
          />

          <Text style={[styles.forgotPassword, { color: theme.primary }]}>
            Forgot Password?
          </Text>

          <AppButton title="Sign In" onPress={handleLogin} />

          {/* Social Content Overlay */}
          <Image
            source={SOCIAL_CONTENT}
            resizeMode="contain"
            style={styles.socialBg}
          />
        </View>
      ) : (
        <View style={styles.form}>
          <AppTextInput
            iconName="user"
            iconType="FontAwesome"
            placeholder="Full Name"
            name="name"
            error={errors.name}
            value={form.name}
            onChangeText={text => handleChange('name', text)}
          />

          <AppTextInput
            iconName="mail"
            iconType="Ionicons"
            placeholder="Email"
            name="email"
            keyboardType="email-address"
            value={form.email}
            error={errors.email}
            onChangeText={text => handleChange('email', text)}
          />
          <PhoneInputField
            ref={phoneRef}
            error="Invalid number"
            touched={false}
          />

          <AppTextInput
            iconName="lock-closed"
            iconType="Ionicons"
            placeholder="Password"
            name="password"
            secure
            error={errors.password}
            value={form.password}
            onChangeText={text => handleChange('password', text)}
          />

          <AppButton title="Sign Up" onPress={handleSignup} />

          {/* Social Content Overlay */}
          <Image
            source={SOCIAL_CONTENT}
            resizeMode="contain"
            style={[
              styles.socialBg,
              {
                top: ms(160),
              },
            ]}
          />
        </View>
      )}

      {/* Social Buttons */}
      <View style={styles.socialWrapper}>
        <SocialButton icon={GOOGLE} label="Sign in with Google" />
        <SocialButton icon={APPLE} label="Sign in with Apple" />
        <SocialButton icon={FACEBOOK} label="Sign in with Facebook" />
      </View>
    </BackgroundWrapper>
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
    width: ms(160),
    justifyContent: 'center',
    height: ms(35),
    alignItems: 'center',
    borderRadius: 8,
  },
  tabText: {
    fontSize: ms(16),
    fontFamily: fonts.PoppinsMedium,
    textAlign: 'center',
  },
  heading: {
    marginTop: 20,
  },
  title: {
    fontSize: ms(20),
    fontFamily: fonts.PoppinsMedium,
  },
  subtitle: {
    fontSize: ms(12),
    marginTop: 4,
    fontFamily: fonts.PoppinsRegular,
  },
  form: {
    paddingTop: ms(20),
  },
  forgotPassword: {
    marginBottom: 10,
    fontSize: ms(15),
    fontFamily: fonts.PoppinsMedium,
    textAlign: 'right',
  },
  socialBg: {
    width: '100%',
    position: 'absolute',
    top: '25%',
  },
  socialWrapper: {
    marginTop: ms(60),
  },
  socialBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    height: 50,
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
    fontFamily: fonts.PoppinsMedium,
  },
  error: {
    color: 'red',
    fontFamily: fonts.PoppinsRegular,
  },
});

export default LoginScreen;
