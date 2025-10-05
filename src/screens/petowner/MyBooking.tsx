import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const ongoingOrders = [
    {
      id: 1,
      title: 'Grooming',
      price: '$120 USD',
      date: '28 May 2024',
      time: '14:20',
      image:
        'https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?fm=jpg&q=60&w=3000',
    },
    {
      id: 2,
      title: 'Bath',
      price: '$90 USD',
      date: '24 May 2024',
      time: '14:20',
      image:
        'https://hips.hearstapps.com/hmg-prod/images/best-guard-dogs-1650302456.jpeg?crop=0.75xw:1.00xh;0.06xw,0&resize=1200:*',
    },
  ];

  const orderHistory = [
    {
      id: 1,
      title: 'Vet Checkup',
      price: '$150 USD',
      date: '10 Apr 2024',
      time: '12:45',
      status: 'Completed',
      image:
        'https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&w=1080',
    },
    {
      id: 2,
      title: 'Hair Trim',
      price: '$70 USD',
      date: '05 Mar 2024',
      time: '11:30',
      status: 'Cancelled',
      image:
        'https://images.unsplash.com/photo-1619885187921-9f11c4f1e47a?crop=entropy&cs=tinysrgb&w=1080',
    },
  ];

  const renderOngoingCard = (item, index) => (
    <Animated.View
      key={item.id}
      entering={FadeInDown.delay(index * 150).duration(500)}
      style={styles.card}
    >
      <View style={styles.row}>
        <Image source={{ uri: item.image }} style={styles.petImage} />
        <View style={{ flex: 1, marginLeft: ms(10) }}>
          <Typography style={styles.title}>{item.title}</Typography>
          <Typography style={styles.price}>{item.price}</Typography>
          {/* <Typography style={styles.date}>
            {item.date} • {item.time}
          </Typography> */}
        </View>
        <TouchableOpacity style={styles.confirmBtn}>
          <Typography style={styles.confirmText}>Confirm</Typography>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        {/* <TouchableOpacity style={styles.CancelBtn} onPress={() => handleCancelOrder(item)}>
          <Typography style={styles.CancelText}>cancel</Typography>
        </TouchableOpacity> */}
        <Typography style={styles.date}>
          {item.date} • {item.time}
        </Typography>
        <TouchableOpacity
          onPress={() => navigate(SCREENS.RescheduleBooking)}
          style={styles.rescheduleBtn}
        >
          <Typography style={styles.rescheduleText}>Reschedule</Typography>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderHistoryCard = (item, index) => (
    <Animated.View
      key={item.id}
      entering={FadeInDown.delay(index * 150).duration(500)}
      style={styles.card}
    >
      <View style={styles.row}>
        <Image source={{ uri: item.image }} style={styles.petImage} />
        <View style={{ flex: 1, marginLeft: ms(10) }}>
          <Typography style={styles.title}>{item.title}</Typography>
          <Typography style={styles.price}>{item.price}</Typography>
        </View>
        <View
          style={[
            styles.statusBadge,
            item.status === 'Completed' ? styles.completed : styles.cancelled,
          ]}
        >
          <Typography
            style={[
              styles.statusText,
              item.status === 'Completed' ? styles.statusCompletedText : styles.statusCancelledText,
            ]}
          >
            {item.status}
          </Typography>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <Typography style={styles.date}>
          {item.date} • {item.time}
        </Typography>
      </View>
    </Animated.View>
  );

  const dataToRender = activeTab === 'ongoing' ? ongoingOrders : orderHistory;

  return (
    <AppWrapper
      title='My Bookings'
      headerStyle={{ backgroundColor: COLORS.PRIMARY }}
      titleStyle={{ color: COLORS.WHITE }}
      backButtonColor={COLORS.WHITE}
    >
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'ongoing' && styles.activeTab]}
          onPress={() => setActiveTab('ongoing')}
        >
          <Typography style={[styles.tabText, activeTab === 'ongoing' && styles.activeTabText]}>
            Ongoing Order
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Typography style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            Order History
          </Typography>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: ms(15), paddingBottom: ms(100) }}
      >
        {dataToRender.map((item, index) =>
          activeTab === 'ongoing' ? renderOngoingCard(item, index) : renderHistoryCard(item, index),
        )}
      </ScrollView>
    </AppWrapper>
  );
};

export default MyBookings;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    paddingVertical: ms(12),
    marginBottom: ms(20),
  },
  tab: {
    paddingHorizontal: ms(20),
    paddingVertical: ms(6),
    borderRadius: ms(8),
    marginHorizontal: ms(5),
  },
  activeTab: {
    backgroundColor: COLORS.LIGHT_BLUE,
  },
  tabText: {
    fontWeight: 'bold',
    color: COLORS.GRAY,
    fontSize: ms(14),
  },
  activeTabText: {
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(10),
    padding: ms(15),
    marginBottom: ms(15),
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: ms(10),
    paddingHorizontal: 10,
  },
  petImage: {
    width: ms(55),
    height: ms(55),
    borderRadius: ms(10),
  },
  title: {
    fontSize: ms(16),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  price: {
    fontSize: ms(14),
    color: COLORS.PRIMARY,
    marginTop: ms(2),
  },
  date: {
    fontSize: ms(12),
    color: COLORS.GRAY,
  },
  confirmBtn: {
    backgroundColor: COLORS.LIGHT_BLUE,
    paddingVertical: ms(6),
    paddingHorizontal: ms(10),
    borderRadius: ms(8),
  },
  confirmText: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
    fontSize: ms(11),
  },
  rescheduleBtn: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: ms(8),
    borderRadius: ms(8),
    alignItems: 'center',
    width: ms(120),
  },
  rescheduleText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(11),
  },
  statusBadge: {
    paddingVertical: ms(6),
    paddingHorizontal: ms(10),
    borderRadius: ms(8),
  },
  completed: {
    backgroundColor: '#D1F7C4',
  },
  cancelled: {
    backgroundColor: '#FFD4D4',
  },
  statusText: {
    fontSize: ms(11),
    fontWeight: '600',
  },
  statusCompletedText: {
    color: '#2B9E53',
  },
  statusCancelledText: {
    color: '#D64B4B',
  },
});
