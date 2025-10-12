import React, { useState } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { Typography } from 'components/index';
import { AppWrapper } from 'components/common/AppWapper';
import Icon from 'react-native-vector-icons/Ionicons';
import { ms } from 'react-native-size-matters';
import Animated, {
  FadeInUp,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from 'utils/colors';
import ImageViewing from 'react-native-image-viewing';
import { SCREENS } from 'constants/routes';
import { navigate } from 'navigation/index';

const initialPosts = [
  {
    id: '1',
    user: 'Group Topic Here 01',
    createdBy: 'Fuxgo',
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1000',
    likes: 1200,
    comments: 128,
    caption:
      'Melvin Joseph Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    hashtags: ['#PetCare', '#traveling', '#socialenvy', '#Dogcare', '#visiting', '#pet'],
    time: '20 hours ago',
    profile: 'https://randomuser.me/api/portraits/men/31.jpg',
    liked: false,
  },
  {
    id: '2',
    user: 'Group Topic Here 01',
    createdBy: 'Me',
    verified: true,
    gold: true,
    images: [
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800',
      'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=800',
      'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800',
      'https://images.unsplash.com/photo-1619983081563-430f63602796?w=800',
    ],
    likes: 156,
    comments: 20,
    caption:
      'Tobias Ricky Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    time: '2 minutes ago',
    profile: 'https://randomuser.me/api/portraits/women/68.jpg',
    liked: false,
  },
];

const GroupsScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [posts, setPosts] = useState(initialPosts);
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const toggleLike = postId => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setPosts(prev =>
      prev.map(p =>
        p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p,
      ),
    );
  };

  const LikeIcon = ({ liked }) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const handlePress = () => {
      scale.value = withSpring(1.5, { damping: 4 });
      setTimeout(() => {
        scale.value = withSpring(1);
      }, 150);
    };

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress} style={{ marginRight: ms(8) }}>
        <Animated.View style={animatedStyle}>
          <Icon
            name={liked ? 'heart' : 'heart-outline'}
            color={liked ? COLORS.RED || '#E91E63' : '#FFF'}
            size={ms(18)}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const openImageViewer = (imagesArray, index) => {
    setPhotos(imagesArray.map(uri => ({ uri })));
    setSelectedIndex(index);
    setVisible(true);
  };

  const renderPost = ({ item, index }) => (
    <Animated.View entering={FadeInUp.delay(index * 200).duration(600)} style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userRow}>
          <Image source={{ uri: item.profile }} style={styles.profileImage} />
          <View style={{ flex: 1 }}>
            <Typography style={styles.username}>{item.user}</Typography>
            <View style={styles.createdByRow}>
              <Typography style={styles.createdBy}>Created By: </Typography>
              <Typography style={styles.createdByName}>{item.createdBy}</Typography>
              {item.gold && (
                <View style={styles.badgeGold}>
                  <Typography style={styles.badgeText}>Gold</Typography>
                </View>
              )}
              {item.verified && (
                <View style={styles.badgeVerified}>
                  <Typography style={styles.badgeText}>Verified</Typography>
                </View>
              )}
            </View>
          </View>
        </View>
        {/* <TouchableOpacity>
          <Icon name='ellipsis-horizontal' size={ms(20)} color='#555' />
        </TouchableOpacity> */}
      </View>

      {/* Post Images */}
      {item.image ? (
        <TouchableOpacity onPress={() => openImageViewer([item.image], 0)}>
          <Image source={{ uri: item.image }} style={styles.singleImage} />
        </TouchableOpacity>
      ) : (
        <View style={styles.gridContainer}>
          {item.images.map((img, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => openImageViewer(item.images, i)}
              style={[styles.gridImage, (i + 1) % 2 === 0 && { marginRight: 0 }]}
            >
              <Image
                source={{ uri: img }}
                style={{
                  width: '100%',
                  height: ms(120),
                  borderRadius: ms(10),
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Reaction Row */}
      <View style={styles.reactionRow}>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => toggleLike(item.id)}
          activeOpacity={0.8}
        >
          <LinearGradient colors={['#8A2BE2', '#7A42FF']} style={styles.likeGradient}>
            <LikeIcon liked={item.liked} />
            <Typography style={styles.likeCount}>{item.likes}</Typography>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.commentRow}>
          <TouchableOpacity
            onPress={() => navigate(SCREENS.CommentsScreen, { post: item })}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Icon name='chatbubble-outline' size={ms(16)} color='#666' />
            <Typography style={styles.commentCount}>{item.comments}</Typography>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2550/2550209.png' }}
            resizeMode='contain'
            style={{
              width: ms(17),
              height: ms(17),
              tintColor: '#666',
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Caption */}
      <Typography style={styles.caption}>
        <Typography style={styles.boldName}>{item.caption.split(' ')[0]} </Typography>
        {item.caption.replace(item.caption.split(' ')[0], '')}
      </Typography>

      {/* Hashtags */}
      {item.hashtags && (
        <View style={styles.hashtagRow}>
          {item.hashtags.map((tag, i) => (
            <Typography key={i} style={styles.hashtag}>
              {tag}
            </Typography>
          ))}
        </View>
      )}

      {/* Timestamp */}
      <Typography style={styles.time}>{item.time}</Typography>
    </Animated.View>
  );

  return (
    <AppWrapper
      title='Groups'
      onEndIcon={() => (
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.PRIMARY,
            width: ms(30),
            height: ms(30),
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigate(SCREENS.MESSAGES)}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2076/2076218.png' }}
            resizeMode='contain'
            style={{
              width: ms(17),
              height: ms(17),
              tintColor: COLORS.WHITE,
            }}
          />
        </TouchableOpacity>
      )}
    >
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Full-Screen Image Viewer */}
      <ImageViewing
        images={photos}
        imageIndex={selectedIndex}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        backgroundColor='rgba(0,0,0,0.95)'
      />
    </AppWrapper>
  );
};

