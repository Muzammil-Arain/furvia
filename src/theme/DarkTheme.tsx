import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

export const Darktheme = {
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#000000',
    text: '#FFFFFF',
    primary: '#0A84FF',
    card: '#1C1C1E',
    border: '#3A3A3C',

    DARK_PURPLE: '#AD4FDB',
    HEADER_BACKGROUND: '#2B0040',
    PRIMARY: '#00E5FF',
    SECONDARY: '#C77DFF',
    LIGHT_PERPLE: '#8D26C0',
  },
};
