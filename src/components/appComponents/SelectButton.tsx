import { Typography } from 'components/common';
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';

interface SelectButtonProps {
  label: string;
  icon: ImageSourcePropType;
  selected: boolean;
  onPress: () => void;
}

const SelectButton: React.FC<SelectButtonProps> = ({
  label,
  icon,
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
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={[
            styles.icon,
            { tintColor: selected ?COLORS.WHITE: COLORS.SECONDARY },
          ]}
        />
      </View>
      <Typography style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    zIndex: 999,
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
  icon: {
    height: ms(50),
  },
  label: {
    marginTop: ms(8),
    fontSize: ms(14),
    color: '#FFF',
    fontWeight: '600',
  },
  selectedLabel: {
    color: '#00B3C3',
  },
});

export default SelectButton;