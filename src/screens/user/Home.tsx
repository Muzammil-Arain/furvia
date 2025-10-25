import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { Icon, Typography } from 'components/index';
import { ms, vs } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from 'types/index';
import { COLORS, getCurrentLocation, getCurrentWithLocation } from 'utils/index';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';
import { servicesData } from 'api/data';
import { PLACEHOLDER_PROFILE_PICTURE } from 'constants/assets';

const pets = [
  {
    id: '1',
    name: 'Persian Charlie',
    gender: 'Male',
    age: '1 yr 3 m',
    weight: '2.5 P',
    image: require('../../assets/images/pet2.png'),
    bgColor: '#E5F9FF',
  },
  {
    id: '2',
    name: 'Oliver Derry',
    gender: 'Male',
    age: '1 yr 1 m',
    weight: '1.8 P',
    image: require('../../assets/images/pet3.png'),
    bgColor: '#FFEFF5',
  },
];

const doctors = [
  {
    id: '1',
    name: 'Nina Wu',
    specialty: 'Pet Care',
    rating: 4.5,
    price: 23,
    available: true,
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg',
  },
  {
    id: '2',
    name: 'Sophie Lin',
    specialty: 'Petcare',
    rating: 4.5,
    price: 54,
    available: false,
    image:
      'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?semt=ais_incoming&w=740&q=80',
  },
];

