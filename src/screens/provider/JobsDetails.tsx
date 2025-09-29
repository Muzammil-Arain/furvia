import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import Animated, { FadeInDown, FadeInRight, FadeInUp } from 'react-native-reanimated';
import { ms } from 'react-native-size-matters';
import { Button, Icon, Typography } from 'components/index';
import { COLORS } from 'utils/colors';

const JobDetailsScreen = ({ navigation }: any) => {
  const job = {
    title: 'Deep Cleaning',
    date: 'Thursday, August 28 2025',
    price: '$120',
    duration: '3 hours',
    customer: {
      name: 'John Doe',
      phone: '+1234 567 8900',
      address: '1901 Thornridge Cir. Shiloh',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    distance: '2.4 miles',
    time: '8 min drive',
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: ms(30) }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Icon iconName='arrow-back' componentName='Ionicons' size={22} color={COLORS.WHITE} />
        </TouchableOpacity>
        <Typography style={styles.headerText}>Job Details</Typography>
        <View style={{ width: ms(50) }} />
      </View>

      {/* Job Card */}
      <Animated.View entering={FadeInDown.duration(600)} style={styles.card}>
        <Typography style={styles.jobTitle}>{job.title}</Typography>
        <View style={styles.dateRow}>
          <Icon
            componentName='FontAwesome'
            iconName='calendar'
            size={ms(13)}
            color={COLORS.DARK_PURPLE}
          />
          <Typography style={styles.dateText}>{job.date}</Typography>
        </View>

        <View style={styles.rowBetween}>
          <View style={styles.infoBox}>
            <Image
              resizeMode='contain'
              source={require('../../assets/icons/dollor.png')}
              style={styles.iconImage}
            />
            <Typography style={styles.infoText}>{job.price}</Typography>
            <Typography style={styles.infoSub}>Starting Price</Typography>
          </View>
          <View style={styles.infoBox}>
            <Icon
              iconName='time-outline'
              componentName='Ionicons'
              size={ms(27)}
              color={COLORS.PRIMARY}
            />
            <Typography style={styles.infoText}>{job.duration}</Typography>
            <Typography style={styles.infoSub}>Duration</Typography>
          </View>
        </View>
      </Animated.View>

      {/* Customer Information */}
      <Animated.View entering={FadeInRight.delay(200)} style={styles.card}>
        <View style={styles.sectionHeader}>
          <View style={styles.scheduleBar} />
          <Typography style={styles.sectionTitle}>Customer Information</Typography>
        </View>
        <View style={styles.customerCard}>
          <View style={styles.customerRow}>
            <Icon
              iconName='person-circle-outline'
              componentName='Ionicons'
              size={40}
              color={COLORS.DARK_PURPLE}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Typography style={styles.customerName}>{job.customer.name}</Typography>
              <Typography style={styles.customerPhone}>{job.customer.phone}</Typography>
            </View>
          </View>
          <View style={styles.addressRow}>
            <Icon componentName='EvilIcons' iconName='location' size={ms(16)} color={COLORS.GRAY} />
            <Typography style={styles.address}>{job.customer.address}</Typography>
          </View>
          <View style={styles.actionRow}>
            <TouchableOpacity activeOpacity={0.7} style={styles.actionBtn}>
              <Icon
                componentName='Ionicons'
                iconName='call'
                size={ms(16)}
                color={COLORS.DARK_PURPLE}
              />
              <Typography style={styles.actionText}>Call</Typography>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.actionBtn}>
              <Icon
                componentName='Ionicons'
                iconName='chatbubble-ellipses'
                size={ms(16)}
                color={COLORS.DARK_PURPLE}
              />
              <Typography style={styles.actionText}>Chat</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      {/* Navigation */}
      <Animated.View entering={FadeInRight.delay(400)} style={styles.card}>
        <View style={styles.sectionHeader}>
          <View style={styles.scheduleBar} />
          <Typography style={styles.sectionTitle}>Navigation</Typography>
        </View>
        <View style={styles.navigationRow}>
          <Typography style={styles.subText}>
            {job.distance} • {job.time}
          </Typography>
          <TouchableOpacity activeOpacity={0.7}>
            <View style={styles.navigateBtn}>
              <Icon componentName='Feather' iconName='send' color={COLORS.WHITE} />
              <Typography style={styles.navigateText}>Navigate</Typography>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Start Job */}
      <Animated.View entering={FadeInUp.delay(600)} style={[styles.card, styles.startCard]}>
        <View style={styles.sectionHeader}>
          <View style={styles.scheduleBar} />
          <Typography style={styles.sectionTitle}>Ready To Start?</Typography>
        </View>
        <Typography style={styles.subText}>
          Tap "Start Job" when you arrive at the customer’s location
        </Typography>
        <TouchableOpacity activeOpacity={0.85} style={styles.startactionBtn}>
          <Icon
            componentName='Ionicons'
            iconName='play-circle-sharp'
            size={ms(16)}
            color={COLORS.WHITE}
          />
          <Typography style={styles.startText}>Start Job</Typography>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE_OPACITY,
    padding: ms(15),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ms(15),
  },
  backBtn: {
    backgroundColor: COLORS.DARK_PURPLE,
    borderRadius: 10,
    padding: ms(6),
  },
  headerText: {
    fontSize: ms(18),
    textAlign: 'center',
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: ms(15),
    marginBottom: ms(15),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  jobTitle: {
    fontSize: ms(16),
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.BLACK,
    marginBottom: ms(5),
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: ms(10),
  },
  dateText: {
    fontSize: ms(13),
    color: COLORS.GRAY,
    marginLeft: ms(5),
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(10),
  },
  infoBox: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: ms(5),
    padding: ms(10),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  iconImage: {
    tintColor: COLORS.DARK_PURPLE,
    width: ms(20),
    height: ms(25),
  },
  infoText: {
    fontSize: ms(16),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginTop: ms(5),
  },
  infoSub: {
    fontSize: ms(12),
    color: COLORS.GRAY,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(10),
  },
  scheduleBar: {
    backgroundColor: COLORS.DARK_PURPLE,
    width: 2,
    marginRight: ms(7),
    height: ms(24),
  },
  sectionTitle: {
    fontSize: ms(16),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  customerCard: {
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    padding: ms(14),
    borderRadius: 16,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(12),
  },
  customerName: {
    fontSize: ms(15),
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  customerPhone: {
    fontSize: ms(13),
    color: COLORS.BLACK,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(10),
  },
  address: {
    color: COLORS.GRAY,
    marginLeft: ms(4),
    fontSize: ms(13),
    flexShrink: 1,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: ms(5),
  },
  actionBtn: {
    width: ms(125),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(8),
    borderWidth: 1,
    borderColor: COLORS.DARK_PURPLE,
    paddingVertical: ms(8),
    paddingHorizontal: ms(15),
  },
  actionText: {
    color: COLORS.DARK_PURPLE,
    marginLeft: ms(6),
    fontSize: ms(13),
    fontWeight: '500',
  },
  navigationRow: {},
  navigateBtn: {
    position: 'absolute',
    right: 10,
    top: ms(-50),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(16),
    paddingVertical: ms(10),
    borderRadius: 100,
    backgroundColor: COLORS.DARK_PURPLE,
  },
  navigateText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(13),
    marginLeft: ms(6),
  },
  startCard: {
    backgroundColor: '#E9FDFF',
    borderWidth: 1,
    borderColor: COLORS.DARK_PURPLE,
  },
  subText: {
    fontSize: ms(12),
    color: COLORS.BLACK,
    marginBottom: 10,
  },
  startactionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: ms(8),
    justifyContent: 'center',
    backgroundColor: COLORS.DARK_PURPLE,
    paddingVertical: ms(12),
    marginTop: ms(10),
  },
  startText: {
    color: COLORS.WHITE,
    marginLeft: ms(6),
    fontSize: ms(14),
    fontWeight: '600',
  },
});

export default JobDetailsScreen;
