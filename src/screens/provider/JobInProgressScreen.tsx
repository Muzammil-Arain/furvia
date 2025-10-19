import React, { useState, useEffect, useMemo } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import { Typography } from 'components/index';
import { navigate } from 'navigation';
import { SCREENS } from 'constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const JobInProgressScreen = () => {
  const [time, setTime] = useState(7200); // 2 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => setTime(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = useMemo(() => {
    const h = String(Math.floor(time / 3600)).padStart(2, '0');
    const m = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const s = String(time % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }, [time]);

  return (
    <AppWrapper title='Job In Progress'>
      <Animated.View entering={FadeInUp.duration(400)} style={styles.container}>
        {/* Job Info Card */}
        <Animated.View
          entering={FadeInUp.delay(100).duration(500)}
          style={[
            styles.card,
            {
              borderWidth: 0.5,
              borderColor: COLORS.LIGHT_PERPLE,
            },
          ]}
        >
          <View style={styles.rowBetween}>
            <Typography style={styles.cardTitle}>Job in Progress</Typography>
            <View style={styles.timerContainer}>
              <Icon name='clock' size={ms(14)} color={COLORS.PRIMARY} />
              <Typography style={styles.timerText}>{formatTime}</Typography>
            </View>
          </View>
          <Typography style={styles.subText}>
            Keep your customer updated and complete when finished.
          </Typography>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigate(SCREENS.JobCompletedScreen)}
          >
            <LinearGradient
              colors={[COLORS.HEADER_BACKGROUND, COLORS.HEADER_BACKGROUND]}
              style={styles.button}
            >
              <Typography style={styles.buttonText}>Complete</Typography>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Service Details */}
        <Animated.View
          entering={FadeInUp.delay(200).duration(500)}
          style={[
            styles.card,
            {
              backgroundColor: COLORS.WHITE,
            },
          ]}
        >
          <Typography style={[styles.cardTitle, styles.sectionHeader]}>Service Details</Typography>

          {[
            { label: 'Service Type', value: 'Veterinary Checkup' },
            { label: 'Visit Type', value: 'In-Home' },
            { label: 'Date', value: 'Today, Sep 29' },
            { label: 'Time', value: '2:00 PM' },
          ].map((item, index) => (
            <View key={index} style={styles.row}>
              <Typography style={styles.label}>{item.label}</Typography>
              <Typography style={styles.value}>{item.value}</Typography>
            </View>
          ))}
        </Animated.View>

        {/* Pet Information */}
        <Animated.View
          entering={FadeInUp.delay(300).duration(500)}
          style={[
            styles.card,
            {
              backgroundColor: COLORS.WHITE,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <Icon name='paw' size={ms(20)} color={COLORS.SECONDARY} />
            <Typography style={[styles.cardTitle, { marginLeft: ms(8) }]}>
              Pet Information
            </Typography>
          </View>

          <View style={styles.row}>
            <Image
              source={{
                uri: 'https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525',
              }}
              style={styles.petImage}
            />
            <View style={styles.petInfoContainer}>
              <Typography style={styles.petName}>
                Buddy <Typography style={styles.petType}>(Dog)</Typography>
              </Typography>
              <Typography style={styles.petInfo}>
                Breed: <Typography style={styles.bold}>Golden Retriever</Typography>
              </Typography>
              <Typography style={styles.petInfo}>
                Age: <Typography style={styles.bold}>3 years</Typography>
              </Typography>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </AppWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ms(16),
  },
  card: {
    backgroundColor: '#fef8fe',
    borderRadius: ms(16),
    padding: ms(16),
    marginBottom: ms(16),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: ms(16),
    fontWeight: 'bold',
    color: COLORS.TEXT,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3e9ff',
    paddingHorizontal: ms(8),
    paddingVertical: ms(4),
    borderRadius: ms(8),
  },
  timerText: {
    color: COLORS.PRIMARY,
    fontSize: ms(12),
    marginLeft: ms(4),
  },
  subText: {
    color: COLORS.GRAY,
    marginVertical: ms(10),
    fontSize: ms(13),
  },
  button: {
    borderRadius: ms(10),
    alignItems: 'center',
    paddingVertical: ms(12),
    marginTop: ms(8),
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: ms(14),
  },
  sectionHeader: {
    marginBottom: ms(10),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: ms(6),
  },
  label: {
    color: COLORS.GRAY,
    fontSize: ms(12),
  },
  value: {
    color: COLORS.TEXT,
    fontWeight: '500',
    fontSize: ms(13),
  },
  bold: {
    fontWeight: 'bold',
    color: COLORS.TEXT,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(15),
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: ms(16),
    color: COLORS.BLACK,
    marginLeft: 4,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  petImage: {
    width: ms(60),
    height: ms(60),
    borderRadius: ms(10),
    marginRight: 10,
  },
  petName: {
    fontSize: ms(15),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  petType: {
    fontWeight: 'normal',
    color: COLORS.GRAY,
    fontSize: 12,
  },
  petInfo: {
    fontSize: ms(13),
    color: COLORS.TEXT,
  },
});

export default JobInProgressScreen;
