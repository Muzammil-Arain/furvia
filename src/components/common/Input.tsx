import React, { forwardRef, useState } from 'react';
import { TextInput, Text, StyleSheet, TextInputProps, View, Pressable } from 'react-native';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import { Icon } from './Icon';
import { Typography } from './Typography';

interface AppTextInputProps extends Omit<TextInputProps, 'secureTextEntry'> {
  label?: string;
  name: string;
  error?: string | false;
  touched?: boolean;
  iconType?: any;
  iconName?: string;
  secure?: boolean;
  showpass?: boolean;
  value?: string;
  onSubmitNext?: () => void;
}

const AppTextInput = forwardRef<TextInput, AppTextInputProps>(
  (
    {
      label,
      error,
      touched,
      iconType,
      iconName,
      secure = false,
      showpass = false,
      onSubmitNext,
      style,
      value,
      ...props
    },
    ref,
  ) => {
    const [isSecure, setIsSecure] = useState(secure);
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View style={styles.container}>
        {label && <Text style={[styles.label, { color: COLORS.WHITE }]}>{label}</Text>}

        <View
          style={[
            styles.inputWrapper,
            {
              borderColor: error ? 'red' : isFocused ? COLORS.PRIMARY : COLORS.GRAY,
              backgroundColor: COLORS.WHITE,
            },
          ]}
        >
          {iconType && iconName && (
            <Icon componentName={iconType} iconName={iconName} size={ms(22)} color={COLORS.GRAY} />
          )}

          <TextInput
            value={value}
            key={isSecure ? 'secure' : 'text'}
            ref={ref}
            style={[styles.input, { color: COLORS.BLACK }, style]}
            placeholderTextColor={COLORS.GRAY}
            secureTextEntry={isSecure}
            autoCapitalize='none'
            textContentType='password'
            returnKeyType={onSubmitNext ? 'next' : 'done'}
            onSubmitEditing={onSubmitNext}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {showpass && secure && (
            <Pressable style={styles.eyeBtn} onPress={() => setIsSecure(prev => !prev)}>
              <Icon
                componentName='Feather'
                iconName={isSecure ? 'eye-off' : 'eye'}
                size={ms(18)}
                color={COLORS.GRAY}
              />
            </Pressable>
          )}
        </View>

        {error && <Typography style={styles.error}>{error}</Typography>}
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: ms(8),
    paddingHorizontal: ms(15),
    paddingVertical: ms(4),
    height:60,
  },
  input: {
    flex: 1,
    fontSize: ms(15),
    marginLeft:5,
  },
  eyeBtn: {
    zIndex: 999,
    padding: ms(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: ms(10),
    marginTop: ms(3),
  },
});

export default AppTextInput;
