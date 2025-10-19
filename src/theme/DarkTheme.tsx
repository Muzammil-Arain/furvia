import { DefaultTheme } from '@react-navigation/native';
import { COLORS } from 'utils/index';

export const Darktheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#121212', // Main app background
    card: '#1E1E1E', // Card or container background
    text: '#FFFFFF', // Main text color
    subtext: '#B0B0B0', // Secondary text (placeholders, subtitles)
    primary: '#BB86FC', // Accent color (buttons, highlights)
    secondary: '#03DAC6', // Secondary accent (switches, links)
    border: '#272727', // Borders, dividers
    error: '#CF6679', // Error messages or alerts
  },
};
