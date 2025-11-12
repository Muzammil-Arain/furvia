import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms, mvs } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';

const PrivacyPolicy = ({ navigation }) => {
  return (
    <AppWrapper title='Privacy Policy'>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: ms(100) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animatable.View animation='fadeInDown' duration={700}>
          <Typography style={styles.heading}>FURVIA PRIVACY POLICY</Typography>
          <Typography style={styles.subheading}>
            Welcome to Furvia — where pet care meets convenience.
          </Typography>
        </Animatable.View>

        {/* Body */}
        <Animatable.View animation='fadeInUp' delay={200}>
          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>1. What We Collect</Typography>
            <Typography style={styles.text}>
              We collect personal info (name, email, payment), pet details, and device data to
              deliver and improve our services.
            </Typography>
          </View>

          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>2. How We Use It</Typography>
            <Typography style={styles.text}>
              To manage accounts, facilitate bookings, communicate, and ensure safety. Data helps us
              prevent fraud and improve user experience.
            </Typography>
          </View>

          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>3. Sharing Your Information</Typography>
            <Typography style={styles.text}>
              We only share data with Providers, payment partners, and authorities when required by
              law. We never sell personal data.
            </Typography>
          </View>

          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>4. Cookies and Tracking</Typography>
            <Typography style={styles.text}>
              We use cookies and analytics for better performance and personalization. You may
              adjust your browser settings to disable them.
            </Typography>
          </View>

          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>5. Your Choices</Typography>
            <Typography style={styles.text}>
              Access or delete your data, opt out of marketing, or request corrections anytime by
              contacting privacy@furvia.com.
            </Typography>
          </View>

          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>6. Data Security</Typography>
            <Typography style={styles.text}>
              We use encryption and security protocols but cannot guarantee absolute protection. Use
              the platform responsibly.
            </Typography>
          </View>

          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>7. Children’s Privacy</Typography>
            <Typography style={styles.text}>
              Furvia is not directed to children under 13, and we do not knowingly collect their
              data.
            </Typography>
          </View>

          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>8. Changes to This Policy</Typography>
            <Typography style={styles.text}>
              We may update this Policy to reflect service changes. Updates will appear in-app with
              revised dates.
            </Typography>
          </View>

          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>9. Contact Us</Typography>
            <Typography style={styles.text}>
              For privacy concerns, email privacy@furvia.com or write to Furvia, Inc., Las Vegas, NV
              89143.
            </Typography>
          </View>

          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>App Checkbox Summary</Typography>
            <Typography style={styles.text}>
              By continuing, you agree that Furvia connects you with independent Providers and that
              Furvia is not responsible for Provider actions, refunds, or outcomes. You agree to our
              Terms of Use and Privacy Policy.
            </Typography>
          </View>
        </Animatable.View>
      </ScrollView>

      {/* Accept Button */}
      <Animatable.View animation='fadeInUp' delay={500}>
        <TouchableOpacity
          style={styles.acceptButton}
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
        >
          <Typography style={styles.acceptText}>Accept & Continue</Typography>
        </TouchableOpacity>
      </Animatable.View>
    </AppWrapper>
  );
};

export default PrivacyPolicy;

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
  section: {
    marginBottom: mvs(15),
  },
  sectionTitle: {
    fontSize: ms(14),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: 4,
  },
  text: {
    fontSize: ms(12),
    color: COLORS.GRAY,
    lineHeight: 20,
  },
  acceptButton: {
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
  acceptText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(15),
  },
});