export default GroupsScreen;

const styles = StyleSheet.create({
  listContainer: { padding: ms(15) },
  card: {
    backgroundColor: '#fff',
    borderRadius: ms(14),
    padding: ms(12),
    marginBottom: ms(20),
    elevation: 3, // Android
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 }, // iOS
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: ms(10),
  },
  userRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  profileImage: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    marginRight: ms(10),
  },
  username: { fontSize: ms(14), fontWeight: '600', color: '#222' },
  createdByRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  createdBy: { fontSize: ms(12), color: '#777' },
  createdByName: { fontSize: ms(12), color: '#555' },
  badgeGold: {
    backgroundColor: '#FFD700',
    borderRadius: ms(6),
    paddingHorizontal: ms(6),
    marginLeft: ms(6),
  },
  badgeVerified: {
    backgroundColor: '#6BE7C5',
    borderRadius: ms(6),
    paddingHorizontal: ms(6),
    marginLeft: ms(6),
  },
  badgeText: { fontSize: ms(10), color: '#fff', fontWeight: '600' },
  singleImage: { width: '100%', height: ms(230), borderRadius: ms(12) },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: ms(12),
    overflow: 'hidden',
    gap: ms(6),
  },

  gridImage: {
    resizeMode: 'cover',
    width: '48%',
    height: ms(120),

    marginBottom: ms(6),
  },
  reactionRow: { flexDirection: 'row', alignItems: 'center', marginTop: ms(10), gap: ms(14) },
  likeButton: { borderRadius: ms(20) },
  likeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(4),
    paddingHorizontal: ms(10),
    borderRadius: ms(20),
  },
  likeCount: { color: '#fff', fontSize: ms(12), marginLeft: ms(4) },
  commentRow: { flexDirection: 'row', alignItems: 'center' },
  commentCount: { fontSize: ms(12), color: '#666', marginLeft: ms(5) },
  caption: { fontSize: ms(13), color: '#333', marginTop: ms(10), lineHeight: ms(18) },
  boldName: { fontWeight: '600', color: '#000' },
  hashtagRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: ms(5),
  },

  hashtag: {
    color: '#7A42FF',
    fontSize: ms(11),
    marginRight: ms(6),
    lineHeight: ms(16),
  },
  time: { fontSize: ms(11), color: '#999', marginTop: ms(6) },
});
