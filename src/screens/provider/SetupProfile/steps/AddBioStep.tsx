import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { COLORS } from 'utils/colors';
import { Button, Typography } from 'components/common';
import LinearGradient from 'react-native-linear-gradient';
import { AppWrapper } from 'components/common/AppWapper';
import { useMediaPicker } from 'hooks/useMediaPicker';
import { openCameraOrGallery } from 'utils/helpers';
import { UseMediaPickerOptions } from 'hooks/useMediaPicker';
import { ms } from 'react-native-size-matters';
import { showToast } from 'utils/toast';

const { width } = Dimensions.get('window');

interface Props {
  onNext: (payload: { image: string; bio: string }) => void;
}

const AddBioStep: React.FC<Props> = ({ onNext }) => {
  const { pickMedia, selectedMedia } = useMediaPicker();
  const [bio, setBio] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const imageConfig: UseMediaPickerOptions = {
    mediaType: 'image',
    cropping: true,
    width: 300,
    height: 300,
    cropperCircleOverlay: true,
  };

  // ✅ Animate on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // ✅ Validation and payload
  const handleNext = () => {
    if (!bio.trim()) {
      showToast({
        message: 'Please enter your bio.',
        isError: true,
      });
      return;
    }

    const payload = {
      image: selectedMedia?.[0]?.uri ?? '',
      bio: bio.trim(),
    };

    onNext(payload);
  };

  return (
    <AppWrapper useSafeArea={false} Header={false}>
      <Animated.View
        style={[styles.container, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
      >
        {/* Profile Picture */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri:
                selectedMedia?.[0]?.uri ??
                'https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg',
            }}
            style={styles.profilePic}
          />
          <TouchableOpacity
            onPress={() =>
              openCameraOrGallery({
                cameraPress: () => pickMedia({ ...imageConfig, source: 'camera' }),
                galleryPress: () => pickMedia({ ...imageConfig, source: 'gallery' }),
              })
            }
            style={styles.changeBtn}
          >
            <Typography style={styles.changeText}>Change Picture</Typography>
          </TouchableOpacity>
        </View>

        {/* Bio Input */}
        <Typography style={styles.label}>About Yourself / Bio</Typography>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder='Write something about yourself...'
          value={bio}
          onChangeText={setBio}
          placeholderTextColor={COLORS.GRAY_LIGHT}
        />

        {/* Next Button */}

        <TouchableOpacity
          style={{ flex: 1, width: '100%', marginTop: ms(40) }}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[COLORS.HEADER_BACKGROUND, COLORS.HEADER_BACKGROUND]}
            style={styles.gradient}
          >
            <Typography style={styles.nextText}>Next Step</Typography>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </AppWrapper>
  );
};

export default AddBioStep;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: ms(20),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: ms(10),
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: ms(20),
  },
  profilePic: {
    width: ms(100),
    height: ms(100),
    borderRadius: ms(55),
    marginBottom: ms(10),
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
  },
  changeBtn: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    paddingHorizontal: ms(10),
    paddingVertical: ms(6),
    borderRadius: ms(8),
  },
  changeText: {
    color: COLORS.PRIMARY,
    fontSize: ms(12),
    fontWeight: '600',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: ms(8),
    color: COLORS.BLACK,
    fontWeight: '600',
    fontSize: ms(14),
  },
  textArea: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
    borderRadius: ms(10),
    padding: ms(10),
    height: ms(120),
    textAlignVertical: 'top',
    color: COLORS.BLACK,
    marginBottom: ms(25),
  },
  gradient: {
    width: '100%',
    paddingVertical: ms(14),
    borderRadius: ms(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    color: COLORS.WHITE,
    fontWeight: '700',
    fontSize: ms(14),
  },
});
