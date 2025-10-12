import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/index';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import ImageViewing from 'react-native-image-viewing';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ms } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';

const ParkInfoScreen = ({ route }) => {
  const { park } = route.params;
  const [visible, setVisible] = useState(false);

  return (
    <AppWrapper title="Park info">
      {/* Park Image */}
      <Animated.View entering={FadeInUp.duration(800)}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => setVisible(true)}>
          <Animated.Image
            source={{ uri: park.image }}
            style={styles.image}
            resizeMode="cover"
            entering={FadeInDown.delay(200).duration(700)}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Park Details */}
      <Animated.View style={styles.infoContainer} entering={FadeInDown.delay(400).duration(700)}>
        <Typography style={styles.name}>{park.name}</Typography>
        <View style={styles.locationRow}>
          <Icon name="location-outline" size={ms(18)} color={COLORS.primary || '#FF7A00'} />
          <Typography style={styles.locationText}>{park.location}</Typography>
        </View>
      </Animated.View>

      {/* Fullscreen Image Viewer */}
      <ImageViewing
        images={[{ uri: park.image }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        presentationStyle="overFullScreen"
        swipeToCloseEnabled
        doubleTapToZoomEnabled
      />
    </AppWrapper>
  );
};

export default ParkInfoScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: ms(250),
    borderBottomLeftRadius: ms(14),
    borderBottomRightRadius: ms(14),
  },
  infoContainer: {
    padding: ms(20),
  },
  name: {
    fontSize: ms(20),
    fontWeight: '700',
    color: '#222',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ms(8),
  },
  locationText: {
    fontSize: ms(14),
    color: '#666',
    marginLeft: ms(5),
  },
});