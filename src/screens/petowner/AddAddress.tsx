import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography, Icon } from 'components/index';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { COLORS } from 'utils/colors';
import { ms, mvs } from 'react-native-size-matters';
import { getCurrentLocation, reverseGeocode } from 'utils/location';

const AddAddress = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zipCode, setZipCode] = useState('60653');
  const [address, setAddress] = useState('3517 W. Gray St. Utica, Pen 57867');
  const [apt, setApt] = useState('32/2 R');
  const [floor, setFloor] = useState('6');
  const [phone, setPhone] = useState('123 456 789');

  useEffect(() => {
    getUserCurrentLocation();
  }, []);

  // ✅ Get User Location (Safe for Android/iOS)
  const getUserCurrentLocation = async () => {
    try {
      setLoading(true);
      const position = await getCurrentLocation();
      if (!position) throw new Error('Unable to fetch location');

      const { latitude, longitude } = position.coords;
      const response = await reverseGeocode({ latitude, longitude });

      setLocation({ latitude: latitude, longitude: longitude });
      setAddress(response?.fullAddress || '');
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AppWrapper title='Add Address'>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Map Section */}
        <View style={styles.mapContainer}>
          {!location?.latitude ? (
            <ActivityIndicator size='large' color={COLORS.SECONDARY} />
          ) : (
            <>
              <MapView
                  style={styles.map}
                  region={{
                    latitude: location?.latitude || 37.78825,
                    longitude: location?.longitude || -122.4324,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  showsUserLocation
                  showsMyLocationButton
                >
                  {location && (
                    <Marker
                      coordinate={location}
                      title='Your Location'
                      description='Current position'
                    >
                      <Image
                        // source={require('../../assets/icons/common/pin.png')}
                        style={styles.pinImage}
                      />
                    </Marker>
                  )}
                </MapView> 
            </>
          )}
        </View>

        {/* Zip Code */}
        <Typography style={styles.label}>Zip Code</Typography>
        <View style={styles.inputRow}>
          <TextInput
            value={zipCode}
            onChangeText={setZipCode}
            style={[styles.input, { flex: 1 }]}
            keyboardType='numeric'
          />
          <View style={styles.availableTag}>
            <Typography style={styles.availableText}>Available</Typography>
          </View>
        </View>

        {/* Address Details */}
        <Typography style={styles.label}>Address Details</Typography>
        <View style={styles.inputRow}>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={[styles.input, { flex: 1 }]}
          />
          <Icon
            componentName='Ionicons'
            iconName='location-outline'
            color={COLORS.GRAY}
            size={18}
            style={{ marginLeft: 8 }}
          />
        </View>

        {/* Apt & Floor */}
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Typography style={styles.label}>Apt</Typography>
            <TextInput value={apt} onChangeText={setApt} style={styles.inputBox} />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Typography style={styles.label}>Floor</Typography>
            <TextInput
              value={floor}
              onChangeText={setFloor}
              style={styles.inputBox}
              keyboardType='numeric'
            />
          </View>
        </View>

        {/* Phone Number */}
        <Typography style={styles.label}>Phone Number</Typography>
        <View style={styles.inputRowSingle}>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.inputBox}
            keyboardType='phone-pad'
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.9}>
          <Typography style={styles.saveText}>Save Address</Typography>
        </TouchableOpacity>
      </ScrollView>
    </AppWrapper>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    paddingBottom: ms(80),
    backgroundColor: COLORS.WHITE,
  },
  mapContainer: {
    height: mvs(200),
    marginHorizontal: ms(20),
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: mvs(10),
    backgroundColor: COLORS.SILVER,
    elevation: 3,
  },
  map: { flex: 1 },
  pinImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  label: {
    fontWeight: '600',
    fontSize: ms(13),
    color: COLORS.BLACK,
    marginHorizontal: ms(22),
    marginTop: mvs(15),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ms(20),
    marginTop: 6,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.SILVER,
    paddingHorizontal: 10,
    elevation: 1,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: ms(12),
    color: COLORS.BLACK,
  },
  inputRowSingle: {
    marginHorizontal: ms(20),
    marginTop: 6,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: COLORS.SILVER,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: ms(12),
    color: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
    elevation: 1,
  },
  availableTag: {
    backgroundColor: '#E6FFEA',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  availableText: {
    color: '#00C853',
    fontSize: ms(11),
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: ms(20),
  },
  saveButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    width: '88%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    marginTop: mvs(35),
    elevation: 3,
    shadowColor: COLORS.PRIMARY,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  saveText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(15),
  },
});
