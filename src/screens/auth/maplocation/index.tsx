import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { BackgroundWrapper } from '../../../components';
import { useTheme } from '../../../context/ThemeContext';
import { AppButton } from '../../../components/common';
import fonts from '../../../assets/fonts';
import { MAP_IMAGE } from '../../../assets';
import Geolocation from 'react-native-geolocation-service';
import { navigate } from '../../../util/navigation';

const MapLocationScreen: React.FC = () => {
  const { theme } = useTheme();

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location permission is required');
      return;
    }

    try {
      Geolocation.getCurrentPosition(
        position => {
          console.log('User Location:', position);
          Alert.alert(
            'Location Fetched',
            `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`,
          );
        },
        error => {
          console.log(error);
          Alert.alert('Error', error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } catch (error) {
      console.log('🚀 ~ getCurrentLocation ~ error:', error);
    }
  };

  return (
    <BackgroundWrapper loading={false}>
      <View style={styles.content}>
        <Image
          source={MAP_IMAGE}
          resizeMode="contain"
          style={styles.mapImage}
        />

        <View style={styles.heading}>
          <Text style={[styles.title, { color: theme.primary }]}>
            Enable Your Location
          </Text>
          <Text style={[styles.subtitle, { color: theme.white }]}>
            Enabling location will help us to find your location automatically
          </Text>
        </View>
      </View>

      {/* Button */}
      <AppButton
        style={styles.enableBtn}
        title="Enable Location"
        onPress={() => navigate('PetProfile')}
      />

      {/* Skip Option */}
      <TouchableOpacity>
        <Text style={[styles.skipText, { color: theme.white }]}>
          Skip For Now
        </Text>
      </TouchableOpacity>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mapImage: { width: '80%', height: vs(250), marginBottom: vs(20) },
  heading: { marginBottom: vs(30), alignItems: 'center' },
  title: {
    fontSize: ms(20),
    fontFamily: fonts.PoppinsBold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: ms(13),
    marginTop: ms(6),
    fontFamily: fonts.PoppinsRegular,
    textAlign: 'center',
    lineHeight: ms(18),
  },
  enableBtn: { marginBottom: vs(15), width: '100%' },
  skipText: {
    fontSize: ms(13),
    fontFamily: fonts.PoppinsRegular,
    textAlign: 'center',
  },
});

export default MapLocationScreen;
