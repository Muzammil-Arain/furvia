import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography, Icon } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import { FadeInUp } from 'react-native-reanimated';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Appointment Confirmed',
      message: 'Your appointment with Dr. Watson is confirmed for Oct 12, 2025 at 3:00 PM.',
      icon: 'calendar-check-outline',
      time: moment().subtract(2, 'hours').toISOString(),
      read: false,
    },
    {
      id: '2',
      title: 'Vaccination Reminder',
      message: 'Bella’s annual vaccination is due next week. Don’t forget to book an appointment!',
      icon: 'alert-circle-outline',
      time: moment().subtract(1, 'day').toISOString(),
      read: false,
    },
    {
      id: '3',
      title: 'New Message',
      message: 'You received a message from Dr. Hughie Watson.',
      icon: 'chat-outline',
      time: moment().subtract(3, 'days').toISOString(),
      read: false,
    },
  ]);

  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const markAsRead = id => {
    setNotifications(prev => prev.map(item => (item.id === id ? { ...item, read: true } : item)));
  };

  const renderItem = ({ item, index }) => (
    <Animated.View
      entering={FadeInUp.delay(index * 120)}
      style={[styles.card, !item.read && styles.unreadCard]}
    >
      <TouchableOpacity
        style={styles.cardInner}
        activeOpacity={0.8}
        // onPress={() => markAsRead(item.id)}
      >
        <LinearGradient
          colors={item.read ? ['#E6EAF0', '#E6EAF0'] : ['#E8DFF9', '#F6F2FD']}
          style={styles.iconWrapper}
        >
          <Icon
            componentName='MaterialCommunityIcons'
            iconName={item.icon}
            color={item.read ? COLORS.GRAY_600 : COLORS.PRIMARY}
            size={20}
          />
        </LinearGradient>

        <View style={styles.textContainer}>
          <Typography style={[styles.title, !item.read && { color: COLORS.PRIMARY }]}>
            {item.title}
          </Typography>
          <Typography style={styles.message}>{item.message}</Typography>
          <Typography style={styles.time}>{moment(item.time).fromNow()}</Typography>
        </View>

        {!item.read && <View style={styles.dot} />}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <AppWrapper title='Notifications'>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {notifications.length > 0 ? (
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Image
              //   source={require('../../assets/images/empty-notify.png')}
              style={styles.emptyImage}
            />
            <Typography style={styles.emptyText}>No Notifications Yet</Typography>
          </View>
        )}
      </Animated.View>
    </AppWrapper>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(16),
    paddingTop: ms(10),
  },
  listContainer: {
    paddingBottom: ms(20),
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 14,
    marginVertical: ms(6),
    shadowColor: '#00000020',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginBottom: ms(10),
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.PRIMARY,
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: ms(14),
  },
  iconWrapper: {
    width: ms(38),
    height: ms(38),
    borderRadius: ms(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ms(12),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: ms(13.5),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: ms(2),
  },
  message: {
    fontSize: ms(11.5),
    color: COLORS.GRAY_700,
    marginBottom: ms(4),
  },
  time: {
    fontSize: ms(10),
    color: COLORS.GRAY_500,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.PRIMARY,
    alignSelf: 'center',
    marginLeft: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ms(80),
  },
  emptyImage: {
    width: ms(120),
    height: ms(120),
    resizeMode: 'contain',
    marginBottom: ms(16),
  },
  emptyText: {
    fontSize: ms(14),
    color: COLORS.GRAY_600,
  },
});
