import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ms } from 'react-native-size-matters';
import { Icon } from './Icon';
import { IMAGES } from 'constants/assets';
import { COLORS } from 'utils/colors';

interface HeaderProps {
  goBack?: boolean;
  style?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({ goBack = true, style }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Back Button */}
      {goBack && (
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon componentName="Ionicons" iconName="arrow-back" size={24} color={COLORS.WHITE} />
        </TouchableOpacity>
      )}

      {/* Title / Logo (absolute center) */}
      <View style={styles.centerContent}>
        <Image source={IMAGES.APP_LOGO} style={styles.logo} resizeMode="contain" />
        {/* Or if you want a text title instead of logo:
        <Typography style={styles.title}>Screen Title</Typography> */}
      </View>

      {/* Right spacer */}
      <View style={styles.rightSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:20,
    paddingHorizontal: 20,
    height: ms(80),
  },
  backButton: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    top:30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: ms(50),
    width: ms(120),
  },
  rightSpacer: {
    width: 40,
  },
  title: {
    fontSize: ms(18),
    fontWeight: '600',
    color: COLORS.WHITE,
  },
});

export default Header;