export const Home = () => {
  const { userDetails } = useAppSelector(state => state?.user);
  console.log('🚀 ~ Home ~ userDetails:', userDetails);

  const [location, setLocation] = useState({});
  console.log('🚀 ~ Home ~ location:', location);

  // Animation Refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  const handleGetPermission = async () => {
    const getLocation = await getCurrentWithLocation();
    setLocation(getLocation);
  };

  useEffect(() => {
    handleGetPermission();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Press Animation for Cards
  const ScaleTouchable = ({ children }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
      Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity activeOpacity={0.8} onPressIn={onPressIn} onPressOut={onPressOut}>
          {children}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const PetCard = ({ pet }) => (
    <ScaleTouchable>
      <View style={styles.petCardWrapper}>
        <View style={[styles.imageContainer, { backgroundColor: pet.bgColor }]}>
          <Image source={pet.image} style={styles.petImage} resizeMode='contain' />
        </View>
        <Text style={styles.petName}>{pet.name}</Text>
        <View style={styles.infoRow}>
          <Text style={[styles.tag, { backgroundColor: '#FFE5E5', color: '#FF4D4D' }]}>
            {pet.gender}
          </Text>
          <Text style={[styles.tag, { backgroundColor: '#FFF5E5', color: '#FF9900' }]}>
            {pet.age}
          </Text>
          <Text style={[styles.tag, { backgroundColor: '#E5FFF1', color: '#00B26F' }]}>
            {pet.weight}
          </Text>
        </View>
      </View>
    </ScaleTouchable>
  );

  const DoctorCard = ({ doctor }) => (
    <ScaleTouchable>
      <View style={styles.doctorCard}>
        <View style={styles.doctorHeader}>
          <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
          <View
            style={[styles.badge, { backgroundColor: doctor.available ? '#F3E8FF' : '#FFE8E8' }]}
          >
            <Text style={[styles.badgeText, { color: doctor.available ? '#6C2DBF' : '#FF4D4D' }]}>
              {doctor.available ? 'Available' : 'Not available'}
            </Text>
          </View>
        </View>

        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.specialty}>{doctor.specialty}</Text>

        <View style={styles.bottomRow}>
          <View style={styles.rating}>
            <Icon size={ms(14)} color='#FFD700' componentName='FontAwesome' iconName='star' />
            <Text style={styles.ratingText}>{doctor.rating}</Text>
          </View>
          <Text style={styles.price}>${doctor.price}</Text>
        </View>
      </View>
    </ScaleTouchable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
         <TouchableOpacity onPress={() => navigate(SCREENS.EDIT_PROFILE)}>
           <Image
            source={{
              uri: PLACEHOLDER_PROFILE_PICTURE,
            }}
            style={styles.avatar}
          />
         </TouchableOpacity>
          <View>
            <Typography style={styles.locationLabel}>Location</Typography>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                componentName='FontAwesome5'
                iconName='map-marker-alt'
                color='#2C5EA3'
                size={15}
              />
              <Typography style={styles.locationText}>{location?.city || 'California'}, {location?.countryName || 'USA'}</Typography>
            </View>
          </View>
          <Image
            style={{ width: 45, height: 45 }}
            source={require('../../assets/icons/Search.png')}
          />
        </Animated.View>

        {/* Banner */}
        <Animated.View
          style={[styles.banner, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          <View style={styles.bannerTextContainer}>
            <Typography style={styles.bannerTitle}>Smart pet care</Typography>
            <Typography style={styles.bannerSubtitle}>
              Find perfect vacation for your pet
            </Typography>
            <TouchableOpacity style={styles.bannerButton}>
              <Typography style={styles.bannerButtonText}>Book Now</Typography>
            </TouchableOpacity>
          </View>
          <Image
            resizeMode='contain'
            source={require('../../assets/images/pet.png')}
            style={styles.bannerImage}
          />
        </Animated.View>

        {/* Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography style={styles.sectionTitle}>Our Services</Typography>
            <TouchableOpacity onPress={() => navigate(SCREENS.DashboardScreen)}>
              <Typography style={styles.seeAllView}>See All</Typography>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={servicesData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigate(SCREENS.GromingService)}>
                <View style={styles.serviceCard}>
                  <View
                    style={{
                      backgroundColor: '#F3F3F3',
                      padding: 18,
                      borderRadius: 100,
                    }}
                  >
                    <Image
                      source={item.icon}
                      resizeMode='contain'
                      style={{
                        width: ms(30),
                        height: ms(30),
                      }}
                    />
                  </View>

                  <Typography style={styles.serviceText}>{item.title}</Typography>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Pets */}
        <View
          style={[
            styles.section,
            {
              marginBottom: 0,
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Typography style={styles.sectionTitle}>My Pet</Typography>
            <Typography style={styles.seeAllView}>See All</Typography>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={pets}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <PetCard pet={item} />}
          />
        </View>

        {/* Bottom Card */}
        <View style={styles.bottomCard}>
          <View style={styles.bottomCardbottomRow}>
            <Image
              source={require('../../assets/images/common/bannerdog.png')}
              resizeMode='contain'
              style={styles.bottomImage}
            />
            <View style={styles.bottomContent}>
              <Typography style={styles.bottomTitle}>Pet Care Boarding</Typography>
              <Typography style={styles.bottomSubtitle}>
                We offer long-term and short-term boarding
              </Typography>
            </View>
            <TouchableOpacity style={styles.bottomButton}>
              <Icon
                componentName='Ionicons'
                iconName='chevron-forward'
                size={20}
                color={COLORS.WHITE}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Advisors */}
        <View
          style={[
            styles.section,
            {
              marginTop: ms(20),
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Typography style={styles.sectionTitle}>Emergency Advisor</Typography>
            <Typography style={styles.seeAllView}>See All</Typography>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={doctors}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <DoctorCard doctor={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles (same as your code 👇)
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.WHITE, padding: 20 },
  container: { flex: 1 },
  scrollContent: { padding: ms(16) },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vs(30),
  },
  avatar: { width: ms(45), height: ms(45), borderRadius: ms(100), marginRight: ms(10) },
  locationLabel: { fontSize: ms(12), color: COLORS.TEXT, textAlign: 'center' },
  locationText: { fontSize: ms(14), fontWeight: 'bold', marginLeft: 5, color: COLORS.TEXT },

  banner: {
    flexDirection: 'row',
    backgroundColor: '#D1F4F6',
    borderRadius: ms(16),
    padding: ms(16),
    alignItems: 'center',
    marginBottom: vs(20),
    height: ms(150),
  },
  bannerTextContainer: { flex: 1 },
  bannerTitle: { fontSize: ms(18), fontWeight: 'bold', color: COLORS.BLACK },
  bannerSubtitle: { fontSize: ms(12), color: COLORS.TEXT, marginVertical: vs(4), width: ms(160) },
  bannerButton: {
    width: ms(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#56077E',
    paddingVertical: vs(6),
    paddingHorizontal: ms(12),
    borderRadius: ms(12),
    marginTop: vs(8),
  },
  bannerButtonText: { color: COLORS.WHITE, fontSize: ms(12) },
  bannerImage: { width: ms(150), height: ms(150) },

  section: { marginBottom: vs(20) },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: ms(16), fontWeight: '600', marginBottom: vs(10), color: COLORS.TEXT },
  seeAllView: {
    fontSize: ms(12),
    marginBottom: vs(10),
    fontWeight: '600',
    color: COLORS.SECONDARY,
  },

  serviceCard: {
    width: ms(80),
    height: ms(80),
    borderRadius: ms(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ms(12),
  },
  serviceText: { fontSize: ms(10), marginTop: vs(1), color: COLORS.TEXT },

  petCardWrapper: {
    marginBottom: 20,
    width: ms(180),
    borderRadius: ms(6),
    backgroundColor: '#fff',
    marginRight: ms(12),
    padding: ms(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 1,
  },
  imageContainer: {
    borderRadius: ms(12),
    height: ms(120),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ms(10),
  },
  petImage: { width: '80%', height: '80%' },
  petName: {
    fontSize: ms(14),
    fontWeight: '600',
    color: '#000',
    marginBottom: ms(6),
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
  },
  tag: {
    fontSize: ms(10),
    paddingVertical: ms(2),
    paddingHorizontal: ms(6),
    borderRadius: ms(6),
    marginRight: ms(4),
    marginBottom: ms(4),
  },

  doctorCard: {
    width: ms(160),
    borderRadius: ms(6),
    backgroundColor: '#f6f8fd',
    marginRight: ms(12),
    padding: ms(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 20,
  },
  doctorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  doctorImage: { width: ms(60), height: ms(60), borderRadius: ms(30) },
  badge: { paddingVertical: ms(3), paddingHorizontal: ms(10), borderRadius: ms(12) },
  badgeText: { fontSize: ms(10), fontWeight: '500' },
  doctorName: { fontSize: ms(14), fontWeight: '600', color: '#000', marginTop: ms(8) },
  specialty: { fontSize: ms(12), color: '#777', marginBottom: ms(12) },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  rating: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: ms(12), marginLeft: ms(4), color: '#444' },
  price: { fontSize: ms(14), fontWeight: '700', color: '#5A205A' },

  bottomCard: {
    backgroundColor: COLORS.LIGHT_BLUE,
    borderRadius: ms(16),
    padding: ms(16),
    marginBottom: vs(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  bottomCardbottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomImage: {
    width: ms(50),
    height: ms(50),
    marginRight: ms(12),
  },
  bottomContent: {
    flex: 1,
  },
  bottomTitle: {
    fontSize: ms(14),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: vs(4),
  },
  bottomSubtitle: {
    fontSize: ms(10),
    color: COLORS.TEXT,
  },
  bottomButton: {
    backgroundColor: COLORS.PRIMARY,
    width: ms(40),
    height: ms(40),
    borderRadius: ms(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
