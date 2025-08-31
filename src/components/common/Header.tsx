import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { APP_LOGO } from '../../assets';
import { ms } from 'react-native-size-matters';
import VectorIcon from '../appComponents/VectorIcon';

const Header: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <VectorIcon type="Ionicons" name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Center Logo */}
      <View style={styles.logoContainer}>
        {/* Replace with your logo image or text */}
        <Image source={APP_LOGO} style={styles.logo} resizeMode="contain" />
        {/* Or you can use Text instead of Image */}
        {/* <Text style={styles.logoText}>MyApp</Text> */}
      </View>

      {/* Right spacer to balance layout */}
      <View style={styles.rightSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
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
