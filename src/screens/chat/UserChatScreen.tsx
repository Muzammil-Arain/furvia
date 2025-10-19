import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { ms } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';
import { Typography } from 'components/index';
import { onBack } from 'navigation/index';

const UserChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-40)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Dummy user data (single user chat)
  const user = {
    _id: 2,
    name: 'Dr. Sarah Lee',
    avatar:
      'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000',
    status: 'Online',
  };

  useEffect(() => {
    // Animate header in
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

    // Send button pulse animation
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

    // Dummy chat messages
    setMessages([
      {
        _id: 1,
        text: 'Hey! How are you today? 😊',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: user.name,
          avatar: user.avatar,
        },
      },
      {
        _id: 2,
        text: 'I’m good, just finished my appointments for the day!',
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
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <LinearGradient
          colors={[COLORS.HEADER_BACKGROUND, COLORS.HEADER_BACKGROUND]}
          style={styles.headerGradient}
        >
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Icon name='arrow-back' size={ms(22)} color={COLORS.WHITE} />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={{ marginLeft: 10 }}>
              <Typography style={styles.userName}>{user.name}</Typography>
            </View>
          </View>
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
                borderRadius: ms(16),
                marginBottom: 6,
                padding: 2,
              },
              left: {
                backgroundColor: COLORS.LIGHT_GREY,
                borderRadius: ms(16),
                marginBottom: 6,
                padding: 2,
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
            <Animated.View
              style={[
                styles.sendButton,
                {
                  transform: [{ scale: pulseAnim }, { rotate: rotateInterpolate }],
                },
              ]}
            >
              <Icon name='send' size={ms(18)} color={COLORS.WHITE} />
            </Animated.View>
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
        bottomOffset={10}
      />
    </View>
  );
};

export default UserChatScreen;

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
    padding: ms(6),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  avatar: {
    width: ms(45),
    height: ms(45),
    borderRadius: ms(22),
    borderWidth: 2,
    borderColor: COLORS.WHITE,
  },
  userName: {
    fontSize: ms(15),
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  status: {
    fontSize: ms(11),
    color: COLORS.WHITE,
    opacity: 0.8,
  },
  inputToolbarContainer: {
    borderTopWidth: 0,
    borderRadius: ms(25),
    marginHorizontal: ms(12),
    marginBottom: ms(8),
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 3,
  },
  inputPrimary: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    color: COLORS.TEXT,
    fontSize: ms(14),
    lineHeight: ms(20),
    paddingVertical: ms(6),
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
