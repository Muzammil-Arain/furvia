import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { openCameraOrGallery } from 'utils/helpers';
import { useMediaPicker, UseMediaPickerOptions } from 'hooks/useMediaPicker';
import { DEFULT_IMAGE } from 'constants/assets'; // Assuming you have a default image constant

const EditProfile = () => {
  const { pickMedia, selectedMedia } = useMediaPicker();
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    profilePicture: '', // Initially, empty, meaning no profile picture
  });

  useEffect(() => {
    // When a new image is selected, update the profile picture
    if (selectedMedia[0]?.uri) {
      setUserData(prevData => ({ ...prevData, profilePicture: selectedMedia[0].uri }));
    }
  }, [selectedMedia]);

  const handleChange = (key, value) => {
    setUserData(prev => ({ ...prev, [key]: value }));
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const imageConfig: UseMediaPickerOptions = {
    mediaType: 'image',
    cropping: true,
    width: 300,
    height: 300,
    cropperCircleOverlay: true,
  };

  return (
    <AppWrapper title='Profile'>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Profile Image Section */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.card}>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => {
                if (isEditing) {
                  openCameraOrGallery({
                    cameraPress: () => {
                      pickMedia({ ...imageConfig, source: 'camera' });
                    },
                    galleryPress: () => {
                      pickMedia({ ...imageConfig, source: 'gallery' });
                    },
                  });
                }
              }}
            >
              {/* Profile image */}
              <Image
                source={{ uri: userData.profilePicture || DEFULT_IMAGE }}
                style={styles.image}
              />
            </TouchableOpacity>
            {isEditing && (
              <TouchableOpacity
                onPress={() => {
                  openCameraOrGallery({
                    cameraPress: () => pickMedia({ ...imageConfig, source: 'camera' }),
                    galleryPress: () => pickMedia({ ...imageConfig, source: 'gallery' }),
                  });
                }}
                style={styles.uploadIcon}
              >
                <Image
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3524/3524388.png' }}
                  style={styles.uploadIconImage}
                />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>

        {/* Editable Name and Phone */}
        <View style={styles.inputContainer}>
          <Typography style={styles.label}>Name</Typography>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userData.name}
              onChangeText={text => handleChange('name', text)}
              placeholder='Enter Name'
              placeholderTextColor={COLORS.GRAY}
            />
          ) : (
            <Typography style={styles.value}>{userData.name}</Typography>
          )}

          <Typography style={styles.label}>Phone Number</Typography>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userData.phone}
              onChangeText={text => handleChange('phone', text)}
              placeholder='Enter Phone Number'
              placeholderTextColor={COLORS.GRAY}
            />
          ) : (
            <Typography style={styles.value}>{userData.phone}</Typography>
          )}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={() => setIsEditing(!isEditing)}>
          <Typography style={styles.saveButtonText}>
            {!isEditing ? 'Edit Profile' : 'Save Changes'}
          </Typography>
        </TouchableOpacity>
      </ScrollView>
    </AppWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: ms(20),
    paddingBottom: 40,
  },
  card: {
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(20),
    paddingVertical: ms(30),
    marginBottom: ms(25),
    elevation: 8,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: ms(6),
    shadowOffset: { width: 0, height: 5 },
  },
  imageContainer: {
    width: ms(120),
    height: ms(120),
    borderRadius: ms(60),
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: ms(60),
  },
  uploadIcon: {
    position: 'absolute',
    top: ms(40),
    left: ms(40),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: ms(20),
    padding: ms(10),
  },
  uploadIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: COLORS.WHITE,
  },
  editIcon: {
    zIndex: 999,
    position: 'absolute',
    bottom: ms(8),
    right: ms(8),
    backgroundColor: COLORS.PRIMARY,
    borderRadius: ms(20),
    padding: ms(8),
    elevation: 5,
  },
  editIconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  inputContainer: {
    marginTop: ms(20),
  },
  label: {
    fontSize: ms(14),
    color: COLORS.ICONS,
    fontWeight: '600',
    marginBottom: ms(5),
  },
  input: {
    borderBottomWidth: 1.5,
    borderColor: COLORS.GRAY,
    paddingVertical: ms(8),
    fontSize: ms(16),
    color: COLORS.BLACK,
    marginBottom: ms(20),
    width: '100%',
    borderRadius: ms(12),
    paddingHorizontal: ms(10),
  },
  value: {
    fontSize: ms(16),
    color: COLORS.BLACK,
    fontWeight: '600',
    marginBottom: ms(20),
  },
  saveButton: {
    marginTop: ms(25),
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: ms(14),
    borderRadius: ms(12),
    alignItems: 'center',
    marginBottom: ms(10),
  },
  saveButtonText: {
    color: COLORS.WHITE,
    fontSize: ms(16),
    fontWeight: '600',
  },
});
