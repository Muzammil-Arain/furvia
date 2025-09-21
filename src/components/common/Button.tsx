import {
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
  StyleSheet,
  TextStyle,
} from 'react-native';
import { FontSize, RootState, StyleType, useAppSelector } from 'types/index';
import { COLORS } from 'utils/index';
import { Typography } from './Typography';
import { Icon, IconComponentProps } from './Icon';
import { RowComponent } from './Row';
import { StyleProp } from 'react-native';

type ButtonVariant = 'solid' | 'outline';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress?: () => void;
  style?: StyleType;
  containerStyle?: StyleType;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  loaderColor?: string;
  loaderSize?: 'small' | 'large';
  startIcon?: IconComponentProps;
  endIcon?: IconComponentProps;
  variant?: ButtonVariant; // ✅ new prop
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled,
  endIcon,
  loading = false,
  startIcon,
  containerStyle,
  loaderColor = COLORS.WHITE,
  loaderSize = 'small',
  variant = 'solid', // ✅ default
  ...props
}) => {
  const isAppLoading = useAppSelector((state: RootState) => state.app.isAppLoading);

  const buttonStyles = [
    styles.baseButton,
    variant === 'solid' ? styles.solidButton : styles.outlineButton,
    disabled || (loading && isAppLoading) ? styles.disabledButton : null,
    style,
  ];

  const textStyles = [
    styles.baseText,
    variant === 'outline' ? styles.outlineText : styles.solidText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || (loading && isAppLoading)}
      {...props}
    >
      {loading && isAppLoading ? (
        <ActivityIndicator color={loaderColor} size={loaderSize} />
      ) : (
        <RowComponent style={[{ gap: 10, justifyContent: 'center' }, containerStyle]}>
          {startIcon && <Icon {...startIcon} />}
          <Typography style={textStyles}>{title}</Typography>
          {endIcon && <Icon {...endIcon} />}
        </RowComponent>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    padding: 15,
    borderRadius: 10,
    opacity: 1,
  },
  solidButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY,
  },
  disabledButton: {
    opacity: 0.5,
  },
  baseText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: FontSize.MediumLarge,
  },
  solidText: {
    color: COLORS.WHITE,
  },
  outlineText: {
    color: COLORS.PRIMARY,
  },
});