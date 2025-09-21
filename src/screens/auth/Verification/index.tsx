import { Button, Typography, Wrapper } from 'components/index';
import { navigate } from 'navigation/index';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { ms } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';

const Verification: React.FC<{ route: any }> = ({ route }) => {
  const { type } = route?.params || {};
  console.log("🚀 ~ Verification ~ type:", type)

  const [timer, setTimer] = useState(60); // 1 min timer
  const [otp, setOtp] = useState(['', '', '', '']); // 4 digit OTP
  const inputs = useRef<TextInput[]>([]);

  // Timer countdown
  useEffect(() => {
    let interval: number | undefined;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000) as unknown as number; // cast for TS
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
      if (type == 'forgotpasswod') {
        navigate('ResetPassword');
      } else {
        navigate('Login');
      }
    } else {
      console.log('Invalid OTP');
    }
  };

  return (
    <Wrapper>
      <View style={styles.container}>
        {/* Heading */}
        <View style={styles.heading}>
          <Typography style={[styles.title, { color: COLORS.PRIMARY }]}>Verification</Typography>
          <Typography style={[styles.subtitle, { color: COLORS.WHITE }]}>
            Please enter the code we sent to
          </Typography>
          <Typography style={[styles.subtitle, { color: COLORS.PRIMARY,fontWeight:'bold' }]}>bill.san***@example.com</Typography>
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
                  borderColor: COLORS.PRIMARY,
                  color: COLORS.TEXT,
                  backgroundColor: COLORS.WHITE,
                },
              ]}
              keyboardType='number-pad'
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
            <Text style={[styles.timerText, { color: COLORS.WHITE }]}>Resend code in {timer}s</Text>
          ) : (
            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={[styles.resendText, { color: COLORS.PRIMARY }]}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Continue Button */}
        <Button
          disabled={otp.join('').length < otp.length}
          title='Continue'
          onPress={handleVerifyOtp}
        />
      </View>
    </Wrapper>
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
    fontSize: ms(25),
    fontWeight:'bold'
  },
  subtitle: {
    fontSize: ms(12),
    marginTop: 5,
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
  },
  resendText: {
    fontSize: ms(14),
    fontWeight: 'bold',
  },
});

export default Verification;
