import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms, mvs } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';

const TermsAndConditions = ({ navigation }) => {
  return (
    <AppWrapper title="Terms & Conditions">
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: ms(100) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animatable.View animation="fadeInDown" duration={700}>
          <Typography style={styles.heading}>Welcome to PetCare Services</Typography>
          <Typography style={styles.subheading}>
            Please read these Terms & Conditions carefully before using our services.
          </Typography>
        </Animatable.View>

        {/* Body */}
        <Animatable.View animation="fadeInUp" delay={200}>
          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>1. Acceptance of Terms</Typography>
            <Typography style={styles.text}>
              By accessing or using our app, you agree to be bound by these Terms and all
              applicable laws and regulations. If you do not agree with any of these terms, you are
              prohibited from using or accessing this app.
            </Typography>
          </View>

          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>2. Use License</Typography>
            <Typography style={styles.text}>
              Permission is granted to temporarily download one copy of the materials for personal,
              non-commercial transitory viewing only. This is the grant of a license, not a
              transfer of title.
            </Typography>
          </View>

          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>3. User Responsibilities</Typography>
            <Typography style={styles.text}>
              You agree not to misuse our services or help anyone else to do so. You may not
              interfere with or disrupt the integrity of our system or attempt to gain unauthorized
              access.
            </Typography>
          </View>

          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>4. Payment and Refund Policy</Typography>
            <Typography style={styles.text}>
              All payments are final and non-refundable except in the case of a service error or
              cancellation from our side. Refunds, if applicable, will be processed within 7–10
              business days.
            </Typography>
          </View>

          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>5. Limitation of Liability</Typography>
            <Typography style={styles.text}>
              In no event shall PetCare Services or its suppliers be liable for any damages arising
              out of the use or inability to use the materials on our platform.
            </Typography>
          </View>

          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>6. Changes to Terms</Typography>
            <Typography style={styles.text}>
              We may revise these terms at any time without notice. By using this app you are
              agreeing to be bound by the current version of these Terms and Conditions.
            </Typography>
          </View>

          <View style={styles.section}>
            <Typography style={styles.sectionTitle}>7. Contact Information</Typography>
            <Typography style={styles.text}>
              If you have any questions about these Terms, please contact us at:
              support@petcareapp.com
            </Typography>
          </View>
        </Animatable.View>
      </ScrollView>

      {/* Accept Button */}
      <Animatable.View animation="fadeInUp" delay={500}>
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

export default TermsAndConditions;

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
