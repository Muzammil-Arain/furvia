import React from 'react';
import { View, StyleSheet, Image, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography, Button } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';

const Wallet = () => {
  const activities = [
    {
      id: '1',
      name: 'Jack joined using your referral code',
      image: 'https://st3.depositphotos.com/3159197/34025/i/450/depositphotos_340253554-stock-photo-portrait-of-young-latin-woman.jpg',
      points: '5pts',
    },
    {
      id: '2',
      name: 'Emma joined using your referral code',
      points: '5pts',
      image: 'https://st.focusedcollection.com/9163412/i/650/focused_163740900-stock-photo-woman-with-tongue-out.jpg',
    },
  ];

  return (
    <AppWrapper title='Loyalty & Referral Points'>
      <View style={styles.container}>
        {/* Loyalty Card */}
        <Animated.View entering={FadeInUp.duration(700).springify()} style={styles.cardContainer}>
          <ImageBackground
            resizeMode='cover'
            source={require('../../assets/images/common/wallet_card1.png')}
            style={styles.cardImage}
            imageStyle={styles.imageStyle}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Typography style={styles.cardTitle}>Loyalty Card</Typography>
                <Typography style={styles.cardSubTitle}>Free Account</Typography>
              </View>

              <Typography style={styles.cardPoints}>850 pts</Typography>

              <View style={styles.cardFooter}>
                <View>
                  <Typography style={styles.footerLabel}>Loyalty Member</Typography>
                  <Typography style={styles.footerValue}>Williom Andrson</Typography>
                </View>
                <View>
                  <Typography style={[styles.footerLabel, styles.textRight]}>Amount</Typography>
                  <Typography style={styles.footerValue}>$840.000</Typography>
                </View>
              </View>
            </View>
          </ImageBackground>
        </Animated.View>

        {/* Points Row */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.pointsRow}>
          {[
            { label: 'Visit Points', value: '850 Pts', sub: '($850.00)' },
            { label: 'Referral Points', value: '100 Pts', sub: '($100.00)' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.pointsCard}>
              <Typography style={styles.pointsLabel}>{item.label}</Typography>
              <Typography style={styles.pointsValue}>{item.value}</Typography>
              <Typography style={styles.pointsSub}>{item.sub}</Typography>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Redeem Button */}
        <Animated.View entering={FadeIn.delay(400).duration(700)}>
          <Button title='Redeem Points' style={styles.redeemButton} />
        </Animated.View>

        {/* Activity Section */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(700)}
          style={styles.activitySection}
        >
          <Typography style={styles.activityTitle}>All Activity</Typography>

          <FlatList
            data={activities}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.activityList}
            renderItem={({ item }) => (
              <Animated.View entering={FadeInUp.duration(600)} style={styles.activityCard}>
                {item.image && <Image source={{uri:item.image}} style={styles.userImage} />}
                <View style={styles.activityTextContainer}>
                  <Typography style={styles.activityPoints}>Earned {item.points}</Typography>
                  <Typography style={styles.activityDescription}>{item.name}</Typography>
                </View>
              </Animated.View>
            )}
          />
        </Animated.View>
      </View>
    </AppWrapper>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(20),
    paddingBottom: ms(20),
  },

  // Loyalty Card
  cardContainer: {
    alignItems: 'center',
    marginTop: ms(10),
  },
  cardImage: {
    width: '100%',
    height: ms(250),
  },
  imageStyle: {
    borderRadius: ms(16),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: ms(16),
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: ms(30),
    paddingHorizontal: ms(30),
  },
  cardHeader: {
    marginTop: ms(15),
  },
  cardTitle: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
    fontSize: ms(17),
  },
  cardSubTitle: {
    color: COLORS.WHITE,
    fontSize: ms(10),
  },
  cardPoints: {
    color: COLORS.WHITE,
    fontSize: ms(22),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: ms(15),
  },
  footerLabel: {
    color: COLORS.WHITE,
    fontSize: ms(10),
  },
  footerValue: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
    fontSize: ms(17),
  },
  textRight: {
    textAlign: 'right',
  },

  // Points Row
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(20),
  },
  pointsCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(12),
    padding: ms(12),
    height: ms(100),
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  pointsLabel: {
    fontSize: ms(12),
    color: COLORS.BLACK,
  },
  pointsValue: {
    fontSize: ms(18),
    fontWeight: '700',
    color: COLORS.PRIMARY,
  },
  pointsSub: {
    fontSize: ms(11),
    marginTop: ms(4),
    color: COLORS.BLACK,
  },
  redeemButton: {
    marginTop: ms(30),
  },

  // Activity Section
  activitySection: {
    marginTop: ms(30),
  },
  activityTitle: {
    fontSize: ms(16),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: ms(10),
  },
  activityList: {
    paddingBottom: ms(30),
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(12),
    padding: ms(10),
    marginBottom: ms(12),
    elevation: 2,
    marginHorizontal: ms(2),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  userImage: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    marginRight: ms(10),
  },
  activityTextContainer: {
    flex: 1,
  },
  activityPoints: {
    fontWeight: '600',
    color: COLORS.PRIMARY,
  },
  activityDescription: {
    color: COLORS.BLACK,
    fontSize: ms(12),
  },
});
