import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Typography } from 'components';
import { AppWrapper } from 'components/common/AppWapper';
import { ms } from 'react-native-size-matters';
import moment from 'moment';
import { COLORS } from 'utils/colors';

const CommentScreen = ({ route }) => {
  const { post } = route.params;

  const [comments, setComments] = useState([
    { id: '1', user: 'alex', text: 'This looks amazing 🔥', time: moment().subtract(2, 'h') },
    { id: '2', user: 'sarah', text: 'Love this place!', time: moment().subtract(3, 'h') },
    { id: '3', user: 'john', text: 'Vibes! 😎', time: moment().subtract(6, 'h') },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      user: 'you',
      text: newComment.trim(),
      time: moment(),
    };
    setComments([newItem, ...comments]);
    setNewComment('');
  };

  const renderComment = ({ item }) => (
    <Animated.View entering={FadeInUp.springify()} style={styles.commentItem}>
      <Image source={{ uri: 'https://i.pravatar.cc/50' }} style={styles.commentAvatar} />
      <View style={styles.commentBubble}>
        <Typography style={styles.commentUser}>{item.user}</Typography>
        <Typography style={styles.commentText}>{item.text}</Typography>
        <Typography style={styles.commentTime}>{item.time.fromNow()}</Typography>
      </View>
    </Animated.View>
  );

  return (
    <AppWrapper title='Post'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={ms(70)}
        style={styles.container}
      >
        <FlatList
          data={comments}
          keyExtractor={item => item.id}
          renderItem={renderComment}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.commentList}
          ListHeaderComponent={
            <Animated.View entering={FadeInUp.duration(400)} style={styles.postContainer}>
              {/* Post Header */}
              <View style={styles.postHeader}>
                <Image source={{ uri: post.profile }} style={styles.userAvatar} />
                <Typography style={styles.userName}>{post.user}</Typography>
              </View>

              {/* Post Image */}
              {post.image && (
                <Image source={{ uri: post.image }} style={styles.postImage} resizeMode='cover' />
              )}

              {/* Caption */}
              <View style={styles.captionWrapper}>
                <Typography style={styles.caption}>
                  <Typography style={styles.userName}>{post.user}</Typography> {post.caption}
                </Typography>
                <Typography style={styles.timeText}>{moment(post.time).fromNow()}</Typography>
              </View>
            </Animated.View>
          }
        />

        {/* Comment Input */}
        <View style={styles.inputBar}>
          <Image source={{ uri: 'https://i.pravatar.cc/40?img=12' }} style={styles.inputAvatar} />
          <View style={styles.inputContainer}>
            <TextInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder='Add a comment...'
              placeholderTextColor='#999'
              style={styles.input}
            />
            <TouchableOpacity onPress={handleAddComment} activeOpacity={0.8}>
              <LinearGradient
                colors={['#FF7A00', '#FFB347']}
                style={styles.sendButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name='send' size={ms(18)} color='#fff' />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </AppWrapper>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  /** POST SECTION **/
  postContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderColor: '#eee',
    marginBottom: ms(10),
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(15),
    paddingVertical: ms(10),
  },
  userAvatar: {
    width: ms(38),
    height: ms(38),
    borderRadius: ms(19),
    marginRight: ms(10),
  },
  userName: {
    fontWeight: '700',
    fontSize: ms(14),
    color: '#222',
  },
  postImage: {
    width: '100%',
    height: ms(300),
    borderRadius: ms(10),
  },
  captionWrapper: {
    paddingHorizontal: ms(15),
    paddingVertical: ms(10),
  },
  caption: {
    color: '#333',
    fontSize: ms(13.5),
    lineHeight: ms(19),
  },
  timeText: {
    color: '#999',
    fontSize: ms(11),
    marginTop: ms(5),
  },

  /** COMMENT SECTION **/
  commentList: {
    paddingTop: ms(10),
    paddingBottom: ms(90),
  },
  commentItem: {
    flexDirection: 'row',
    paddingHorizontal: ms(15),
    marginBottom: ms(14),
  },
  commentAvatar: {
    width: ms(34),
    height: ms(34),
    borderRadius: ms(17),
    marginRight: ms(10),
  },
  commentBubble: {
    backgroundColor: '#fff',
    borderRadius: ms(12),
    paddingVertical: ms(8),
    paddingHorizontal: ms(12),
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  commentUser: {
    fontWeight: '700',
    fontSize: ms(13),
    color: '#222',
  },
  commentText: {
    fontSize: ms(12.5),
    color: '#444',
    marginTop: ms(3),
    lineHeight: ms(17),
  },
  commentTime: {
    fontSize: ms(10.5),
    color: '#999',
    marginTop: ms(4),
  },

  /** INPUT BAR **/
  inputBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(10),
    paddingVertical: ms(8),
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  inputAvatar: {
    width: ms(32),
    height: ms(32),
    borderRadius: ms(16),
    marginRight: ms(8),
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: ms(25),
    paddingHorizontal: ms(12),
    paddingVertical: ms(4),
  },
  input: {
    flex: 1,
    fontSize: ms(13),
    color: '#000',
    paddingVertical: ms(6),
    marginRight: ms(8),
  },
  sendButton: {
    margin: 5,
    padding: ms(8),
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
