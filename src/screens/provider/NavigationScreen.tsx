import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Typography } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import { navigate, onBack } from 'navigation/index';
import { SCREENS } from 'constants/routes';

const NavigationScreen = () => {
  const region = {
    latitude: 40.718217,
    longitude: -74.068586,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const coordinates = [
    { latitude: 40.718217, longitude: -74.068586 },
    { latitude: 40.725217, longitude: -74.045586 },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.HEADER_BACKGROUND, COLORS.HEADER_BACKGROUND]}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => onBack()} style={styles.backBtn}>
          <Icon name='arrow-back' size={24} color={COLORS.WHITE} />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Typography style={styles.headerTitle}>Navigation</Typography>
          <Typography style={styles.headerSubtitle}>En Route to Customer</Typography>
        </View>

        <View style={styles.headerRightSpace} />
      </LinearGradient>

      {/* Map View */}
      <MapView style={styles.map} region={region}>
        {/* Driver Marker */}
        <Marker coordinate={coordinates[0]} title='Your Location'>
          <View style={styles.markerWrapper}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/8587/8587894.png' }}
              style={styles.markerImage}
            />
          </View>
        </Marker>

        {/* Customer Marker */}
        <Marker coordinate={coordinates[1]} title='Customer'>
          <View style={[styles.markerWrapper]}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3710/3710297.png' }}
              style={styles.markerImage}
            />
          </View>
        </Marker>

        <Polyline coordinates={coordinates} strokeWidth={4} strokeColor={COLORS.PRIMARY} />
      </MapView>

      {/* Bottom Info Card */}
      <View style={styles.bottomCard}>
        <View style={styles.rowBetween}>
          <View>
            <Typography style={styles.boldText}>Estimated Arrival</Typography>
            <View style={styles.row}>
              <Icon name='time-outline' size={16} color={COLORS.HEADER_BACKGROUND} />
              <Typography style={styles.grayText}> 8 minutes</Typography>
            </View>
          </View>
          <View>
            <Typography style={styles.boldText}>Distance</Typography>
            <Typography style={styles.grayText}>2.4 miles</Typography>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/597/597177.png' }}
              style={{
                width: 17,
                height: 17,
                tintColor: COLORS.HEADER_BACKGROUND,
              }}
            />
            <Typography style={styles.btnText}>Call</Typography>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate(SCREENS.UserChatScreen)}
            style={styles.actionBtn}
          >
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3193/3193061.png' }}
              style={{
                width: 17,
                height: 17,
                tintColor: COLORS.HEADER_BACKGROUND,
              }}
            />
            <Typography style={styles.btnText}>Chat</Typography>
          </TouchableOpacity>
        </View>
      </View>

      {/* Start Navigation Button */}
      {/* <TouchableOpacity style={styles.bottomBtn}>
        <LinearGradient
          colors={[COLORS.HEADER_BACKGROUND, COLORS.HEADER_BACKGROUND]}
          style={styles.bottomBtnGradient}
        >
          <Icon name='navigate-outline' size={18} color={COLORS.WHITE} />
          <Typography style={styles.bottomBtnText}>Start Navigation</Typography>
        </LinearGradient>
      </TouchableOpacity> */}
    </View>
  );
};

export default NavigationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    height: ms(100),
    borderBottomLeftRadius: ms(24),
    borderBottomRightRadius: ms(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(16),
    paddingTop: ms(20),
  },
  backBtn: {
    marginRight: ms(12),
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    color: COLORS.WHITE,
    fontWeight: '700',
    fontSize: ms(18),
    textAlign: 'center',
  },
  headerSubtitle: {
    color: COLORS.WHITE,
    fontSize: ms(13),
    opacity: 0.9,
    textAlign: 'center',
  },
  headerRightSpace: {
    width: ms(32),
  },
  map: {
    flex: 1,
  },
  markerWrapper: {
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(25),
    elevation: 3,
  },
  markerImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  customerMarker: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 2,
  },
  bottomCard: {
    backgroundColor: COLORS.WHITE,
    position: 'absolute',
    bottom: ms(20),
    alignSelf: 'center',
    width: '90%',
    borderRadius: ms(16),
    padding: ms(16),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: ms(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: '700',
    color: COLORS.TEXT,
    fontSize: ms(14),
  },
  grayText: {
    color: COLORS.GRAY,
    fontSize: ms(13),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(6),
  },
  actionBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.HEADER_BACKGROUND,
    borderRadius: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ms(8),
    marginHorizontal: ms(6),
  },
  btnText: {
    color: COLORS.SECONDARY,
    fontWeight: '600',
    marginLeft: ms(4),
  },
  bottomBtn: {
    position: 'absolute',
    bottom: ms(20),
    alignSelf: 'center',
    width: '90%',
  },
  bottomBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(50),
    borderRadius: ms(12),
  },
  bottomBtnText: {
    color: COLORS.WHITE,
    fontWeight: '700',
    marginLeft: ms(6),
    fontSize: ms(15),
  },
});
