import { Button, Typography, Wrapper } from 'components/index';
import { IMAGES } from 'constants/assets';
import { SCREENS } from 'constants/routes';
import { navigate } from 'navigation/index';
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';
import { getCurrentLocation, reverseGeocode } from 'utils/location';

const MapLocationScreen: React.FC = () => {
  const getUserCurrentLocation = async () => {
    try {
      const position = await getCurrentLocation();
      if (position) {
        const { latitude, longitude } = position.coords;
        const response = await reverseGeocode({ latitude, longitude });
        navigate(SCREENS.CREATEPETPROFILE);
        console.log('🚀 ~ getUserCurrentLocation ~ response:', response);
      }
    } catch (error) {
      console.error('Error getting user current location:', error);
    }
  };

  return (
    <Wrapper>
      <View style={styles.content}>
        <Image source={IMAGES.MAP_IMAGE} resizeMode='contain' style={styles.mapImage} />

        <View style={styles.heading}>
          <Typography style={[styles.title, { color: COLORS.PRIMARY }]}>
            Enable Your Location
          </Typography>
          <Typography style={[styles.subtitle, { color: COLORS.WHITE }]}>
            Enabling location will help us to find your location automatically
          </Typography>
        </View>
      </View>

      {/* Button */}
      <Button style={styles.enableBtn} title='Enable Location' onPress={getUserCurrentLocation} />

      {/* Skip Option */}
      <TouchableOpacity>
        <Typography style={[styles.skipText, { color: COLORS.WHITE }]}>Skip For Now</Typography>
      </TouchableOpacity>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mapImage: { width: '80%', height: vs(250), marginBottom: vs(20) },
  heading: { marginBottom: vs(30), alignItems: 'center' },
  title: {
    fontWeight: 'bold',
    fontSize: ms(30),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: ms(13),
    marginTop: ms(6),
    textAlign: 'center',
    lineHeight: ms(18),
    fontWeight: '500',
  },
  enableBtn: { marginBottom: vs(10), width: '100%' },
  skipText: {
    fontSize: ms(13),
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default MapLocationScreen;
