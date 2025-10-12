import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { ms } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';
import { Typography } from 'components/index';
import { onBack } from 'navigation/index';
import GroupInfoModal from 'components/appComponents/GroupInfoModal';

const { width } = Dimensions.get('window');

// Dummy group data
const dummyGroup = {
  id: 'group_001',
  name: 'Friends Trip ',
  members: [
    { _id: 2, name: 'Sophia', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { _id: 3, name: 'David', avatar: 'https://randomuser.me/api/portraits/men/52.jpg' },
    { _id: 4, name: 'You', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  ],
  coverImage:
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60',
  description: 'Weekend trip with the squad!',
};

const GroupChatScreen = ({ route }) => {
  const group = dummyGroup;
  const [messages, setMessages] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    // Animate header appearance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 6,
      }),
    ]).start();

    // Continuous pulse animation for send button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Dummy messages
    setMessages([
      {
        _id: 1,
        text: 'Welcome everyone! 🎉',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Ayesha',
          avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
        },
      },
      {
        _id: 2,
        text: 'Hey guys 👋 excited for the trip!',
        createdAt: new Date(),
        user: {
          _id: 3,
          name: 'Ali',
          avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
        },
      },
      {
        _id: 3,
        text: 'Same here, let’s plan soon! 😄',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'You',
          avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((msgs = []) => {
    // Trigger rotation animation when sending
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();

    setMessages(prevMsgs => GiftedChat.append(prevMsgs, msgs));
  }, []);

  // Interpolations for rotation effect
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View
        style={[
          styles.headerContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <LinearGradient colors={[COLORS.SECONDARY, COLORS.SECONDARY]} style={styles.headerGradient}>
          <TouchableOpacity style={styles.backButton} onPress={() => onBack()}>
            <Icon name='arrow-back' size={ms(22)} color={COLORS.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setInfoVisible(true)}>
            <View style={styles.groupHeaderContent}>
              <Image source={{ uri: group.coverImage }} style={styles.groupImage} />
              <View style={styles.groupInfo}>
                <Typography style={styles.groupName}>{group.name}</Typography>
                <Typography style={styles.groupMembers}>{group.members.length} Members</Typography>
              </View>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>

      {/* Chat Section */}
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
          name: 'You',
          avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        }}
        placeholder='Type a message...'
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: COLORS.PRIMARY,
                borderRadius: ms(14),
                padding: ms(4),
                marginBottom: 10,
              },
              left: {
                backgroundColor: COLORS.LIGHT_GREY,
                padding: ms(4),
                marginBottom: 10,
              },
            }}
            textStyle={{
              right: { color: COLORS.WHITE },
              left: { color: COLORS.BLACK },
            }}
          />
        )}
        renderSend={props => (
          <Send {...props} disabled={!props.text?.trim()}>
            <View style={styles.sendButton}>
              <Icon name='send' size={ms(18)} color={COLORS.WHITE} />
            </View>
          </Send>
        )}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={styles.inputToolbarContainer}
            primaryStyle={styles.inputPrimary}
            textInputStyle={styles.textInput}
          />
        )}
        showUserAvatar
        scrollToBottom
        alwaysShowSend
        renderAvatarOnTop
        showAvatarForEveryMessage
        bottomOffset={10}
      />

      <GroupInfoModal visible={infoVisible} onClose={() => setInfoVisible(false)} group={group} />
    </View>
  );
};

export default GroupChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE_OPACITY,
  },
  headerContainer: {
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 5,
  },
  headerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(14),
    paddingHorizontal: ms(15),
    borderBottomLeftRadius: ms(20),
    borderBottomRightRadius: ms(20),
  },
  backButton: {
    marginRight: ms(10),
    padding: ms(6),
    borderRadius: ms(10),
  },
  groupHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupImage: {
    width: ms(55),
    height: ms(55),
    borderRadius: ms(28),
    borderWidth: 2,
    borderColor: COLORS.WHITE,
  },
  groupInfo: {
    marginLeft: ms(12),
  },
  groupName: {
    fontSize: ms(15),
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  groupMembers: {
    fontSize: ms(11),
    color: COLORS.WHITE,
    opacity: 0.9,
    marginTop: 2,
  },
  // inputToolbar: {
  //   borderTopWidth: 0,
  //   marginHorizontal: ms(10),
  //   marginBottom: ms(10),
  //   borderRadius: ms(25),
  //   elevation: 5,
  //   shadowColor: COLORS.BLACK,
  //   shadowOpacity: 0.1,
  //   shadowRadius: 6,
  // },
  // sendButton: {
  //   margin: 5,
  //   width: ms(40),
  //   height: ms(40),
  //   borderRadius: ms(25),
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  inputToolbarContainer: {
    borderTopWidth: 0,
    borderRadius: ms(25),
    marginHorizontal: ms(12),
    marginBottom: ms(8),
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputPrimary: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInput: {
    color: COLORS.TEXT,
    fontSize: ms(14),
    lineHeight: ms(20),
    paddingTop: ms(6),
    paddingBottom: ms(6),
    paddingHorizontal: ms(10),
  },

  sendButton: {
    backgroundColor: COLORS.PRIMARY,
    width: ms(35),
    height: ms(35),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});
