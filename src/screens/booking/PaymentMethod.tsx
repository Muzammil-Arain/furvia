import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography, Icon } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms, mvs } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';

const PaymentMethodScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState('paypal');

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'Paypal',
      icon: require('../../assets/images/common/paypal_payment.png'),
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      icon: require('../../assets/images/common/google_payment.png'),
    },
    {
      id: 'applepay',
      name: 'Apple Pay',
      icon: require('../../assets/images/common/apple_payment.png'),
    },
    {
      id: 'mastercard',
      name: '•••• •••• 5566',
      icon: require('../../assets/images/common/master_payment.png'),
    },
  ];

  return (
    <AppWrapper title='Payment Method'>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Typography type='subtitle' style={styles.sectionTitle}>
          Select Payment Method
        </Typography>

        {/* Payment Options */}
        {paymentMethods.map((method, index) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodCard,
              selectedMethod === method.id && { borderColor: COLORS.PRIMARY, elevation: 4 },
            ]}
            activeOpacity={0.9}
            onPress={() => setSelectedMethod(method.id)}
          >
            <View style={styles.methodLeft}>
              <Image source={method.icon} style={styles.methodIcon} resizeMode='contain' />
              <Typography style={styles.methodName}>{method.name}</Typography>
            </View>
            <View
              style={[styles.radioOuter, selectedMethod === method.id && styles.radioOuterActive]}
            >
              {selectedMethod === method.id && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Price Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Typography style={styles.summaryLabel}>Total</Typography>
          <Typography style={styles.summaryValue}>1,180 USD</Typography>
        </View>

        {/* Checkout Button */}
        <Animatable.View animation='pulse' iterationCount='infinite' delay={800}>
          <TouchableOpacity onPress={()=>navigate(SCREENS.BookingComplete)} style={styles.checkoutButton}>
            <Typography style={styles.checkoutText}>Checkout</Typography>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </AppWrapper>
  );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: ms(50),
    backgroundColor: COLORS.WHITE,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: ms(15),
    marginHorizontal: ms(20),
    marginBottom: mvs(10),
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.SILVER,
    borderRadius: 10,
    marginHorizontal: ms(20),
    marginVertical: 8,
    backgroundColor: COLORS.WHITE,
    paddingVertical: ms(12),
    paddingHorizontal: ms(15),
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    width: ms(35),
    height: ms(35),
    marginRight: 12,
  },
  methodName: {
    fontSize: ms(13),
    color: COLORS.BLACK,
    fontWeight: '500',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: COLORS.PRIMARY,
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: COLORS.PRIMARY,
  },
  summaryContainer: {
    margin: -20,
    backgroundColor: '#111',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: ms(20),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryLabel: { color: COLORS.WHITE, opacity: 0.7, fontSize: ms(13) },
  summaryValue: { color: COLORS.WHITE, fontWeight: '600', fontSize: ms(13) },
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
