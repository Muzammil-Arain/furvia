import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { ms } from 'react-native-size-matters';
import { BackgroundWrapper, Loader } from '../../../components';

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  useEffect(() => {
    // API call ya async task complete hone ke baad next screen par jao
    const timer = setTimeout(() => {
      navigation.replace('Home'); // replace to Home or Onboarding
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <BackgroundWrapper loading={false}>
      <View style={styles.container}>
        {/* App Logo */}
        <Image
          //   source={require('src/assets/images/logo.png')} // apna logo yahan lagao
          style={styles.logo}
          resizeMode="contain"
        />

        {/* App Name */}
        <Text style={styles.appName}>MyApp</Text>

        {/* Loader */}
        <Loader visible={true} />
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: ms(120),
    height: ms(120),
    marginBottom: ms(20),
  },
  appName: {
    fontSize: ms(24),
    fontWeight: 'bold',
    marginBottom: ms(30),
  },
});

export default SplashScreen;
