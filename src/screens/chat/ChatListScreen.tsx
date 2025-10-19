import React, { memo } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/index';
import { COLORS } from 'utils/index';
import Icon from 'react-native-vector-icons/Feather';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';
import { ms } from 'react-native-size-matters';
import Animated, {
  FadeInUp,
  FadeOutDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useAppSelector } from 'types/reduxTypes';

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  avatar: string;
  isGroup?: boolean;
}

const chatData: ChatItem[] = [
  // 🔹 Individual Chats
  {
    id: '1',
    name: 'Dr. Hughie Watson',
    lastMessage: 'See you tomorrow at 9am!',
    time: '2m ago',
    unreadCount: 2,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000',
  },
  {
    id: '2',
    name: 'Dr. Amelia Brown',
    lastMessage: 'Thanks for your help 😊',
    time: '10m ago',
    avatar:
      'https://plus.unsplash.com/premium_photo-1689533448099-2dc408030f0f?ixlib=rb-4.1.0&fm=jpg&q=60&w=3000',
  },
  {
    id: '3',
    name: 'Dr. Alex Johnson',
    lastMessage: 'Let’s finalize the report.',
    time: '1h ago',
    unreadCount: 1,
    avatar:
      'https://www.jeancoutu.com/globalassets/revamp/photo/conseils-photo/20160302-01-reseaux-sociaux-profil/photo-profil_301783868.jpg',
  },

  // 🔹 Group Chats
  {
    id: '4',
    name: 'Pediatric Care Team',
    lastMessage: 'Dr. Watson: Meeting moved to 4PM.',
    time: '30m ago',
    unreadCount: 5,
    isGroup: true,
    avatar:
      'https://img.freepik.com/free-photo/group-portrait-doctors-standing-together-hospital_107420-84788.jpg?w=740&q=80',
  },
  {
    id: '5',
    name: 'Hospital Management',
    lastMessage: 'Admin: Please submit reports by Friday.',
    time: 'Yesterday',
    isGroup: true,
    avatar:
      'https://img.freepik.com/free-photo/medium-shot-smiley-doctors-with-coffee_23-2148818128.jpg?w=740&q=80',
  },
];

const AnimatedChatCard = memo(({ item, index }: { item: ChatItem; index: number }) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => (scale.value = withSpring(0.96));
  const handlePressOut = () => (scale.value = withSpring(1));

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100)
        .springify()
        .damping(15)}
      exiting={FadeOutDown.springify()}
      style={[styles.chatCard, animatedStyle]}
    >
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {
          if (item.isGroup) {
            navigate(SCREENS.GroupChatScreen, { chatId: item.id });
          } else {
            navigate(SCREENS.UserChatScreen, { chatId: item.id });
          }
        }}
      >
        <View style={styles.row}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />

          <View style={styles.messageSection}>
            <View style={styles.nameRow}>
              <Typography style={styles.name}>{item.name}</Typography>
              {/* {item.isGroup && (
                <View style={styles.groupBadge}>
                  <Typography style={styles.groupBadgeText}>Group</Typography>
                </View>
              )} */}
            </View>

            <Typography style={styles.lastMessage} numberOfLines={1}>
              {item.lastMessage}
            </Typography>
          </View>

          <View style={styles.metaSection}>
            <Typography style={styles.time}>{item.time}</Typography>
            {item.unreadCount ? (
              <View style={styles.badge}>
                <Typography style={styles.badgeText}>{item.unreadCount}</Typography>
              </View>
            ) : (
              <Icon name='check' size={16} color={COLORS.GRAY} style={{ marginTop: 8 }} />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
});

const ChatListScreen = () => {
  const role = useAppSelector(state => state.app.userRole);
  // const role = 'user'; // for testing

  // ✅ Only show group chats if role == 'user'
  const filteredChatData = chatData.filter(item => (role === 'user' ? true : !item.isGroup));

  const renderEndIcon = () =>
    role === 'user' ? (
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigate(SCREENS.CreateGroupScreen)}
      >
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3524/3524388.png' }}
          style={styles.iconImage}
          resizeMode='contain'
        />
      </TouchableOpacity>
    ) : null;

  return (
    <AppWrapper title='Messages' onEndIcon={renderEndIcon}>
      <FlatList
        data={filteredChatData}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <AnimatedChatCard item={item} index={index} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </AppWrapper>
  );
};

export default memo(ChatListScreen);

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: ms(8),
    paddingBottom: ms(20),
  },
  chatCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(18),
    padding: ms(14),
    marginVertical: ms(6),
    marginHorizontal: ms(12),
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: ms(55),
    height: ms(55),
    borderRadius: 50,
  },
  messageSection: {
    flex: 1,
    marginLeft: ms(12),
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: ms(13),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  lastMessage: {
    fontSize: ms(11),
    color: COLORS.GRAY,
  },
  metaSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  time: {
    fontSize: ms(10),
    color: COLORS.GRAY,
  },
  badge: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    minWidth: ms(20),
    height: ms(20),
    paddingHorizontal: ms(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: ms(6),
  },
  badgeText: {
    color: COLORS.WHITE,
    fontSize: ms(10),
    fontWeight: '600',
  },
  groupBadge: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: ms(6),
    paddingHorizontal: ms(6),
    paddingVertical: ms(2),
    marginLeft: ms(8),
  },
  groupBadgeText: {
    fontSize: ms(10),
    fontWeight: '600',
    color: COLORS.PRIMARY,
  },
  iconButton: {
    backgroundColor: COLORS.PRIMARY,
    width: ms(26),
    height: ms(26),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: ms(14),
    height: ms(14),
    tintColor: COLORS.WHITE,
  },
});
