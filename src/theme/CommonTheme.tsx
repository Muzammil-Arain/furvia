import { DefaultTheme } from '@react-navigation/native';
import { COLORS } from 'utils/index';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.PRIMARY,
    background: COLORS.WHITE,
    card: COLORS.SECONDARY,
    text: COLORS.BLACK,
    border: COLORS.GRAY,
    notification: COLORS.PRIMARY,
  },
};

// src/theme/theme.js
export const LightTheme = {
  mode: 'light',
  background: '#FFFFFF',
  text: '#000000',
  primary: '#007AFF',
  card: '#F5F5F5',
};

export const DarkTheme = {
  mode: 'dark',
  background: '#CCCCCC',
  text: '#FFFFFF',
  primary: '#0A84FF',
  card: '#1C1C1E',
};
