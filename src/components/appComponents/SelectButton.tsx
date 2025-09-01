import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import VectorIcon, { IconType } from './VectorIcon';

interface SelectButtonProps {
  label: string;
  iconName: string; // actual icon name
  iconType: IconType; // must match VectorIcon types
  selected: boolean;
  onPress: () => void;
}

const SelectButton: React.FC<SelectButtonProps> = ({
  label,
  iconName,
  iconType,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={[styles.iconWrapper, selected && styles.selectedIconWrapper]}
      ></View>
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    margin: ms(10),
  },
  iconWrapper: {
    width: ms(90),
    height: ms(90),
    borderRadius: ms(100),
    borderWidth: 2,
    borderColor: '#6E44FF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#470668',
  },
  selectedIconWrapper: {
    backgroundColor: '#00B3C3',
    borderWidth: 2,
    borderColor: '#fff',
  },
  label: {
    marginTop: ms(8),
    fontSize: ms(14),
    color: '#00B3C3',
    fontWeight: '600',
  },
  selectedLabel: {
    color: '#FFF',
  },
});

export default SelectButton;
