import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
} from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Icon, Typography } from 'components/index';
import { ms, mvs } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';
import * as Animatable from 'react-native-animatable';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Calendar } from 'react-native-calendars';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';

const { width } = Dimensions.get('window');

const servicesData = [
  {
    id: '1',
    title: 'Groomer',
    isSelected: true,
    icon: require('../../assets/icons/services/Groomer.png'),
  },
  { id: '2', title: 'Training', icon: require('../../assets/icons/services/Training.png') },
  { id: '3', title: 'Sitting', icon: require('../../assets/icons/services/Training.png') },
  { id: '4', title: 'Dermatology', icon: require('../../assets/icons/services/Groomer.png') },
  { id: '5', title: 'Walking', icon: require('../../assets/icons/services/Training.png') },
  { id: '6', title: 'Vets', icon: require('../../assets/icons/services/Vets.png') },
  { id: '7', title: 'Nutrition', icon: require('../../assets/icons/services/Nutrition.png') },
];

const allowedDates = ['2025-10-07', '2025-10-09', '2025-10-12', '2025-10-15', '2025-10-20'];

const BookService = () => {
  const [selectedPet, setSelectedPet] = useState(0);
  const [selectedTime, setSelectedTime] = useState('08:00 AM');
  const [selectedDate, setSelectedDate] = useState('');
  const [tip, setTip] = useState(true);
  const [redeemHalf, setRedeemHalf] = useState(true);
  const [redeemAll, setRedeemAll] = useState(false);

  const pets = [
    {
      name: 'Persian Charlie',
      gender: 'Male',
      age: '1 yr 2 m',
      weight: '2.5 KG',
      image: 'https://d3544la1u8djza.cloudfront.net/APHI/Blog/2023/September/small-breeds-hero.jpg',
    },
    {
      name: 'Oliver Derry',
      gender: 'Male',
      age: '1 yr 1 m',
      weight: '1.9 KG',
      image: 'https://www.vosd.in/wp-content/uploads/2025/03/BLOG-POSTS-Lifestyle-6.webp',
    },
  ];

  const times = ['08:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'];

  // ✅ prepare marked dates
  const markedDates = allowedDates.reduce((acc, date) => {
    acc[date] = { disabled: false, disableTouchEvent: false };
    return acc;
  }, {});
  if (selectedDate) markedDates[selectedDate] = { selected: true, selectedColor: COLORS.PRIMARY };

  const renderCheckbox = (checked, onPress) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.checkbox, { backgroundColor: checked ? COLORS.PRIMARY : 'transparent' }]}
    >
      {checked && (
        <Icon componentName='FontAwesome' iconName='check' size={14} color={COLORS.WHITE} />
      )}
    </TouchableOpacity>
  );

  return (
    <AppWrapper title='Book Dog Grooming'>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* 🐾 Select Pet */}
        <Typography type='subtitle' style={[styles.sectionTitle, { marginTop: 0 }]}>
          Select Pet
        </Typography>

        <View style={styles.petsRow}>
          {pets.map((pet, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => setSelectedPet(index)}
              style={[styles.petCard, selectedPet === index && { borderColor: COLORS.PRIMARY }]}
            >
              <Image source={{ uri: pet.image }} style={styles.petImage} />
              <Typography style={styles.petName}>{pet.name}</Typography>

              <View style={styles.petInfoRow}>
                <Typography
                  style={[styles.petTag, { backgroundColor: '#fcece9', color: '#f48177' }]}
                >
                  {pet.gender}
                </Typography>
                <Typography
                  style={[styles.petTag, { backgroundColor: '#fcf7ec', color: '#f7b55c' }]}
                >
                  {pet.age}
                </Typography>
                <Typography
                  style={[styles.petTag, { backgroundColor: '#eaffff', color: '#4dcbd5' }]}
                >
                  {pet.weight}
                </Typography>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 🧴 Select Service */}
        <Typography type='subtitle' style={styles.sectionTitle}>
          Select Service
        </Typography>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={servicesData}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.serviceList}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.8}>
              {item.isSelected && (
                <View style={styles.selectedIcon}>
                  <Icon
                    componentName='Ionicons'
                    iconName='checkmark-circle'
                    color={COLORS.WHITE}
                    size={22}
                  />
                </View>
              )}
              <Animated.View
                entering={FadeInDown.delay(item.id * 80).springify()}
                style={styles.serviceItem}
              >
                <View
                  style={[
                    styles.iconWrapper,
                    { backgroundColor: item.isSelected ? COLORS.PRIMARY : '#F4F4F4' },
                  ]}
                >
                  <Image
                    source={item.icon}
                    resizeMode='contain'
                    style={[
                      styles.serviceIconStyle,
                      { tintColor: item.isSelected ? COLORS.WHITE : COLORS.SECONDARY },
                    ]}
                  />
                </View>
                <Typography style={styles.serviceText}>{item.title}</Typography>
              </Animated.View>
            </TouchableOpacity>
          )}
        />

        {/* 📅 Calendar */}
        <Typography type='subtitle' style={styles.sectionTitle}>
          Select Date
        </Typography>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={day =>
              allowedDates.includes(day.dateString) && setSelectedDate(day.dateString)
            }
            markedDates={markedDates}
            disableAllTouchEventsForDisabledDays
            theme={{
              selectedDayBackgroundColor: COLORS.PRIMARY,
              todayTextColor: COLORS.PRIMARY,
              arrowColor: COLORS.PRIMARY,
              textDayFontSize: 14,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 12,
              disabledDayTextColor: '#d3d3d3',
            }}
            dayComponent={({ date }) => (
              <View style={styles.dayWrapper}>
                <Typography
                  style={{
                    backgroundColor:
                      selectedDate === date.dateString ? COLORS.PRIMARY : 'transparent',
                    color: selectedDate === date.dateString ? COLORS.WHITE : COLORS.BLACK,
                    opacity: allowedDates.includes(date.dateString) ? 1 : 0.3,
                    padding: 6,
                    borderRadius: 20,
                    fontWeight: selectedDate === date.dateString ? '700' : '400',
                    textAlign: 'center',
                    fontSize: 13,
                    width: 30,
                  }}
                >
                  {date.day}
                </Typography>
              </View>
            )}
          />
        </View>

        {/* ⏰ Time */}
        <Typography type='subtitle' style={styles.sectionTitle}>
          Start Time
        </Typography>
        <View style={styles.timeRow}>
          {times.map((t, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.timeButton, selectedTime === t && styles.timeButtonActive]}
              onPress={() => setSelectedTime(t)}
            >
              <Typography style={[styles.timeText, selectedTime === t && styles.timeTextActive]}>
                {t}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>

        {/* 📍 Location */}
        <Typography
          type='subtitle'
          style={[
            styles.sectionTitle,
            {
              marginTop: -20,
            },
          ]}
        >
          Location
        </Typography>
        <TouchableOpacity style={styles.locationCard} activeOpacity={0.8}>
          <View style={styles.mapIconWrapper}>
            <Icon
              componentName='Ionicons'
              iconName='map-outline'
              size={22}
              color={COLORS.PRIMARY}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Typography style={styles.locationLabel}>Add Address</Typography>
            <Typography style={styles.locationSubText}>Tap to select location on map</Typography>
          </View>
          <View style={styles.editIconWrapper}>
            <Icon
              componentName='Ionicons'
              iconName='create-outline'
              size={16}
              color={COLORS.PRIMARY}
            />
          </View>
        </TouchableOpacity>

        {/* ✅ Add-on Services */}
        <Typography type='subtitle' style={styles.sectionTitle}>
         Tip for Services
        </Typography>
        <View style={styles.optionRow}>
          <View style={styles.optionLeft}>
            {renderCheckbox(tip, () => setTip(!tip))}
            <Typography style={styles.optionLabel}>Give Tip to Groomer</Typography>
          </View>
          <Typography style={styles.optionValue}>10$</Typography>
        </View>

        {/* 💰 Redeem Points */}
        <Typography type='subtitle' style={styles.sectionTitle}>
          Redeem Points
        </Typography>
        <View style={styles.optionRow}>
          <View style={styles.optionLeft}>
            {renderCheckbox(redeemHalf, () => setRedeemHalf(!redeemHalf))}
            <Typography style={styles.optionLabel}>Use 50% of</Typography>
          </View>
          <Typography style={styles.optionValue}>-10$</Typography>
        </View>

        <View style={styles.optionRow}>
          <View style={styles.optionLeft}>
            {renderCheckbox(redeemAll, () => setRedeemAll(!redeemAll))}
            <Typography style={styles.optionLabel}>Use all points</Typography>
          </View>
          <Typography style={styles.optionValue}>0$</Typography>
        </View>

        {/* 📝 Additional Request */}
        <Typography type='subtitle' style={[styles.sectionTitle, { marginBottom: 10 }]}>
          Any Additional Request
        </Typography>
        <TextInput
          placeholder='Type here'
          placeholderTextColor='#aaa'
          style={styles.textInput}
          multiline
        />

        {/* 💳 Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Typography style={styles.summaryLabel}>Total Amount</Typography>
            <Typography style={styles.summaryValue}>$450</Typography>
          </View>
          <View style={styles.summaryRow}>
            <Typography style={styles.summaryLabel}>Time of Booking 10%</Typography>
            <Typography style={styles.summaryValue}>$45</Typography>
          </View>
          <View style={styles.summaryRow}>
            <Typography style={styles.summaryLabel}>At the Time of Service</Typography>
            <Typography style={styles.summaryValue}>$405</Typography>
          </View>
          <View style={styles.dottedBorder} />
          <View style={styles.summaryRow}>
            <Typography style={[styles.summaryLabel, { fontWeight: '700' }]}>Total</Typography>
            <Typography style={styles.totalPrice}>$45.00</Typography>
          </View>
        </View>

        {/* 📲 Book Button */}
        <Animatable.View animation='pulse' iterationCount='infinite'>
          <TouchableOpacity onPress={() => navigate(SCREENS.CheckoutScreen)} style={styles.button}>
            <Typography style={styles.buttonText}>Book Service</Typography>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </AppWrapper>
  );
};

