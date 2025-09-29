import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Switch, FlatList } from 'react-native';
import { Typography, Icon } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import { AppWrapper } from 'components/common/AppWapper';

const menuItems = [
  { id: '1', label: 'My Account', icon: 'user', lib: 'FontAwesome' },
  { id: '2', label: 'My Bookings', icon: 'calendar', lib: 'Feather' },
  { id: '3', label: 'Gallery', icon: 'image', lib: 'Feather' },
  { id: '4', label: 'Testimonials', icon: 'star', lib: 'AntDesign' },
  { id: '5', label: 'Change Password', icon: 'star', lib: 'AntDesign' },
  { id: '6', label: 'My Address', icon: 'star', lib: 'AntDesign' },
  { id: '7', label: 'Help and Support', icon: 'star', lib: 'AntDesign' },
  { id: '8', label: 'Terms & Conditions', icon: 'star', lib: 'AntDesign' },
];

const MenuScreen = () => {
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
          <View style={styles.pointsCard}>
            <Typography style={styles.pointsLabel}>Visit Points</Typography>
            <Typography style={styles.pointsValue}>850 Pts</Typography>
            <Typography style={styles.pointsSub}>($850.00)</Typography>
          </View>
          <View style={styles.pointsCard}>
            <Typography style={styles.pointsLabel}>Referral Points</Typography>
            <Typography style={styles.pointsValue}>100 Pts</Typography>
            <Typography style={styles.pointsSub}>($100.00)</Typography>
          </View>
        </View>

        {/* Dark Mode Toggle */}
        <View style={styles.darkModeRow}>
          <Icon componentName='Feather' iconName='moon' size={18} color={COLORS.GRAY} />
          <Typography style={styles.darkModeText}>Dark Mode</Typography>
          <Switch value={false} onValueChange={() => {}} />
        </View>

        {/* Menu Items */}
        <FlatList
          data={menuItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
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
    width: ms(50),
    height: ms(50),
    borderRadius: ms(25),
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
    marginVertical: ms(20),
  },
  darkModeText: {
    flex: 1,
    marginLeft: ms(8),
    fontSize: ms(13),
    color: COLORS.BLACK,
  },
});
