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
          <Icon componentName='Ionicons' iconName='arrow-back' size={24} color={COLORS.WHITE} />
        </TouchableOpacity>
      )}

      {/* Center Logo */}
      <View style={styles.logoContainer}>
        <Image source={IMAGES.APP_LOGO} style={styles.logo} resizeMode='contain' />
      </View>

      {/* Right spacer to balance layout */}
      <View style={styles.rightSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40,
    alignItems: 'flex-start',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: ms(100),
    width: ms(120),
  },
  rightSpacer: {
    width: 40,
  },
});

export default Header;