export default BookService;

const styles = StyleSheet.create({
  container: { paddingBottom: ms(70), backgroundColor: COLORS.WHITE },
  sectionTitle: { marginLeft: ms(10), marginTop: mvs(15), fontWeight: 'bold', fontSize: ms(16) },

  /** PET CARD **/
  petsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: mvs(10) },
  petCard: {
    borderWidth: 1,
    borderColor: COLORS.SILVER,
    borderRadius: 10,
    padding: ms(10),
    width: width / 2.1,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    marginRight: 10,
  },
  petImage: { width: ms(140), height: ms(120), borderRadius: 8, marginBottom: 5 },
  petName: { fontWeight: '600', fontSize: ms(12), marginBottom: 4 },
  petInfoRow: { flexDirection: 'row', justifyContent: 'space-between', width: '80%' },
  petTag: {
    fontSize: 9,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    overflow: 'hidden',
  },

  /** SERVICES **/
  serviceList: { paddingHorizontal: ms(10), marginVertical: 10 },
  serviceItem: { alignItems: 'center', marginHorizontal: 8 },
  iconWrapper: {
    width: ms(60),
    height: ms(60),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  serviceIconStyle: { width: ms(28), height: ms(28) },
  serviceText: { fontSize: ms(10), color: COLORS.BLACK },
  selectedIcon: { position: 'absolute', top: 0, right: 10, zIndex: 999 },

  /** CALENDAR **/
  calendarContainer: {
    marginHorizontal: ms(15),
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    backgroundColor: COLORS.WHITE,
  },

  /** TIME **/
  timeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginVertical: mvs(20),
  },
  timeButton: {
    borderWidth: 1,
    borderColor: COLORS.SILVER,
    borderRadius: 8,
    paddingVertical: ms(8),
    marginHorizontal: ms(5),
    paddingHorizontal: ms(18),
    marginVertical: 5,
  },
  timeButtonActive: { backgroundColor: COLORS.PRIMARY, borderColor: COLORS.PRIMARY },
  timeText: { color: COLORS.BLACK, fontSize: ms(12) },
  timeTextActive: { color: COLORS.WHITE },

  /** LOCATION **/
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FEFF',
    borderWidth: 1,
    borderColor: '#B2EBF2',
    borderRadius: 12,
    marginHorizontal: ms(20),
    padding: ms(12),
    marginTop: ms(10),
    elevation: 1,
  },
  mapIconWrapper: {
    width: ms(38),
    height: ms(38),
    borderRadius: 10,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ms(10),
  },
  locationLabel: { fontWeight: '600', fontSize: ms(13), color: COLORS.PRIMARY },
  locationSubText: { fontSize: ms(10), color: COLORS.GRAY, marginTop: 2 },
  editIconWrapper: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    width: ms(26),
    height: ms(26),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /** OPTIONS **/
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: ms(20),
    marginVertical: 8,
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center' },
  optionLabel: { marginLeft: 8, fontSize: ms(12), color: COLORS.BLACK },
  optionValue: {
    borderWidth: 1,
    borderColor: '#00B3C3',
    backgroundColor: '#F2FFFF',
    width: ms(50),
    height: ms(20),
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    color: COLORS.PRIMARY,
    textAlign: 'center',
    fontSize: ms(12),
  },
  checkbox: {
    width: ms(18),
    height: ms(18),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /** SUMMARY **/
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.SILVER,
    borderRadius: 10,
    marginHorizontal: ms(20),
    height: ms(80),
    padding: ms(10),
    fontSize: ms(12),
    color: COLORS.BLACK,
    textAlignVertical: 'top',
  },
  summaryCard: {
    backgroundColor: COLORS.WHITE,
    marginHorizontal: ms(20),
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    marginTop: 10,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  summaryLabel: { color: COLORS.BLACK, opacity: 0.6, fontSize: ms(12) },
  summaryValue: { fontWeight: '600', color: COLORS.BLACK, fontSize: ms(12) },
  dottedBorder: {
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderColor: COLORS.SILVER,
    marginVertical: 8,
  },
  totalPrice: { color: COLORS.PRIMARY, fontWeight: '700', fontSize: ms(14) },

  /** BUTTON **/
  button: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: ms(12),
    marginVertical: ms(20),
    elevation: 3,
  },
  buttonText: { color: COLORS.WHITE, fontWeight: '600', fontSize: ms(14) },
});
