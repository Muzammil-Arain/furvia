// src/theme/metrics.ts
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const metrics = {
  screenWidth: width,
  screenHeight: height,
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
  },
  shadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
};
