import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import { BackgroundWrapper } from '../../../components';
import { useTheme } from '../../../context/ThemeContext';
import { AppButton } from '../../../components/common';
import { navigate } from '../../../util/navigation';
import fonts from '../../../assets/fonts';

const VerificationScreen: React.FC<{ route: any }> = ({ route }) => {
  const { type } = route?.params || {};
  const { theme } = useTheme();

  const [timer, setTimer] = useState(60); // 1 min timer
  const [otp, setOtp] = useState(['', '', '', '']); // 4 digit OTP
  const inputs = useRef<TextInput[]>([]);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1]?.focus(); // move to next input
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus(); // move back
    }
  };

  const handleResendOtp = () => {
    setTimer(60);
    console.log('OTP Resent!');
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 4) {
      console.log('Verifying OTP:', enteredOtp);
      if (type) {
        navigate('Login');
      } else {
        // navigation.navigate('NextScreen');
      }
    } else {
      console.log('Invalid OTP');
    }
  };

  return (
    <BackgroundWrapper loading={false}>
      <View style={styles.container}>
        {/* Heading */}
        <View style={styles.heading}>
          <Text style={[styles.title, { color: theme.primary }]}>
            Verification
          </Text>
          <Text style={[styles.subtitle, { color: theme.white }]}>
            Please enter the code we sent to
          </Text>
          <Text style={[styles.subtitle, { color: theme.primary }]}>
            bill.san***@example.com
          </Text>
        </View>

        {/* Custom OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                if (ref) inputs.current[index] = ref;
              }}
              style={[
                styles.otpInput,
                {
                  borderColor: theme.primary,
                  color: theme.text,
                  backgroundColor: theme.white,
                },
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
            />
          ))}
        </View>

        {/* Timer + Resend */}
        <View style={styles.timerContainer}>
          {timer > 0 ? (
            <Text style={[styles.timerText, { color: theme.white }]}>
              Resend code in {timer}s
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={[styles.resendText, { color: theme.primary }]}>
                Resend Code
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Continue Button */}
        <AppButton
          disabled={otp.join('').length < otp.length}
          title="Continue"
          onPress={handleVerifyOtp}
        />
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: ms(30),
    paddingHorizontal: ms(30),
  },
  otpInput: {
    width: ms(60),
    height: ms(60),
    borderWidth: 1,
    fontSize: 22,
    borderRadius: ms(8),
    textAlign: 'center',
    fontWeight: '500',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: ms(20),
  },
  timerText: {
    fontSize: ms(14),
    fontFamily: fonts.PoppinsMedium,
  },
  resendText: {
    fontSize: ms(14),
    fontWeight: 'bold',
  },
});

export default VerificationScreen;
