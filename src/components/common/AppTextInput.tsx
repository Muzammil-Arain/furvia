import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  View,
  Pressable,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import VectorIcon, { IconType } from '../appComponents/VectorIcon';
import { useTheme } from '../../context/ThemeContext';
import fonts from '../../assets/fonts';

interface AppTextInputProps extends Omit<TextInputProps, 'secureTextEntry'> {
  label?: string;
  name: string;
  error?: string | false;
  touched?: boolean;
  iconType?: IconType;
  iconName?: string;
  secure?: boolean;
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
      onSubmitNext,
      style,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const [isSecure, setIsSecure] = useState(secure);
    console.log('🚀 ~ isSecure:', isSecure);

    return (
      <View style={styles.container}>
        {label && (
          <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
        )}

        <View
          style={[
            styles.inputWrapper,
            {
              borderColor: error ? 'red' : theme.gray,
              backgroundColor: theme.background,
            },
          ]}
        >
          {iconType && iconName && (
            <VectorIcon
              type={iconType}
              name={iconName}
              size={ms(18)}
              color={theme.gray}
              style={{ marginRight: ms(8) }}
            />
          )}

          <TextInput
            ref={ref}
            style={[styles.input, { color: theme.text }, style]}
            placeholderTextColor={theme.gray}
            secureTextEntry={isSecure} // 👈 always controlled by state
            returnKeyType={onSubmitNext ? 'next' : 'done'}
            onSubmitEditing={onSubmitNext}
            {...props}
          />

          {secure && (
            <Pressable
              style={styles.eyeBtn}
              onPress={() => setIsSecure(!isSecure)}
            >
              <VectorIcon
                type="Feather"
                name={isSecure ? 'eye-off' : 'eye'}
                size={ms(18)}
                color={theme.gray}
              />
            </Pressable>
          )}
        </View>

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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: ms(8),
    paddingHorizontal: ms(15),
    paddingVertical: ms(4),
  },
  input: {
    flex: 1,
    fontFamily: fonts.PoppinsRegular,
    fontSize: ms(14),
  },
  eyeBtn: {
    zIndex: 999,
    padding: ms(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontFamily: fonts.PoppinsRegular,
    color: 'red',
    fontSize: ms(10),
  },
});

export default AppTextInput;
