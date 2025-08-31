// src/theme/index.ts
import { lightColors, darkColors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { metrics } from './metrics';

export const lightTheme = {
  colors: lightColors,
  typography,
  spacing,
  metrics,
};

export const darkTheme = {
  colors: darkColors,
  typography,
  spacing,
  metrics,
};
