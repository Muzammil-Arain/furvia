import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  Alert,
} from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { Button, Typography, Wrapper } from 'components/index';
import { IMAGES } from 'constants/assets';
import { SCREENS } from 'constants/routes';
import { navigate } from 'navigation/index';
import { COLORS } from 'utils/colors';
import { getCurrentLocation, reverseGeocode } from 'utils/location';
import { addLocation } from 'api/functions/app/home';

const MapLocationScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState<{ lat: number; long: number } | null>(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current; // opacity
  const slideAnim = useRef(new Animated.Value(50)).current; // slide from bottom

  // Run animation when address is set
  useEffect(() => {
    if (address) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          bounciness: 12,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [address]);

  // Step 1: Get User Location
  const getUserCurrentLocation = async () => {
    try {
      setLoading(true);
      const position = await getCurrentLocation();
      if (!position) throw new Error('Unable to fetch location');

      const { latitude, longitude } = position.coords;
      const response = await reverseGeocode({ latitude, longitude });

      setCoords({ lat: latitude, long: longitude });
      setAddress(response?.fullAddress || '');
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Continue Button - Save Location
  const handleContinue = async () => {
    if (!address || !coords) {
      Alert.alert('Please enable location first.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        location: {
          name: address,
          lat: coords.lat,
          long: coords.long,
        },
        zip_code: '',
      };

      setTimeout(() => {
        navigate(SCREENS.CREATEPETPROFILE);
        setLoading(false);
      }, 4000);

      // const apiResponse = await addLocation(payload);
      // console.log('✅ addLocation Response:', apiResponse);

      // if (apiResponse?.success) {
      //   navigate(SCREENS.CREATEPETPROFILE);
      // } else {
      //   console.error('❌ addLocation Error:', apiResponse.message);
      // }
    } catch (err) {
      console.error('Error saving location:', err);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <Wrapper loading={loading}>
      <View style={styles.content}>
        <Image source={IMAGES.MAP_IMAGE} resizeMode='contain' style={styles.mapImage} />

        <View style={styles.heading}>
          <Typography style={[styles.title, { color: COLORS.PRIMARY }]}>
            Enable Your Location
          </Typography>
          <Typography style={[styles.subtitle, { color: COLORS.WHITE }]}>
            Enabling location will help us find your location automatically
          </Typography>
        </View>

        {/* Animated Input */}
        {address ? (
          <Animated.View
            style={[
              styles.inputWrapper,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <TextInput
              editable={false}
              style={styles.input}
              value={address}
              multiline={true}
              onChangeText={setAddress}
              placeholder='Your location'
              placeholderTextColor={COLORS.GRAY}
            />
          </Animated.View>
        ) : null}
      </View>

      {/* Enable Location Button */}
      {!address ? (
        <Button
          style={styles.enableBtn}
          title={loading ? '' : 'Enable Location'}
          onPress={getUserCurrentLocation}
          disabled={loading}
        />
      ) : (
        <Button
          style={styles.enableBtn}
          title={loading ? '' : 'Continue'}
          onPress={handleContinue}
          disabled={loading}
        />
      )}

      {/* Skip Option */}
      {!address && (
        <TouchableOpacity disabled={loading}>
          <Typography style={[styles.skipText, { color: COLORS.WHITE }]}>Skip For Now</Typography>
        </TouchableOpacity>
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mapImage: { width: '80%', height: vs(250), marginBottom: vs(20) },
  heading: { marginBottom: vs(20), alignItems: 'center' },
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
  inputWrapper: {
    width: '90%',
    marginBottom: vs(20),
  },
  input: {
    width: '100%',
    height: vs(45),
    color: COLORS.TEXT,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: ms(13),
  },
  enableBtn: { marginBottom: vs(10), width: '100%' },
  skipText: {
    fontSize: ms(13),
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default MapLocationScreen;
