import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Platform, ViewStyle } from 'react-native';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface FloatingWotNotProps {
  onPress: () => void;
  style?: ViewStyle;
}

const FloatingWotNot: React.FC<FloatingWotNotProps> = ({ onPress, style }) => {
  return (
    <Animated.View entering={FadeInUp.duration(500)} style={[styles.wrapper, style]}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/9278/9278608.png',
          }}
          resizeMode='contain'
          style={styles.icon}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FloatingWotNot;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: ms(120),
    right: ms(20),
    zIndex: 1000,
    elevation: 10,
  },
  container: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: ms(40),
    height: ms(50),
    width: ms(50),
    justifyContent: 'center',
    alignItems: 'center',

    // Shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 3,

    // Elevation for Android
    ...Platform.select({
      android: {
        elevation: 6,
      },
    }),
  },
  icon: {
    height: ms(26),
    width: ms(26),
    tintColor: COLORS.WHITE,
  },
});
