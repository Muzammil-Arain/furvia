import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert, Share, Modal } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { ms } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import Clipboard from '@react-native-clipboard/clipboard';
import { Icon, Typography } from 'components';

const REFERRAL_CODE = 'ea6kU6pDpZRfbOPea6kU6pDpZRfbOP';

const ReferralProgram = () => {
  const [showModal, setShowModal] = useState(false);

  /** Copy referral code */
  const handleCopyCode = useCallback(() => {
    Clipboard.setString(REFERRAL_CODE);
    Alert.alert('Copied!', 'Referral code copied to clipboard.');
  }, []);

  /** Share referral code */
  const handleShare = useCallback(async () => {
    try {
      const message = `🎉 Join Dogfather now and earn rewards!\nUse my referral code: ${REFERRAL_CODE}`;
      await Share.share({ message, title: 'Dogfather Referral Code' });
    } catch {
      Alert.alert('Error', 'Unable to share at the moment.');
    }
  }, []);

  return (
    <AppWrapper title='Referral Program'>
      <View style={styles.container}>
        {/* Invite Banner */}
        <Animated.View entering={FadeInUp.duration(700)} style={styles.inviteBanner}>
          <View style={styles.textContainer}>
            <Typography style={styles.smallText}>Help your friends</Typography>
            <Typography style={styles.smallText}>Discover</Typography>
            <Typography style={styles.appName}>Dogfather</Typography>

            <TouchableOpacity style={styles.inviteButton} onPress={handleShare}>
              <Typography style={styles.inviteButtonText}>Invite</Typography>
            </TouchableOpacity>
          </View>

          <Image
            source={require('../../assets/images/common/sharepeople.png')}
            resizeMode='contain'
            style={styles.peopleImage}
          />
        </Animated.View>

        {/* Referral Code Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(700)} style={styles.codeCard}>
          <View style={styles.iconWrapper}>
            <Image
              source={require('../../assets/images/common/sharePhone.png')}
              resizeMode='contain'
              style={styles.phoneImage}
            />
          </View>

          <View style={styles.codeTextContainer}>
            <Typography style={styles.codeTitle}>Copy Your Code</Typography>
            <Typography style={styles.codeValue} numberOfLines={1}>
              {REFERRAL_CODE}
            </Typography>
          </View>

          <TouchableOpacity onPress={handleCopyCode}>
            <Icon
              componentName='MaterialIcons'
              iconName='content-copy'
              size={ms(22)}
              color={COLORS.PRIMARY}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* Share Section */}
        <Animated.View entering={FadeInUp.delay(400).duration(700)} style={styles.shareContainer}>
          <Typography style={styles.shareTitle}>Or Share</Typography>

          <TouchableOpacity onPress={handleShare} style={styles.shareIconContainer}>
            <Icon
              componentName='Ionicons'
              iconName='share-social-sharp'
              size={ms(50)}
              color={COLORS.PRIMARY}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowModal(true)} style={styles.howItWorksContainer}>
            <Icon
              componentName='Feather'
              iconName='alert-circle'
              size={ms(17)}
              color={COLORS.BLACK}
            />
            <Typography style={styles.howItWorksText}>How It Works</Typography>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Modal Section */}
      <Modal
        visible={showModal}
        transparent
        animationType='slide'
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.dragHandle} />

            <View style={styles.header}>
              <Icon
                componentName='Ionicons'
                iconName='information-circle-outline'
                size={ms(20)}
                color={COLORS.PRIMARY}
              />
              <Typography style={styles.headerText}>How It Works</Typography>
            </View>

            {[
              'Invite your friends & businesses',
              'They register Dogfather Grooming with special offer',
              'You make your earning',
            ].map((step, index) => (
              <View key={index} style={styles.step}>
                <View style={styles.stepNumberContainer}>
                  <Typography style={styles.stepNumber}>
                    {String(index + 1).padStart(2, '0')}
                  </Typography>
                </View>
                <Typography style={styles.stepText}>{step}</Typography>
              </View>
            ))}

            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.closeButton}>
              <Typography style={styles.closeButtonText}>Got it</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </AppWrapper>
  );
};

export default React.memo(ReferralProgram);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(20),
    paddingTop: ms(10),
  },

  // Invite Banner
  inviteBanner: {
    backgroundColor: COLORS.LIGHT_BLUE,
    height: ms(120),
    borderRadius: ms(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: ms(20),
    alignItems: 'center',
    overflow: 'hidden',
  },
  textContainer: { flex: 1 },
  smallText: { fontSize: ms(10), color: COLORS.BLACK },
  appName: { fontSize: ms(13), fontWeight: 'bold', color: COLORS.BLACK },
  inviteButton: {
    marginTop: ms(10),
    backgroundColor: COLORS.PRIMARY,
    width: ms(70),
    justifyContent: 'center',
    alignItems: 'center',
    height: ms(30),
    borderRadius: ms(8),
  },
  inviteButtonText: { fontSize: ms(10), color: COLORS.WHITE },
  peopleImage: { width: ms(150), height: ms(150) },

  // Referral Code Card
  codeCard: {
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    height: ms(120),
    borderRadius: ms(12),
    marginVertical: ms(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(20),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  iconWrapper: {
    backgroundColor: COLORS.PRIMARY,
    padding: ms(18),
    borderRadius: ms(16),
  },
  phoneImage: { width: ms(60), height: ms(60) },
  codeTextContainer: { flex: 1, marginHorizontal: ms(10) },
  codeTitle: { fontSize: ms(14), fontWeight: 'bold', color: COLORS.BLACK },
  codeValue: { fontSize: ms(10), color: COLORS.GRAY_DARK, marginTop: ms(2) },

  // Share Section
  shareContainer: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    borderRadius: ms(12),
  },
  shareTitle: {
    textAlign: 'center',
    fontSize: ms(20),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: ms(10),
  },
  shareIconContainer: { padding: ms(10), borderRadius: ms(50) },
  howItWorksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  howItWorksText: { marginLeft: 5, marginTop: 3 },

  // Modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: ms(20),
    borderTopRightRadius: ms(20),
    paddingHorizontal: ms(20),
    paddingVertical: ms(25),
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  dragHandle: {
    width: ms(50),
    height: ms(4),
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: ms(3),
    marginBottom: ms(15),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(20),
  },
  headerText: {
    fontSize: ms(16),
    fontWeight: '600',
    marginLeft: ms(6),
    color: COLORS.BLACK,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(15),
  },
  stepNumberContainer: {
    backgroundColor: COLORS.PRIMARY,
    width: ms(35),
    height: ms(35),
    borderRadius: ms(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ms(12),
  },
  stepNumber: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: ms(13),
  },
  stepText: { flex: 1, fontSize: ms(13), color: COLORS.BLACK },
  closeButton: {
    marginTop: ms(10),
    backgroundColor: COLORS.PRIMARY,
    borderRadius: ms(8),
    paddingVertical: ms(10),
    paddingHorizontal: ms(30),
  },
  closeButtonText: { color: COLORS.WHITE, fontWeight: '600', fontSize: ms(13) },
});
