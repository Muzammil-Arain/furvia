import { Typography } from 'components/common';
import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PhoneInput, { PhoneInputProps } from 'react-native-phone-number-input';
import { ms } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';

export interface PhoneInputFieldRef {
  getValue: () => string;
  getFormattedValue: () => string;
  isValid: () => boolean;
}

interface PhoneInputFieldProps extends Omit<PhoneInputProps, 'ref'> {
  label?: string;
  error?: string | false;
  touched?: boolean;
}

const PhoneInputField = forwardRef<PhoneInputFieldRef, PhoneInputFieldProps>(
  ({ label, error, touched, defaultValue = '', ...props }, ref) => {
    const phoneInputRef = useRef<PhoneInput>(null);

    const [value, setValue] = useState(defaultValue);
    const [formattedValue, setFormattedValue] = useState('');

    useImperativeHandle(ref, () => ({
      getValue: () => value,
      getFormattedValue: () => formattedValue,
      isValid: () => {
        return phoneInputRef.current?.isValidNumber(value) ?? false;
      },
    }));

    return (
      <View style={styles.container}>
        {label && (
          <Typography style={[styles.label, { color: COLORS.BLACK }]}>{label}</Typography>
        )}

        <PhoneInput
          ref={phoneInputRef}
          defaultValue={value}
          defaultCode="US"
          layout="first"
          placeholder="phone number"
          countryPickerProps={{ renderFlagButton: false }}
          onChangeText={text => setValue(text)}
          onChangeFormattedText={text => setFormattedValue(text)}
          containerStyle={[
            styles.phoneContainer,
            { borderColor: error ? 'red' : COLORS.GRAY },
          ]}
          textContainerStyle={[
            styles.textContainer,
            { backgroundColor: COLORS.WHITE },
          ]}
          textInputStyle={{ color: COLORS.BLACK }}
          codeTextStyle={{ color: COLORS.BLACK }}
          {...props}
        />

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginBottom: ms(15),
  },
  label: {
    fontSize: ms(14),
    marginBottom: ms(5),
  },
  phoneContainer: {
    width: '100%',
    height:60,
    borderWidth: 1,
    borderRadius: ms(8),
    paddingVertical: ms(2),
  },
  textContainer: {
    borderTopRightRadius: ms(8),
    borderBottomRightRadius: ms(8),
    paddingVertical: 0,
  },
  error: {
    marginTop: ms(4),
    color: 'red',
    fontSize: ms(12),
  },
});

export default PhoneInputField;
