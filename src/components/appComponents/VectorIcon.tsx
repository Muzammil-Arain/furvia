import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { Icons } from '../../util/icons';

export type IconType = keyof typeof Icons;

interface VectorIconProps {
  type: IconType;
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle | ViewStyle;
}

const VectorIcon: React.FC<VectorIconProps> = ({
  type,
  name,
  size = 24,
  color = '#000',
  style,
}) => {
  const IconComponent = Icons[type];
  return <IconComponent name={name} size={size} color={color} style={style} />;
};

export default VectorIcon;
