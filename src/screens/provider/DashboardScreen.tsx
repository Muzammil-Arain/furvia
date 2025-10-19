import React, { useMemo, useState } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Switch,
  StatusBar,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ms } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import { Typography } from 'components/index';
import { COLORS } from 'utils/colors';
import { Icon } from '../../components/common/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';

const APPOINTMENTS = [
  {
    id: '1',
    title: 'Veterinary Checkup',
    type: 'House Visit',
    timeLabel: 'Today, Sep 9 at 2:00 PM',
    address: '123 Oak Street, Springfield, IL 62701',
    petName: 'Buddy',
    petBreed: 'Golden Retriever',
    petAge: '3 years',
    status: 'Upcoming',
  },
  {
    id: '2',
    title: 'Grooming Session',
    type: 'On Site',
    timeLabel: 'Today, Sep 9 at 4:00 PM',
    address: '55 Pine Blvd, Springfield, IL 62702',
    petName: 'Lucy',
    petBreed: 'Beagle',
    petAge: '2 years',
    status: 'Upcoming',
  },
];

const DashboardScreen = () => {
  const [isOnline, setIsOnline] = useState(false);

  // animations (memoized for perf)
  const fadeInDown = useMemo(
    () => ({
      0: { opacity: 0, translateY: -30 },
      1: { opacity: 1, translateY: 0 },
    }),
    [],
  );

  const fadeInUp = useMemo(
    () => ({
      0: { opacity: 0, translateY: 30 },
      1: { opacity: 1, translateY: 0 },
    }),
    [],
  );

  const pulse = useMemo(
    () => ({
      0: { scale: 0.95 },
      0.5: { scale: 1.05 },
      1: { scale: 1 },
    }),
    [],
  );

  // Hardcoded stats (you can calculate from appointments)
  const earnings = 120;
  const completed = 3;

  const renderAppointment = ({ item, index }) => (
    <Animatable.View
      animation={fadeInUp}
      duration={600}
      delay={index * 120 + 200}
      style={styles.appCard}
    >
      <View style={styles.cardHeader}>
        <Typography style={styles.appTitle}>{item.title}</Typography>
        <View style={styles.statusPill}>
          <Typography style={styles.statusText}>{item.status}</Typography>
        </View>
      </View>

      <View style={styles.tagsRow}>
        <View style={styles.tag}>
          <Icon componentName='Feather' iconName='home' size={14} color='#2b9aa0' />
          <Typography style={styles.tagText}>{item.type}</Typography>
        </View>

        <View style={[styles.tag, { marginLeft: 8 }]}>
          <Icon componentName='Feather' iconName='calendar' size={14} color='#9b7bd5' />
          <Typography style={styles.tagText}>{item.timeLabel}</Typography>
        </View>
      </View>

      <View style={[styles.row, { marginTop: 8 }]}>
        <Icon componentName='EvilIcons' iconName='location' size={20} color='#6fcf97' />
        <Typography style={styles.addressText}>{item.address}</Typography>
      </View>

      <View style={styles.petRow}>
        <Image
          source={{
            uri: 'https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525',
          }}
          // source={require('../../assets/pet_placeholder.png')} // replace with real thumbnail path
          style={styles.petThumb}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Typography style={styles.petName}>
            {item.petName} <Typography style={styles.petType}>(Dog)</Typography>
          </Typography>
          <Typography style={styles.petMeta}>
            {item.petBreed} • {item.petAge}
          </Typography>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigate(SCREENS.AppointmentDetailsScreen)}
        style={styles.viewBtn}
        activeOpacity={0.85}
      >
        <Typography style={styles.viewBtnText}>View Details</Typography>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#56077E'} barStyle='light-content' />

      {/* Header */}
      <Animatable.View animation={fadeInDown} duration={700} style={styles.headerWrapper}>
        <LinearGradient
          colors={[COLORS.HEADER_BACKGROUND, COLORS.HEADER_BACKGROUND]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity activeOpacity={0.8}>
              {/* <Icon componentName='Feather' iconName='menu' size={24} color={COLORS.WHITE} /> */}
              <Typography style={styles.toggleText}>Hi, Dr. Hughie Watson</Typography>
            </TouchableOpacity>

            <View style={styles.headerRight}>
              <TouchableOpacity
              onPress={() => navigate(SCREENS.ChatListScreen)}
                style={[
                  styles.notifyIcon,
                  {
                    backgroundColor: COLORS.PRIMARY,
                  },
                ]}
                activeOpacity={0.8}
              >
                <Animatable.View animation={pulse} iterationCount='infinite' duration={2200}>
                  <Icon
                    componentName='Ionicons'
                    iconName='chatbubble-ellipses-outline'
                    size={22}
                    color={COLORS.WHITE}
                  />
                </Animatable.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigate(SCREENS.NotificationScreen)} style={styles.notifyIcon} activeOpacity={0.8}>
                <Icon
                  componentName='Ionicons'
                  iconName='notifications-outline'
                  size={22}
                  color={COLORS.SECONDARY}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Availability Toggle card overlapping header */}
          <Animatable.View animation={fadeInUp} duration={700} delay={150} style={styles.toggleBox}>
            <View style={{ flex: 1 }}>
              <Typography style={styles.toggleText}>Available for Jobs</Typography>
              <Typography style={styles.toggleText1}>Toggle to receive job requests</Typography>
            </View>

            <Switch
              value={isOnline}
              onValueChange={val => setIsOnline(val)}
              thumbColor={COLORS.WHITE}
              trackColor={{ true: '#2bb8b9', false: '#ccc' }}
            />
          </Animatable.View>
        </LinearGradient>
      </Animatable.View>

      {/* Body */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {!isOnline ? (
          // Empty state (toggle OFF)
          <Animatable.View
            animation={fadeInUp}
            duration={600}
            delay={200}
            style={styles.emptyContainer}
          >
            <Image
              // Replace with your provided image path if desired:
              // source={{ uri: 'file:///mnt/data/ce2351dd-943c-4d33-a95c-7a305566c9d5.png' }}
              source={require('../../assets/images/common/empty_illustration.png')}
              resizeMode='contain'
              style={styles.emptyImage}
            />
            <Typography style={styles.emptyText}>
              All available job requests will be shown here after you toggle online your
              availability
            </Typography>
          </Animatable.View>
        ) : (
          // Dashboard (toggle ON)
          <View style={{ paddingHorizontal: ms(20), marginTop: 8 }}>
            <Animatable.View animation={fadeInUp} duration={600} delay={80} style={styles.statsRow}>
              <Animatable.View animation='bounceIn' delay={120} style={styles.statCard}>
                <Image
                  resizeMode='contain'
                  source={require('../../assets/icons/dollor.png')}
                  style={styles.statIcon}
                />
                <Typography style={styles.statValue}>${earnings}</Typography>
                <Typography style={styles.statLabel}>Today's Earning</Typography>
              </Animatable.View>

              <Animatable.View animation='bounceIn' delay={240} style={styles.statCard}>
                <Image
                  resizeMode='contain'
                  source={require('../../assets/icons/wallet.png')}
                  style={styles.statIcon}
                />
                <Typography style={styles.statValue}>{completed} Completed</Typography>
                <Typography style={styles.statLabel}>Jobs Today</Typography>
              </Animatable.View>
            </Animatable.View>

            <View style={styles.sectionHeader}>
              <Typography style={styles.sectionTitle}>Today's Appointments</Typography>
              <TouchableOpacity
                onPress={() => navigate(SCREENS.AllAppointmentsScreen)}
                activeOpacity={0.8}
              >
                <Typography style={styles.viewAll}>View All</Typography>
              </TouchableOpacity>
            </View>

            <FlatList
              data={APPOINTMENTS}
              keyExtractor={i => i.id}
              renderItem={renderAppointment}
              contentContainerStyle={{ paddingBottom: 40 }}
              scrollEnabled={false} // nested in ScrollView; if you prefer independent scroll, remove ScrollView and set this true
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f4f7' },
  headerWrapper: {
    borderBottomLeftRadius: ms(20),
    borderBottomRightRadius: ms(20),
  },
  header: {
    padding: ms(18),
    height: ms(180),
    borderBottomLeftRadius: ms(20),
    borderBottomRightRadius: ms(20),
  },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  notifyIcon: {
    marginLeft: ms(12),
    backgroundColor: COLORS.WHITE,
    padding: ms(8),
    borderRadius: ms(8),
  },

  toggleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY,
    height: ms(80),
    paddingHorizontal: ms(20),
    borderRadius: ms(12),
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    marginTop: ms(20),
  },
  toggleText: { fontSize: ms(15), color: COLORS.WHITE, fontWeight: '600' },
  toggleText1: { color: COLORS.WHITE, fontSize: ms(12), marginTop: 1 },

  emptyContainer: {
    alignItems: 'center',
    marginTop: ms(40),
    paddingHorizontal: ms(20),
  },
  emptyImage: { width: ms(260), height: ms(220), marginBottom: ms(22), marginTop: ms(100) },
  emptyText: { textAlign: 'center', color: '#333', fontSize: ms(14), lineHeight: ms(20) },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: ms(18) },
  statCard: {
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    padding: ms(14),
    borderRadius: ms(12),
    width: '48%',
    elevation: 3,
  },
  statIcon: { width: ms(22), height: ms(26), tintColor: COLORS.SECONDARY },
  statValue: { fontSize: ms(16), fontWeight: '700', marginTop: 8, color: '#2b2b2b' },
  statLabel: { fontSize: ms(11), color: '#7a7a7a', marginTop: 4 },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: ms(18),
    marginBottom: ms(8),
  },
  sectionTitle: { fontSize: ms(16), fontWeight: '700', color: '#2b9aa0' },
  viewAll: { color: '#9b7bd5', fontSize: ms(13) },

  appCard: {
    backgroundColor: COLORS.WHITE,
    marginVertical: ms(10),
    padding: ms(14),
    borderRadius: ms(12),
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 3,
    margin: 5,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  appTitle: { fontSize: ms(15), fontWeight: '700', color: '#221f3b' },

  statusPill: {
    backgroundColor: '#f7e6d9',
    paddingHorizontal: ms(10),
    paddingVertical: ms(6),
    borderRadius: 8,
  },
  statusText: { color: '#b36b1f', fontSize: ms(12), fontWeight: '600' },

  tagsRow: { flexDirection: 'row', marginTop: ms(10) },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef9f9',
    paddingHorizontal: ms(8),
    paddingVertical: ms(6),
    borderRadius: ms(8),
  },
  tagText: { fontSize: ms(11), marginLeft: 6, color: '#2b9aa0' },

  row: { flexDirection: 'row', alignItems: 'center' },
  addressText: { color: '#6aa67b', marginLeft: 8, fontSize: ms(11), flex: 1 },

  petRow: { flexDirection: 'row', alignItems: 'center', marginTop: ms(12) },
  petThumb: { width: ms(48), height: ms(48), borderRadius: ms(8), backgroundColor: '#eee' },
  petName: { fontSize: ms(13), fontWeight: '700', color: '#221f3b' },
  petType: { fontSize: ms(12), fontWeight: '500', color: '#666' },
  petMeta: { fontSize: ms(11), color: '#8a8a8a', marginTop: 2 },

  viewBtn: {
    marginTop: ms(12),
    borderWidth: 1.5,
    borderColor: COLORS.SECONDARY,
    paddingVertical: ms(10),
    borderRadius: ms(8),
    alignItems: 'center',
  },
  viewBtnText: { color: COLORS.SECONDARY, fontWeight: '500', fontSize: ms(13) },
});

export default DashboardScreen;
