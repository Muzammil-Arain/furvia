import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { reset } from 'navigation/index';
import { SCREENS } from 'constants/routes';
import { Typography } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms, mvs } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';

const BookingComplete = () => {
  return (
    <AppWrapper title='Booking Completed'>
      <View style={styles.container}>
        {/* Success Image with Animation */}
        <Animatable.Image
          animation='zoomIn'
          duration={1000}
          delay={100}
          easing='ease-out'
          source={require('../../assets/images/common/complete_booking.png')}
          style={styles.image}
          resizeMode='contain'
        />

        {/* Success Title */}
        <Animatable.View animation='fadeInUp' delay={600}>
          <Typography type='title' style={styles.sectionTitle}>
            Booking Successful 🎉
          </Typography>
        </Animatable.View>

        {/* Subtitle */}
        <Animatable.View animation='fadeInUp' delay={800}>
          <Typography type='subtitle' style={styles.sectionsubTitle}>
            Your booking has been confirmed successfully! Sit back and relax — we’ll take care of
            the rest.
          </Typography>
        </Animatable.View>

        {/* Back to Home Button */}
        <Animatable.View animation='fadeInUp' delay={1000}>
          <TouchableOpacity
            onPress={() => reset(SCREENS.BOTTOM_STACK)}
            activeOpacity={0.9}
            style={styles.checkoutButton}
          >
            <Typography style={styles.checkoutText}>Back to Home</Typography>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </AppWrapper>
  );
};

export default BookingComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(20),
    backgroundColor: COLORS.WHITE,
  },
  image: {
    alignSelf: 'center',
    width: ms(300),
    height: ms(300),
    marginTop: mvs(30),
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: ms(20),
    color: COLORS.BLACK,
    textAlign: 'center',
    marginTop: mvs(25),
  },
  sectionsubTitle: {
    fontSize: ms(13),
    color: COLORS.GRAY,
    textAlign: 'center',
    marginTop: mvs(10),
    lineHeight: 20,
    opacity: 0.8,
    paddingHorizontal: ms(15),
  },
  checkoutButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: mvs(30),
    elevation: 3,
    shadowColor: COLORS.PRIMARY,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  checkoutText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(15),
  },
});
