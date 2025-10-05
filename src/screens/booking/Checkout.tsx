import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography, Icon } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms, mvs } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';
import { IMAGES } from 'constants/assets';

const CheckoutScreen = () => {
  return (
    <AppWrapper title='Check Out'>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Selected Pet */}
        <View style={styles.sectionHeader}>
          <Typography type='subtitle' style={styles.sectionTitle}>
            Selected Pet
          </Typography>
        </View>

        <View style={styles.petCard}>
          <View style={styles.petRow}>
            <Image
              source={{
                uri: 'https://d3544la1u8djza.cloudfront.net/APHI/Blog/2023/September/small-breeds-hero.jpg',
              }}
              style={styles.petImage}
            />
            <View style={styles.petInfo}>
              <Typography style={styles.petName}>Persian Charlie</Typography>
              <View style={styles.badgeRow}>
                <Typography style={[styles.badge, styles.badgeMale]}>Male</Typography>
                <Typography style={[styles.badge, styles.badgeAge]}>1 yr 3 m</Typography>
                <Typography style={[styles.badge, styles.badgeWeight]}>2.5 KG</Typography>
              </View>
            </View>
          </View>
        </View>

        {/* Location */}
        <Typography
          type='subtitle'
          style={[
            styles.sectionTitle,
            {
              marginTop: ms(25),
              marginLeft: ms(15),
            },
          ]}
        >
          Location
        </Typography>
        <View style={styles.locationCard}>
          <View style={styles.locationLeft}>
            <Image
              source={IMAGES.MAP_IMAGE}
              style={styles.locationIcon}
            />
            <View>
              <Typography style={styles.locationName}>Address</Typography>
              <Typography style={styles.locationAddress}>8502 Preston Rd. Inglewood</Typography>
            </View>
          </View>
          {/* <TouchableOpacity>
            <Icon
              componentName='Ionicons'
              iconName='create-outline'
              size={16}
              color={COLORS.GRAY}
            />
          </TouchableOpacity> */}
        </View>
      </ScrollView>

      {/* Price Summary */}
      <View style={styles.summaryContainer}>
        {[
          { label: 'Boarding Cost', value: '1,050 USD' },
          { label: 'Additional Charges', value: '150 USD' },
          { label: 'Tax', value: '30 USD' },
          { label: 'Discount', value: '50 USD' },
        ].map((item, index) => (
          <View style={styles.summaryRow} key={index}>
            <Typography style={styles.summaryLabel}>{item.label}</Typography>
            <Typography style={styles.summaryValue}>{item.value}</Typography>
          </View>
        ))}

        {/* Dotted Divider */}
        <View style={styles.dottedBorder} />

        <View style={styles.summaryRow}>
          <Typography style={[styles.summaryLabel, { fontWeight: '700' }]}>Total</Typography>
          <Typography style={styles.totalValue}>1,180 USD</Typography>
        </View>

        {/* Checkout Button */}
        <Animatable.View animation='pulse' iterationCount='infinite' delay={800}>
          <TouchableOpacity
            onPress={() => navigate(SCREENS.PaymentMethodScreen)}
            style={styles.checkoutButton}
          >
            <Typography style={styles.checkoutText}>Checkout</Typography>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </AppWrapper>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: ms(70),
    backgroundColor: COLORS.WHITE,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: ms(20),
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: ms(15),
  },
  changeText: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
    fontSize: ms(13),
  },
  petCard: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderRadius: 10,
    padding: ms(10),
    marginHorizontal: ms(20),
    marginTop: mvs(10),
    backgroundColor: COLORS.WHITE,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  petRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  petImage: {
    width: ms(70),
    height: ms(70),
    borderRadius: 10,
    marginRight: 10,
  },
  petInfo: { flex: 1 },
  petName: { fontWeight: '700', fontSize: ms(14), color: COLORS.BLACK },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 5,
    fontSize: ms(10),
    marginRight: 5,
  },
  badgeMale: { backgroundColor: '#fcece9', color: '#f48177' },
  badgeAge: { backgroundColor: '#fcf7ec', color: '#f7b55c' },
  badgeWeight: { backgroundColor: '#eaffff', color: '#4dcbd5' },
  locationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: ms(20),
    backgroundColor: COLORS.WHITE,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: ms(12),
    marginTop: mvs(10),
  },
  locationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIcon: {
    width: ms(40),
    height: ms(40),
    marginRight: 10,
    resizeMode: 'contain',
  },
  locationName: { fontWeight: '600', fontSize: ms(13), color: COLORS.BLACK },
  locationAddress: {
    fontSize: ms(11),
    color: COLORS.GRAY,
    opacity: 0.7,
  },
  summaryContainer: {
    margin: -20,
    flex: 1,
    backgroundColor: '#111',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: ms(30),
    marginTop: mvs(25),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryLabel: { color: COLORS.WHITE, opacity: 0.7, fontSize: ms(13) },
  summaryValue: { color: COLORS.WHITE, fontWeight: '500', fontSize: ms(13) },
  dottedBorder: {
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderColor: COLORS.WHITE,
    marginVertical: 8,
  },
  totalValue: {
    color: COLORS.WHITE,
    fontWeight: '700',
    fontSize: ms(14),
  },
  checkoutButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 40,
    elevation: 3,
  },
  checkoutText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(15),
  },
});
