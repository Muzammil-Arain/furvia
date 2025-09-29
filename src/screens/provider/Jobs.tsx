import React, { useMemo, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ms } from 'react-native-size-matters';
import { Icon, Typography } from 'components/index';
import { COLORS } from 'utils/colors';

const MyJobsScreen = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  console.log('🚀 ~ MyJobsScreen ~ selectedTab:', selectedTab);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const jobs = useMemo(
    () => [
      {
        id: '1',
        title: 'Deep Cleaning',
        date: 'Thursday, August 28 2025',
        status: 'upcoming',
        user: {
          name: 'John Doe',
          phone: '+1234 567 8900',
          image: { uri: 'https://www.bup.edu.bd/public/upload/user-dummy.jpeg' },
          address: '1901 Thornridge Cir. Shiloh',
        },
        price: 120,
        hours: '3 hours',
      },
      {
        id: '2',
        title: 'Carpet Cleaning',
        date: 'Monday, September 2 2025',
        status: 'completed',
        user: {
          name: 'Jane Smith',
          phone: '+1234 567 4567',
          image: { uri: 'https://www.bup.edu.bd/public/upload/user-dummy.jpeg' },
          address: '2015 Springfield Ave. NY',
        },
        price: 90,
        hours: '2 hours',
      },
    ],
    [],
  );

  // ✅ Filter jobs by selected tab
  const filteredJobs = useMemo(
    () => jobs.filter(job => job.status === selectedTab),
    [jobs, selectedTab],
  );

  // ✅ Fade animation on tab switch
  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [selectedTab]);

  const renderJobCard = ({ item, index }: any) => {
    const slideAnim = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [20 * (index + 1), 0],
    });

    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <LinearGradient
          colors={['#ffffff', '#f8f9ff']}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Typography style={styles.jobTitle}>{item.title}</Typography>

          <View style={styles.row}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Icon
                componentName='FontAwesome'
                iconName='calendar'
                size={ms(14)}
                color={COLORS.DARK_PURPLE}
              />
              <Typography style={styles.date}>{item.date}</Typography>
            </View>
          </View>
          <Typography style={styles.badge}>Upcoming</Typography>

          <View style={styles.userRow}>
            <Image source={item.user.image} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Typography style={styles.userName}>{item.user.name}</Typography>
              <Typography style={styles.userPhone}>{item.user.phone}</Typography>
            </View>
            <View>
              <Typography style={styles.price}>${item.price}</Typography>
              <View style={styles.row}>
                <Icon componentName='EvilIcons' iconName='clock' color={COLORS.BLACK} />
                <Typography style={styles.hours}>{item.hours}</Typography>
              </View>
            </View>
          </View>

          <View style={styles.addressRow}>
            <Icon componentName='EvilIcons' iconName='location' size={ms(16)} color={COLORS.GRAY} />
            <Typography style={styles.address}>{item.user.address}</Typography>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionBtn}>
              <Icon
                componentName='Ionicons'
                iconName='call'
                size={ms(16)}
                color={COLORS.DARK_PURPLE}
              />
              <Typography style={styles.actionText}>Call</Typography>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
              <Icon
                componentName='Ionicons'
                iconName='chatbubble-ellipses'
                size={ms(16)}
                color={COLORS.DARK_PURPLE}
              />
              <Typography style={styles.actionText}>Chat</Typography>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.navigateBtn}>
                <Icon componentName='Feather' iconName='send' color={COLORS.WHITE} />
                <Typography style={styles.navigateText}>Navigate</Typography>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* ✅ Header */}
      <Typography style={styles.header}>My Jobs</Typography>

      {/* ✅ Tabs */}
      <View style={styles.tabRow}>
        {['upcoming', 'completed'].map(tab => {
          const isActive = selectedTab == tab;
          console.log('🚀 ~ isActive:', isActive);
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.tabBg,
                  { backgroundColor: isActive ? COLORS.DARK_PURPLE : COLORS.LIGHT_GREY },
                ]}
              >
                <Typography
                  style={[styles.tabText, { color: isActive ? COLORS.WHITE : COLORS.BLACK }]}
                >
                  {tab === 'upcoming' ? 'Upcoming' : 'Completed'} (
                  {jobs.filter(j => j.status === tab).length})
                </Typography>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ✅ Jobs List */}
      <FlatList
        data={filteredJobs}
        keyExtractor={item => item.id}
        renderItem={renderJobCard}
        ListEmptyComponent={
          <Typography style={styles.noJobs}>No jobs found in {selectedTab}</Typography>
        }
        contentContainerStyle={{ paddingVertical: ms(20) }}
      />
    </View>
  );
};

export default MyJobsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: ms(16),
  },
  badge: {
    backgroundColor: '#ffe8d6',
    color: '#e07a5f',
    fontSize: ms(11),
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'absolute',
    right: ms(10),
    top: ms(20),
  },
  header: {
    textAlign: 'center',
    marginVertical: ms(12),
    fontSize: ms(22),
    fontWeight: '700',
    color: COLORS.BLACK,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: ms(16),
  },
  tab: {
    flex: 1,
    marginHorizontal: ms(5),
    borderRadius: ms(10),
    overflow: 'hidden',
    height: ms(45),
  },
  activeTab: {
    // borderWidth: ms(2),
  },
  tabBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(10),
  },
  tabText: {
    fontSize: ms(14),
    fontWeight: '600',
  },
  card: {
    margin: 5,
    padding: ms(14),
    borderRadius: ms(14),
    marginBottom: ms(14),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  jobTitle: {
    color: COLORS.BLACK,
    fontSize: ms(17),
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    color: '#666666',
    fontSize: ms(13),
    marginLeft: 5,
    marginTop: 3,
  },
  userRow: {
    flexDirection: 'row',
    marginTop: ms(8),
    alignItems: 'flex-start',
  },
  avatar: {
    width: ms(46),
    height: ms(46),
    borderRadius: ms(23),
    marginRight: ms(12),
  },
  userName: {
    color: COLORS.BLACK,
    fontSize: ms(15),
    fontWeight: '500',
  },
  userPhone: {
    color: '#666666',
    fontSize: ms(13),
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: ms(4),
  },
  address: {
    color: '#666666',
    marginLeft: ms(4),
    fontSize: ms(13),
  },
  price: {
    textAlign: 'center',
    color: COLORS.BLACK,
    fontSize: ms(15),
    fontWeight: 'bold',
  },
  hours: {
    color: COLORS.BLACK,
    fontSize: ms(12),
    marginTop: 3,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(14),
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: ms(8),
    width: ms(90),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.DARK_PURPLE,
    paddingVertical: ms(6),
  },
  actionText: {
    color: COLORS.DARK_PURPLE,
    marginLeft: ms(6),
    fontSize: ms(13),
    fontWeight: '500',
  },
  navigateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(16),
    paddingVertical: ms(10),
    borderRadius: ms(8),
    backgroundColor: COLORS.DARK_PURPLE,
  },
  navigateText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(13),
    marginLeft: ms(6),
  },
  noJobs: {
    textAlign: 'center',
    color: '#666666',
    marginTop: ms(40),
    fontSize: ms(14),
  },
});
