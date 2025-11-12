import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  TouchableOpacity,
  FlatList,
  Appearance,
  Modal,
} from 'react-native';
import { Typography, Icon } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import { AppWrapper } from 'components/common/AppWapper';
import { CustomToggle } from 'components/appComponents/CustomToggle';
import { SCREENS } from 'constants/routes';
import { navigate } from 'navigation/index';
import { DarkTheme, LightTheme } from 'theme/CommonTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from 'types/reduxTypes';
import { setIsUserLoggedIn } from 'store/slices/appSettings';
import { setUserDetails } from 'store/slices/user';
import { clearAllStorageItems } from 'utils/storage';
import { ThemeContext } from 'theme/ThemeContext';

const menuItems = [
  {
    id: '1',
    label: 'My Account',
    icon: require('../../assets/images/common/menu_user.png'),
    navigate: SCREENS.EDIT_PROFILE,
  },
  {
    id: '2',
    label: 'My Bookings',
    icon: require('../../assets/images/common/menu_history.png'),
    navigate: SCREENS.MyBooking,
  },
  {
    id: '3',
    label: 'Gallery',
    icon: require('../../assets/images/common/menu_history.png'),
    navigate: SCREENS.MyPetProfile,
  },
  {
    id: '4',
    label: 'Referral Program',
    icon: require('../../assets/images/common/menu_history.png'),
    navigate: SCREENS.ReferralProgram,
  },
  {
    id: '5',
    label: 'Change Password',
    icon: require('../../assets/images/common/menu_locked.png'),
    navigate: SCREENS.CHANGE_PASSWORD,
  },
  {
    id: '6',
    label: 'My Address',
    icon: require('../../assets/images/common/menu_location.png'),
    navigate: SCREENS.AddAddress,
  },
  {
    id: '7',
    label: 'Help and Support',
    icon: require('../../assets/images/common/menu_support.png'),
    navigate: SCREENS.HelpAndSupport,
  },
  {
    id: '8',
    label: 'Terms & Conditions',
    icon: require('../../assets/images/common/menu_policy.png'),
    navigate: SCREENS.TermsAndConditions,
  },
   {
    id: '9',
    label: 'Privacy Policy',
    icon: require('../../assets/images/common/menu_policy.png'),
    navigate: SCREENS.PRIVACY_POLICY,
  },
  {
    id: '10',
    label: 'Logout',
    icon: require('../../assets/images/common/menu_policy.png'),
    action: 'logout',
  },
];

const MenuScreen = () => {
  const dispatch = useAppDispatch();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [fadeAnim] = useState(new Animated.Value(0));
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

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
    clearAllStorageItems();
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (item.action === 'logout') {
          openLogoutModal();
        } else if (item.navigate) {
          navigate(item.navigate);
        }
      }}
      style={styles.menuItem}
    >
      <View style={styles.menuLeft}>
        <Image source={item.icon} resizeMode='contain' style={styles.menuIcon} />
        <Typography
          style={[
            styles.menuLabel,
            {
              color: theme.colors.text,
            },
          ]}
        >
          {item.label}
        </Typography>
      </View>
      <Icon componentName='Feather' iconName='chevron-right' size={18} color={COLORS.GRAY} />
    </TouchableOpacity>
  );

  return (
    <AppWrapper title='Menu'>
      <View style={styles.container}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg',
            }}
            style={styles.profileImage}
          />
          <View>
            <Typography style={styles.name}>William Anderson</Typography>
            <View style={styles.freeBadge}>
              <Typography style={styles.freeText}>Free</Typography>
            </View>
          </View>
        </View>

        {/* Points Section */}
        <View style={styles.pointsRow}>
          <TouchableOpacity onPress={() => navigate(SCREENS.WALLET)} style={styles.pointsCard}>
            <Typography style={styles.pointsLabel}>Visit Points</Typography>
            <Typography style={styles.pointsValue}>850 Pts</Typography>
            <Typography style={styles.pointsSub}>($850.00)</Typography>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate(SCREENS.WALLET)} style={styles.pointsCard}>
            <Typography style={styles.pointsLabel}>Referral Points</Typography>
            <Typography style={styles.pointsValue}>100 Pts</Typography>
            <Typography style={styles.pointsSub}>($100.00)</Typography>
          </TouchableOpacity>
        </View>

        {/* Dark Mode Toggle */}
        <View style={styles.darkModeRow}>
          <Image
            source={require('../../assets/images/common/menu_darkmode.png')}
            resizeMode='contain'
            style={styles.menuIcon}
          />
          <Typography style={[styles.darkModeText,{
            color:theme.colors.text,
          }]}>Dark Mode</Typography>
          <CustomToggle value={isDarkMode} onValueChange={()=>{}} />
          
          {/* <CustomToggle value={isDarkMode} onValueChange={toggleTheme} /> */}
        </View>

        {/* Menu List */}
        <FlatList
          data={menuItems}
          keyExtractor={item => item.id}
          renderItem={renderMenuItem}
          showsVerticalScrollIndicator={false}
        />

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
      </View>
    </AppWrapper>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(16),
    paddingBottom: 20,
  },
  profileCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(12),
    padding: ms(12),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(16),
    elevation: 2,
  },
  profileImage: {
    width: ms(70),
    height: ms(70),
    borderRadius: 100,
    marginRight: ms(12),
  },
  name: {
    fontSize: ms(14),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  freeBadge: {
    backgroundColor: '#EBFFFF',
    width: ms(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  freeText: {
    fontSize: ms(12),
    color: COLORS.PRIMARY,
  },
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: ms(16),
  },
  pointsCard: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(12),
    padding: ms(12),
    height: ms(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: ms(6),
    elevation: 2,
  },
  pointsLabel: {
    fontSize: ms(12),
    color: COLORS.BLACK,
  },
  pointsValue: {
    fontSize: ms(18),
    fontWeight: '700',
    color: COLORS.PRIMARY,
  },
  pointsSub: {
    fontSize: ms(11),
    marginTop: ms(4),
    color: COLORS.BLACK,
  },
  darkModeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ms(20),
    borderBottomWidth: 0.5,
    paddingVertical: ms(12),
    paddingHorizontal: 10,
    borderBottomColor: '#E0E0E0',
  },
  darkModeText: {
    flex: 1,
    marginLeft: ms(8),
    fontSize: ms(13),
    color: COLORS.BLACK,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: ms(12),
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: ms(40),
    height: ms(40),
  },
  menuLabel: {
    fontSize: ms(13),
    marginLeft: ms(8),
    color: COLORS.BLACK,
  },
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
    color: COLORS.GRAY,
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
