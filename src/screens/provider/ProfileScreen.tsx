import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';
import { useAppDispatch } from 'types/reduxTypes';
import { setIsUserLoggedIn } from 'store/slices/appSettings';
import { setUserDetails } from 'store/slices/user';
import { clearAllStorageItems } from 'utils/storage';

const IMAGE_URL = 'https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [fadeAnim] = useState(new Animated.Value(0));

  const openLogoutModal = () => {
    setLogoutModalVisible(true);
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const closeLogoutModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 0.8, useNativeDriver: true }),
    ]).start(() => setLogoutModalVisible(false));
  };

  const handleLogout = () => {
    closeLogoutModal();
    dispatch(setIsUserLoggedIn(false));
    dispatch(setUserDetails(null));
    // if (isDelete) {
    //   deleteAccount({});
    // } else {
    //   logout({ device_udid: 'ewe' });
    // }
    clearAllStorageItems();
    // TODO: Add your logout logic here (Firebase auth / AsyncStorage clear etc.)
  };

  const menuOptions = [
    {
      id: 1,
      title: 'Profile Details',
      icon: require('../../assets/icons/profile.png'),
      onPress: () => navigate(SCREENS.ProfileDetailsScreen),
    },
    {
      id: 2,
      title: 'Notification',
      icon: require('../../assets/icons/notification.png'),
      onPress: () => navigate(SCREENS.NotificationScreen),
    },
    {
      id: 3,
      title: 'Help',
      icon: require('../../assets/icons/help.png'),
      onPress: () => navigate(SCREENS.HelpAndSupport),
    },
    {
      id: 4,
      title: 'Logout',
      icon: require('../../assets/icons/logout.png'),
      onPress: openLogoutModal,
      isLogout: true,
    },
  ];

  return (
    <AppWrapper title='My Profile'>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileSection}>
          <Image source={{ uri: IMAGE_URL }} style={styles.profileImage} />
          <Typography style={styles.userName}>Dr. Hughie Watson</Typography>
          <Typography style={styles.userEmail}>dr.thompson@petwellness.com</Typography>
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          {menuOptions.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={item.onPress}
              style={[styles.menuCard, item.isLogout && { backgroundColor: '#FFF5F5' }]}
            >
              <View style={styles.iconTitleRow}>
                <Image source={item.icon} resizeMode='contain' style={styles.menuIcon} />
                <Typography style={[styles.menuText, item.isLogout && { color: COLORS.RED }]}>
                  {item.title}
                </Typography>
              </View>
              <Ionicons
                name='chevron-forward'
                size={14}
                color={item.isLogout ? COLORS.RED : COLORS.GRAY_500}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Logout Modal */}
      <Modal transparent visible={logoutModalVisible} animationType='none'>
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContainer,
              { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/128/4400/4400828.png' }}
              style={styles.logoutIcon}
            />
            <Typography style={styles.modalTitle}>Logout</Typography>
            <Typography style={styles.modalMessage}>Are you sure you want to log out?</Typography>

            <View style={styles.modalButtons}>
              <Pressable style={[styles.button, styles.cancelButton]} onPress={closeLogoutModal}>
                <Typography style={styles.cancelText}>Cancel</Typography>
              </Pressable>
              <Pressable style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
                <Typography style={styles.logoutText}>Logout</Typography>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </AppWrapper>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(20),
    paddingTop: ms(30),
    paddingBottom: ms(40),
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: ms(35),
  },
  profileImage: {
    width: ms(100),
    height: ms(100),
    borderRadius: ms(50),
    marginBottom: ms(12),
  },
  userName: {
    fontSize: ms(17),
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
  },
  userEmail: {
    fontSize: ms(12),
    color: '#666',
  },
  menuContainer: {
    gap: ms(14),
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(12),
    paddingVertical: ms(7),
    paddingHorizontal: ms(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  iconTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuIcon: {
    width: ms(40),
    height: ms(40),
  },
  menuText: {
    fontSize: ms(14),
    color: COLORS.BLACK,
    fontWeight: '500',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000070',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    width: '80%',
    padding: ms(20),
    alignItems: 'center',
    elevation: 6,
  },
  logoutIcon: {
    width: ms(60),
    height: ms(60),
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: ms(18),
    fontWeight: '700',
    color: COLORS.BLACK,
  },
  modalMessage: {
    fontSize: ms(12),
    color: COLORS.GRAY_600,
    textAlign: 'center',
    marginVertical: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E5E5E5',
  },
  logoutButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  cancelText: {
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  logoutText: {
    color: COLORS.WHITE,
    fontWeight: '600',
  },
});
