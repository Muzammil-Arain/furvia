import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  View,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import VectorIcon, { IconType } from '../appComponents/VectorIcon';
import { useTheme } from '../../context/ThemeContext';
import fonts from '../../assets/fonts';

interface AppButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  iconType?: IconType;
  iconName?: string;
  iconColor?: string;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>; // ✅ outer button style
  textStyle?: StyleProp<TextStyle>; // ✅ text style
  variant?: 'primary' | 'secondary' | 'outline';
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  iconType,
  iconName,
  iconColor,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
  textStyle, // ✅ apply it
}) => {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    if (variant === 'primary') return theme.primary;
    if (variant === 'secondary') return theme.gray;
    if (variant === 'outline') return 'transparent';
    return theme.primary;
  };

  const getBorderColor = () => {
    return variant === 'outline' ? theme.primary : 'transparent';
  };

  const getTextColor = () => {
    if (variant === 'primary') return theme.white;
    if (variant === 'secondary') return theme.white;
    if (variant === 'outline') return theme.primary;
    return theme.white;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          opacity: disabled ? 0.6 : 1,
        },
        style, // ✅ external style merged here
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View style={styles.content}>
          {iconType && iconName && (
            <VectorIcon
              type={iconType}
              name={iconName}
              size={ms(18)}
              color={iconColor || getTextColor()}
              style={{ marginRight: ms(6) }}
            />
          )}
          <Text
            style={[
              styles.text,
              { color: getTextColor() },
              textStyle, // ✅ external text style merged here
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ms(12),
    paddingHorizontal: ms(20),
    borderRadius: ms(8), // 🔥 made slightly rounder for modern look
    borderWidth: 1,
    marginVertical: ms(5),
    zIndex: 999,
  },
  text: {
    fontSize: ms(16),
    fontFamily: fonts.PoppinsMedium,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AppButton;
