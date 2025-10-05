import React from 'react';
import { FlatList, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Icon, Typography } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';

const trainersData = [
  {
    id: '1',
    name: 'Name Here',
    role: 'Pet Care Taker',
    rating: 4.8,
    reviews: 342,
    availableDays: 'Mon-Fri',
    time: '9AM–6PM',
    price: 9.99,
    verified: true,
    image:
      'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80',
  },
  {
    id: '2',
    name: 'Name Here',
    role: 'Pet Care Taker',
    rating: 4.8,
    reviews: 342,
    availableDays: 'Mon-Fri',
    time: '9AM–6PM',
    price: 9.99,
    verified: false,
    image:
      'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80',
  },
];

const TrainersScreen = () => {
  const renderCard = ({ item }: any) => (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.row}>
        {/* Profile Image */}
        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.GREEN,
            padding: 5,
            borderRadius: 5,
          }}
        >
          <Image source={{ uri: item.image }} style={styles.profileImage} />
        </View>
        {item.verified && (
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: ms(50),
            }}
          >
            <Icon
              componentName='MaterialIcons'
              iconName='verified'
              size={ms(22)}
              color={COLORS.GREEN}
            />
          </View>
        )}
        {/* Info Section */}
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <Typography style={styles.name}>{item.name}</Typography>
          </View>
          <Typography style={styles.role}>{item.role}</Typography>

          {/* Rating */}
          <View style={styles.row}>
            <Icon componentName='AntDesign' iconName='star' size={14} color='#FFBB63' />
            <Typography style={styles.rating}>{item.rating}</Typography>
            <Typography style={styles.ratingview}>({item.reviews} Reviews)</Typography>
          </View>

          {/* Location */}
          <View style={styles.row}>
            <Icon componentName='EvilIcons' iconName='location' size={16} color={COLORS.GREEN} />
            <Typography style={styles.location}>Location</Typography>
          </View>
        </View>

        {/* Availability */}
        <View style={styles.availabilityBox}>
          <View style={[styles.availabilityItem, { backgroundColor: '#EFF7FF' }]}>
            <Icon componentName='FontAwesome' iconName='calendar' size={14} color={COLORS.BLUE} />
            <Typography style={styles.availabilityText}>{item.availableDays}</Typography>
          </View>
          <View style={[styles.availabilityItem, { backgroundColor: '#FCF7EC' }]}>
            <Icon componentName='Feather' iconName='clock' size={14} color={COLORS.ORANGE} />
            <Typography style={styles.timeText}>{item.time}</Typography>
          </View>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => navigate(SCREENS.TrainerDetails)}
          style={styles.appointmentBtn}
        >
          <Typography style={styles.appointmentText}>Start Appointment | ${item.price}</Typography>
        </TouchableOpacity>

        <TouchableOpacity style={styles.messageBtn}>
          <Icon componentName='Feather' iconName='lock' size={14} color={COLORS.RED} />
          <Typography style={styles.messageText}>Messages</Typography>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <AppWrapper title='All Trainers'>
      <FlatList
        data={trainersData}
        keyExtractor={item => item.id}
        renderItem={renderCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </AppWrapper>
  );
};

export default TrainersScreen;

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: ms(20),
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(12),
    padding: ms(12),
    marginVertical: ms(8),
    marginHorizontal: ms(12),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: ms(60),
    height: ms(60),
    borderRadius: ms(4),
  },
  infoContainer: {
    flex: 1,
    marginLeft: ms(10),
  },
  name: {
    fontSize: ms(14),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  verifiedIcon: {
    marginLeft: ms(4),
  },
  role: {
    fontSize: ms(12),
    color: COLORS.GRAY,
    marginBottom: ms(4),
  },
  rating: {
    fontSize: ms(12),
    color: COLORS.GRAY,
    marginLeft: ms(4),
  },
  ratingview: {
    fontSize: ms(12),
    color: '#FFBB63',
    marginLeft: ms(4),
    textDecorationLine: 'underline',
  },
  location: {
    fontSize: ms(12),
    color: COLORS.GRAY,
    marginLeft: ms(4),
  },
  availabilityBox: {
    justifyContent: 'space-between',
    marginLeft: ms(6),
  },
  availabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: ms(6),
    paddingHorizontal: ms(6),
    paddingVertical: ms(3),
    marginBottom: ms(6),
  },
  availabilityText: {
    fontSize: ms(11),
    fontWeight: '500',
    color: COLORS.BLACK,
    marginLeft: ms(4),
  },
  timeText: {
    fontSize: ms(11),
    color: COLORS.GRAY,
    marginLeft: ms(4),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(12),
  },
  appointmentBtn: {
    flex: 1,
    backgroundColor: COLORS.DARK_PURPLE,
    borderRadius: ms(8),
    paddingVertical: ms(10),
    alignItems: 'center',
    marginRight: ms(8),
  },
  appointmentText: {
    color: COLORS.WHITE,
    fontSize: ms(12),
    fontWeight: '600',
  },
  messageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    borderRadius: ms(8),
    paddingHorizontal: ms(12),
    justifyContent: 'center',
  },
  messageText: {
    marginLeft: ms(6),
    fontSize: ms(13),
    fontWeight: '500',
    color: COLORS.RED,
  },
});
