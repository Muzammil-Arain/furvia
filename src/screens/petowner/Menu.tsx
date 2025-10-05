import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Typography, Icon } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import { AppWrapper } from 'components/common/AppWapper';
import { CustomToggle } from 'components/appComponents/CustomToggle';
import { SCREENS } from 'constants/routes';
import { navigate } from 'navigation/index';

const menuItems = [
  {
    id: '1',
    navigate: SCREENS.EDIT_PROFILE,
    label: 'My Account',
    icon: require('../../assets/images/common/menu_user.png'),
  },
  {
    id: '2',
    navigate: SCREENS.MyBooking,
    label: 'My Bookings',
    icon: require('../../assets/images/common/menu_history.png'),
  },
  {
    id: '3',
    navigate: SCREENS.MyPetProfile,
    label: 'Gallery',
    icon: require('../../assets/images/common/menu_history.png'),
  },
  {
    id: '3',
    navigate: SCREENS.ReferralProgram,
    label: 'Referral Program',
    icon: require('../../assets/images/common/menu_history.png'),
  },
  // { id: '4', label: 'Testimonials', icon: require('../../assets/images/common/menu_history.png') },
  {
    id: '5',
    navigate: SCREENS.CHANGE_PASSWORD,
    label: 'Change Password',
    icon: require('../../assets/images/common/menu_locked.png'),
  },
  {
    id: '6',
    navigate: SCREENS.AddAddress,
    label: 'My Address',
    icon: require('../../assets/images/common/menu_location.png'),
  },
  {
    id: '7',
    navigate: SCREENS.HelpAndSupport,
    label: 'Help and Support',
    icon: require('../../assets/images/common/menu_support.png'),
  },
  {
    id: '8',
    navigate: SCREENS.TermsAndConditions,
    label: 'Terms & Conditions',
    icon: require('../../assets/images/common/menu_policy.png'),
  },
];

const MenuScreen = () => {
  const [darkmode, setDarkMode] = useState(false);
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
            <View
              style={{
                backgroundColor: '#EBFFFF',
                width: ms(50),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
              }}
            >
              <Typography style={styles.freeText}>Free</Typography>
            </View>
          </View>
        </View>

        {/* Points Section */}
        <View style={styles.pointsRow}>
          <TouchableOpacity onPress={() => navigate(SCREENS.Wallet)} style={styles.pointsCard}>
            <Typography style={styles.pointsLabel}>Visit Points</Typography>
            <Typography style={styles.pointsValue}>850 Pts</Typography>
            <Typography style={styles.pointsSub}>($850.00)</Typography>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate(SCREENS.Wallet)} style={styles.pointsCard}>
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
            style={{
              width: ms(40),
              height: ms(40),
            }}
          />
          <Typography style={styles.darkModeText}>Dark Mode</Typography>
          {/* <Switch value={false} onValueChange={() => {}} /> */}
          <CustomToggle value={darkmode} onValueChange={setDarkMode} />
        </View>

        {/* Menu Items */}
        <FlatList
          data={menuItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                if (item.navigate) {
                  navigate(item.navigate);
                }
              }}
              style={styles.menuItem}
            >
              <View style={styles.menuLeft}>
                <Image
                  source={item.icon}
                  resizeMode='contain'
                  style={{
                    width: ms(40),
                    height: ms(40),
                  }}
                />
                <Typography style={styles.menuLabel}>{item.label}</Typography>
              </View>
              <Icon
                componentName='Feather'
                iconName='chevron-right'
                size={18}
                color={COLORS.GRAY}
              />
            </TouchableOpacity>
          )}
        />
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
  pointsValue: {
    fontSize: ms(18),
    fontWeight: '700',
    color: COLORS.PRIMARY,
  },
  pointsLabel: {
    fontSize: ms(12),
    color: COLORS.BLACK,
  },
  pointsSub: {
    fontSize: ms(11),
    marginTop: ms(4),
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
  menuLabel: {
    fontSize: ms(13),
    marginLeft: ms(8),
    color: COLORS.BLACK,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: ms(16),
    alignItems: 'center',
  },
  activeNav: {
    backgroundColor: '#E6F7FF',
    padding: ms(10),
    borderRadius: ms(12),
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
});
