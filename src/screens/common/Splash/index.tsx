import React, { useEffect, useRef } from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  Animated,
  Easing,
} from 'react-native';
import { screenHeight, screenWidth, COLORS } from 'utils/index';

export const Splash = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Run animation on mount
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: COLORS.SECONDARY }]}>
      <StatusBar backgroundColor={COLORS.SECONDARY} barStyle="light-content" />
      <ImageBackground
        resizeMode="cover"
        source={require('../../../assets/images/common/Splash_BG.png')}
        style={styles.bg}
      >
        <Animated.Image
          source={require('../../../assets/images/common/Splash_Icon.png')}
          style={[
            styles.logo,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth(100),
    height: screenHeight(100),
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});