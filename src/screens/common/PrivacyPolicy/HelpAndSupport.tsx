import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography, Icon } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms, mvs } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';

const HelpAndSupport = ({ navigation }) => {
  const supportOptions = [
    {
      id: 1,
      title: 'Email Us',
      subtitle: 'support@petcareapp.com',
      icon: 'mail-outline',
      color: '#4A90E2',
    },
    {
      id: 2,
      title: 'Call Support',
      subtitle: '+1 (800) 555-1234',
      icon: 'call-outline',
      color: '#00BFA5',
    },
  ];

  const faqs = [
    {
      q: 'How do I book a service?',
      a: 'Go to the “Services” tab, choose your desired service, and select your pet and preferred time slot to complete booking.',
    },
    {
      q: 'Can I cancel or reschedule my booking?',
      a: 'Yes, you can modify your booking up to 24 hours before your scheduled service through the “My Bookings” section.',
    },
    {
      q: 'How do I make a payment?',
      a: 'Payments can be made securely through credit/debit card or wallet options available during checkout.',
    },
  ];

  return (
    <AppWrapper title="Help & Support">
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: ms(100) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animatable.View animation="fadeInDown" duration={700}>
          <Typography style={styles.heading}>How can we help you?</Typography>
          <Typography style={styles.subheading}>
            We’re here to assist you with your bookings, payments, and any service inquiries.
          </Typography>
        </Animatable.View>

        {/* Contact Options */}
        <Animatable.View animation="fadeInUp" delay={200}>
          {supportOptions.map((option, index) => (
            <TouchableOpacity key={index} activeOpacity={0.8} style={styles.card}>
              <View style={[styles.iconWrapper, { backgroundColor: option.color + '15' }]}>
                <Icon
                  componentName="Ionicons"
                  iconName={option.icon}
                  size={22}
                  color={option.color}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Typography style={styles.cardTitle}>{option.title}</Typography>
                <Typography style={styles.cardSubtitle}>{option.subtitle}</Typography>
              </View>
              <Icon
                componentName="Ionicons"
                iconName="chevron-forward"
                size={18}
                color={COLORS.GRAY}
              />
            </TouchableOpacity>
          ))}
        </Animatable.View>

        {/* FAQs */}
        <Typography style={styles.sectionTitle}>Frequently Asked Questions</Typography>
        <Animatable.View animation="fadeInUp" delay={300}>
          {faqs.map((item, i) => (
            <View key={i} style={styles.faqBox}>
              <Typography style={styles.faqQuestion}>{item.q}</Typography>
              <Typography style={styles.faqAnswer}>{item.a}</Typography>
            </View>
          ))}
        </Animatable.View>
      </ScrollView>

      {/* Submit Query Button */}
      <Animatable.View animation="fadeInUp" delay={500}>
        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('SubmitQuery')}
        >
          <Typography style={styles.submitText}>Submit a Query</Typography>
        </TouchableOpacity>
      </Animatable.View>
    </AppWrapper>
  );
};

export default HelpAndSupport;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: ms(20),
  },
  heading: {
    fontSize: ms(18),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginTop: mvs(10),
  },
  subheading: {
    fontSize: ms(13),
    color: COLORS.GRAY,
    marginTop: 5,
    marginBottom: 15,
    lineHeight: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: ms(13),
    color: COLORS.BLACK,
  },
  cardSubtitle: {
    fontSize: ms(11),
    color: COLORS.GRAY,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: ms(15),
    color: COLORS.BLACK,
    marginTop: mvs(15),
    marginBottom: 10,
  },
  faqBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  faqQuestion: {
    fontWeight: '600',
    fontSize: ms(13),
    color: COLORS.BLACK,
    marginBottom: 4,
  },
  faqAnswer: {
    fontSize: ms(11.5),
    color: COLORS.GRAY,
    lineHeight: 18,
  },
  submitButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    width: '88%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    position: 'absolute',
    bottom: mvs(25),
    elevation: 3,
    shadowColor: COLORS.PRIMARY,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  submitText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(15),
  },
});
