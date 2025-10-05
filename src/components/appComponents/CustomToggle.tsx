import React from 'react';
import { TouchableOpacity, Animated, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from 'utils/index';

interface ToggleProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  style?: ViewStyle;
}

export const CustomToggle: React.FC<ToggleProps> = ({ value, onValueChange, style }) => {
  const offset = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(offset, {
      toValue: value ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = offset.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const bgColor = offset.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.SILVER, COLORS.SECONDARY],
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onValueChange(!value)} style={[style]}>
      <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
        <Animated.View style={[styles.knob, { transform: [{ translateX }] }]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 28,
    borderRadius: 15,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  knob: {
    width: 14,
    height: 14,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
});
