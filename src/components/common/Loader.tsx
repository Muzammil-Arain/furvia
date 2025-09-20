import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Animated, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, screenHeight, screenWidth } from 'utils/index';

interface LoaderProps {
  containerStyle?: ViewStyle;
}

export const Loader: React.FC<LoaderProps> = ({ containerStyle }) => {
  const [rotate] = useState(new Animated.Value(0)); // Animated value for rotation
  const [scale] = useState(new Animated.Value(1)); // Animated value for scaling

  useEffect(() => {
    // Rotate animation
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Scale animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [rotate, scale]);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View
        style={[
          styles.loaderContainer,
          {
            transform: [{ rotate: rotateInterpolate }, { scale }],
          },
        ]}
      >
        <ActivityIndicator color={COLORS.PRIMARY} size={'large'} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: screenHeight(100),
    width: screenWidth(100),
    backgroundColor: COLORS.BLACK,
    opacity: 0.7,
    zIndex: 999,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Soft black background with transparency
    borderRadius: 100,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});