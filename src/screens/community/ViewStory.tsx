import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Video from 'react-native-video';
import { Bar } from 'react-native-progress';
import moment from 'moment';
import { COLORS } from 'utils/colors';
import { Icon, Typography } from 'components/index';
import { onBack } from 'navigation/index';

const StoryView = (props: any) => {
  const data = {
    username: 'John Doe',
    profile_picture: 'https://randomuser.me/api/portraits/men/1.jpg',
    created_at: '2023-10-05T13:00:00Z',
    stories: [
      {
        id: '1',
        media: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      {
        id: '2',
        media: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
      {
        id: '3',
        media: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
    ],
  };
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [progress, setSelectedProgress] = useState<number>(0);
  const [loading, showLoading] = useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [storyData, setStoryData] = useState(data);
  const interval = useRef<NodeJS.Timeout>();

  const startProgress = () => {
    showLoading(false);
    interval.current = setInterval(() => {
      setSelectedProgress(prev => {
        if (prev > 0.99) {
          clearInterval(interval.current);
          setSelectedIndex(ind => {
            if (ind === storyData?.stories.length - 1) {
              setSelectedIndex(0);
              return 0;
            }
            return ind + 1;
          });
          return 0;
        }
        return prev + 0.015; // Speed of progress
      });
    }, 100);
  };

  const onPressNext = () => {
    if (selectedIndex === storyData?.stories.length - 1) {
      setSelectedIndex(0);
      return;
    }
    clearInterval(interval.current);
    setSelectedIndex(ind => ind + 1);
    setSelectedProgress(0);
  };

  const onPressPrev = () => {
    clearInterval(interval.current);
    setSelectedIndex(ind => ind - 1);
    setSelectedProgress(0);
  };

  const renderMedia = () => {
    if (storyData?.stories.length > 0) {
      const mediaItem = storyData.stories[selectedIndex];
      if (!mediaItem || !mediaItem.media) {
        return null;
      }

      const mediaExtension = mediaItem.media.split('.').pop()?.toLowerCase();
      if (mediaExtension === 'mp4' || mediaExtension === 'mov') {
        return (
          <Video
            source={{ uri: mediaItem.media }}
            style={{ width: '100%', height: '100%' }}
            resizeMode='contain'
            onLoad={e => {
              showLoading(false);
              setVideoDuration(e.duration);
              startProgress();
            }}
            onLoadStart={() => {
              showLoading(true);
            }}
            onProgress={e => {
              setSelectedProgress(e.currentTime / videoDuration);
            }}
            onEnd={() => {
              onPressNext();
            }}
          />
        );
      } else if (
        mediaExtension === 'jpg' ||
        mediaExtension === 'jpeg' ||
        mediaExtension === 'png'
      ) {
        return (
          <Image
            source={{ uri: mediaItem.media, cache: 'force-cache' }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
            onLoadStart={() => {
              showLoading(true);
            }}
            onLoadEnd={() => {
              startProgress(); // Start progress once image is loaded
            }}
          />
        );
      }
    }
    return null;
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='height' keyboardVerticalOffset={0}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          {/* Media (Image/Video) */}
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              width: '100%',
              height: '100%',
              backgroundColor: '#101010',
            }}
          >
            {renderMedia()}
            {loading && (
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: '#101010',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ActivityIndicator color={'#fff'} size={40} />
              </View>
            )}
          </View>

          {/* Header - User Info */}
          <View style={{ backgroundColor: 'transparent', flex: 1, top: 20 }}>
            <View
              style={{
                width: '95%',
                marginHorizontal: 15,
                marginVertical: 10,
                backgroundColor: 'transparent',
                paddingTop: Platform.OS == 'ios' ? 44 : 20,
                flexDirection: 'row',
                gap: 10,
              }}
            >
              {storyData?.stories.map((_, i) => (
                <Bar
                  key={i}
                  width={null}
                  style={{ flex: 1, gap: 5 }}
                  borderWidth={0}
                  unfilledColor='#5c5c5c'
                  color={COLORS.PRIMARY}
                  height={5}
                  progress={selectedIndex > i ? 1 : selectedIndex === i ? progress : 0}
                />
              ))}
            </View>

            {/* User Info */}
            <View
              style={{
                marginHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                backgroundColor: 'transparent',
              }}
            >
              <TouchableOpacity onPress={() => onBack()} style={{ marginTop: 8 }}>
                <Icon
                  componentName='Ionicons'
                  iconName='arrow-back-outline'
                  color='white'
                  size={20}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 10,
                  borderWidth: 1,
                  borderColor: COLORS.PRIMARY,
                  backgroundColor: 'transparent',
                }}
              >
                <Image
                  source={{ uri: storyData.profile_picture }} // Placeholder for actual user image source
                  style={{ width: 45, height: 45, borderRadius: 22.5 }}
                  resizeMode='contain'
                />
              </View>
              <View>
                <Typography
                  variant='h2'
                  fontWeight={700}
                  color={'white'}
                  title={storyData.username} // Placeholder for user label
                />
                <Typography
                  variant='h2'
                  fontWeight={500}
                  color={'white'}
                  style={{ opacity: 0.5 }}
                  title={moment(storyData.created_at).fromNow()} // Placeholder for the date
                />
              </View>
            </View>

            {/* Navigation */}
            <Pressable
              onPress={onPressPrev}
              style={{ ...StyleSheet.absoluteFillObject, right: '70%', top: '20%' }}
            />
            <Pressable
              onPress={onPressNext}
              style={{ ...StyleSheet.absoluteFillObject, left: '70%', top: '20%' }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default StoryView;
