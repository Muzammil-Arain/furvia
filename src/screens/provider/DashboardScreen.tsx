import React, { useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Switch,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ms } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import { Typography } from 'components/index';
import { COLORS } from 'utils/colors';
import { Icon } from '../../components/common/Icon';

const jobs = [
  {
    id: '1',
    service: 'Service Name',
    time: '10:00 AM',
    address: '1901 Thomdridge Cir. Shiloh',
    client: 'John Doe',
    remaining: '2h remaining',
    price: 120,
  },
  {
    id: '2',
    service: 'Service Name',
    time: '12:00 PM',
    address: '2021 Green Valley Rd. Springfield',
    client: 'Emma Watson',
    remaining: '3h remaining',
    price: 150,
  },
];

const DashboardScreen = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#56077E'} barStyle='light-content' />

      {/* Header */}
      <Animatable.View animation={fadeInDown} duration={800} style={styles.headerWrapper}>
        <LinearGradient
          colors={['#6a11cb', '#56077E']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View>
            <Typography style={styles.greeting}>Hi, Sarah!</Typography>
            <View
              style={{
                flex: 1,
                width: '98%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography style={styles.online}>● Online</Typography>
              <Animatable.View animation={pulse} iterationCount='infinite' duration={2000}>
                <View
                  style={{
                    marginTop: -20,
                  }}
                >
                  <Icon
                    componentName='Ionicons'
                    iconName='notifications-outline'
                    size={ms(24)}
                    color={'#00B3C3'}
                  />
                </View>
              </Animatable.View>
            </View>
          </View>
        </LinearGradient>
      </Animatable.View>

      {/* Availability Toggle */}
      <Animatable.View animation={fadeInUp} duration={800} delay={300} style={styles.toggleBox}>
        <View>
          <Typography style={styles.toggleText}>Available for Jobs</Typography>
          <Typography style={styles.toggleText1}>Toggle to receive job requests</Typography>
        </View>
        <Switch value={true} thumbColor={COLORS.WHITE} trackColor={{ true: '#00B3C3' }} />
      </Animatable.View>

      {/* Stats */}
      <Animatable.View animation={fadeInUp} duration={800} delay={500} style={styles.statsRow}>
        <Animatable.View animation='bounceIn' delay={600} style={styles.statCard}>
          <Image
            resizeMode='contain'
            source={require('../../assets/icons/dollor.png')}
            style={{
              width: ms(20),
              height: ms(25),
            }}
          />
          <Typography style={styles.statValue}>$120</Typography>
          <Typography style={styles.statLabel}>Today's Earning</Typography>
        </Animatable.View>

        <Animatable.View animation='bounceIn' delay={800} style={styles.statCard}>
          <Image
            resizeMode='contain'
            source={require('../../assets/icons/wallet.png')}
            style={{
              width: ms(20),
              height: ms(25),
            }}
          />
          <Typography style={styles.statValue}>3 Completed</Typography>
          <Typography style={styles.statLabel}>Jobs Today</Typography>
        </Animatable.View>
      </Animatable.View>

      {/* Schedule */}
      <View style={styles.scheduleHeader}>
        <View style={styles.scheduleLeft}>
          <View style={styles.scheduleBar} />
          <Typography style={styles.sectionTitle}>Today’s Schedule</Typography>
        </View>
        <TouchableOpacity style={styles.seeAllBtn} activeOpacity={0.7}>
          <Typography style={styles.seeAll}>See All</Typography>
          <Icon componentName='MaterialIcons' iconName='navigate-next' color='#00B3C3' />
        </TouchableOpacity>
      </View>

      {/* Job Cards */}
      <FlatList
        data={jobs}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <Animatable.View
            animation={fadeInUp}
            duration={800}
            delay={index * 200 + 600}
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <Typography style={styles.serviceName}>{item.service}</Typography>
              <Typography style={styles.badge}>Upcoming</Typography>
            </View>

            <View style={styles.row}>
              <View style={styles.row}>
                <Icon componentName='Feather' iconName='clock' color='#00B3C3' />
                <Typography style={[styles.time, styles.ml5]}>{item.time}</Typography>
              </View>
              <View style={[styles.row, styles.ml10]}>
                <Icon componentName='EvilIcons' iconName='location' color='#00B3C3' />
                <Typography style={styles.address}>{item.address}</Typography>
              </View>
            </View>

            <View style={styles.rowBetween}>
              <View style={styles.row}>
                <Typography style={styles.clientname}>{item.client}</Typography>
                <Typography style={styles.dot}>•</Typography>
                <Typography style={styles.client}>{item.remaining}</Typography>
              </View>
              <Typography style={styles.price}>${item.price.toFixed(2)}</Typography>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.7}>
                <Icon componentName='Feather' iconName='send' size={18} color='#00B3C3' />
                <Typography style={styles.outlineBtnText}>Navigate</Typography>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85}>
                <LinearGradient colors={['#00B3C3', '#0099a8']} style={styles.fillBtn}>
                  <Icon componentName='Ionicons' iconName='play-circle' size={18} color='#FFF' />
                  <Typography style={styles.fillBtnText}>Start Job</Typography>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  headerWrapper: { borderBottomLeftRadius: ms(20), borderBottomRightRadius: ms(20) },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: ms(20),
    borderBottomLeftRadius: ms(20),
    borderBottomRightRadius: ms(20),
  },
  greeting: { color: COLORS.WHITE, fontSize: ms(18), fontWeight: '600' },
  online: { color: '#a0e3a0', fontSize: ms(14), marginTop: 4 },
  toggleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    padding: ms(15),
    margin: ms(15),
    borderRadius: ms(12),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleText: { fontSize: ms(15), color: COLORS.BLACK },
  toggleText1: { color: '#353535', fontSize: ms(10) },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  statCard: {
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    padding: ms(15),
    borderRadius: ms(12),
    width: '40%',
    elevation: 3,
  },
  statValue: { fontSize: ms(16), fontWeight: '700', marginTop: 6 },
  statLabel: { fontSize: ms(11), color: '#666', marginTop: 2 },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: ms(15),
    marginTop: ms(25),
  },
  scheduleLeft: { flexDirection: 'row', alignItems: 'center' },
  scheduleBar: { backgroundColor: '#00B3C3', width: 2, marginRight: 5, height: 24 },
  sectionTitle: { fontSize: ms(16), fontWeight: 'bold', color: '#333' },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00B3C3',
    borderRadius: 100,
    width: ms(80),
    height: ms(30),
    justifyContent: 'center',
  },
  seeAll: { fontSize: ms(12), color: '#00B3C3', marginTop: 2 },
  listContent: { paddingVertical: 20, paddingHorizontal: 10 },
  card: {
    backgroundColor: COLORS.WHITE,
    marginHorizontal: ms(15),
    marginVertical: ms(8),
    padding: ms(15),
    borderRadius: ms(12),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  serviceName: { fontSize: ms(15), fontWeight: '600', color: '#333' },
  badge: {
    backgroundColor: '#ffe8d6',
    color: '#e07a5f',
    fontSize: ms(11),
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  ml5: { marginLeft: 5 },
  ml10: { marginLeft: 10 },
  time: { fontSize: ms(12), color: '#666', marginTop: 5 },
  address: { fontSize: ms(12), color: '#444', marginTop: 3 },
  client: { fontSize: ms(13), color: '#666' },
  clientname: { fontSize: ms(13), fontWeight: '500', color: COLORS.BLACK },
  dot: { marginHorizontal: 5, color: '#00B3C3' },
  price: { fontSize: ms(15), fontWeight: '700', marginTop: 6, color: '#333' },
  cardActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, flex: 1 },
  outlineBtn: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00B3C3',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 5,
  },
  outlineBtnText: { color: '#00B3C3', marginLeft: 6, fontSize: ms(13) },
  fillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    width: '75%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  fillBtnText: { color: COLORS.WHITE, fontSize: ms(13), fontWeight: '600', marginLeft: 6 },
});

export default DashboardScreen;
