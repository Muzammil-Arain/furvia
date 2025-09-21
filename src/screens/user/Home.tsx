import React, { useEffect, useRef } from 'react';
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
import { COLORS } from 'utils/index';

// Dummy Data
const services = [
  { id: '1', title: 'Groomer', icon: require('../../assets/icons/services/Groomer.png') },
  { id: '2', title: 'Walkers', icon: require('../../assets/icons/services/Walkers.png') },
  { id: '3', title: 'Trainers', icon: require('../../assets/icons/services/Walkers.png') },
  { id: '4', title: 'Vets', icon: require('../../assets/icons/services/Vets.png') },
];

const pets = [
  {
    id: '1',
    name: 'Persian Charlie',
    gender: 'Male',
    age: '1 yr 3 m',
    weight: '2.5 KG',
    image:
      'https://png.pngtree.com/png-vector/20250111/ourmid/pngtree-golden-retriever-dog-pictures-png-image_15147078.png',
    bgColor: '#E5F9FF',
  },
  {
    id: '2',
    name: 'Oliver Derry',
    gender: 'Male',
    age: '1 yr 1 m',
    weight: '1.8 KG',
    image:
      'https://png.pngtree.com/png-vector/20240808/ourmid/pngtree-happy-golden-retriever-dog-png-image_13369601.png',
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

  // Animation Refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
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
          <Image source={{ uri: pet.image }} style={styles.petImage} resizeMode='contain' />
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
          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/women/44.jpg',
            }}
            style={styles.avatar}
          />
          <View>
            <Typography style={styles.locationLabel}>Location</Typography>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                componentName='FontAwesome5'
                iconName='map-marker-alt'
                color='#2C5EA3'
                size={15}
              />
              <Typography style={styles.locationText}>California, USA</Typography>
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
            resizeMode='cover'
            source={{
              uri: 'https://png.pngtree.com/png-vector/20250111/ourmid/pngtree-golden-retriever-dog-pictures-png-image_15147078.png',
            }}
            style={styles.bannerImage}
          />
        </Animated.View>

        {/* Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography style={styles.sectionTitle}>Our Services</Typography>
            <Typography style={styles.seeAllView}>See All</Typography>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={services}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ScaleTouchable>
                <View style={styles.serviceCard}>
                  <Image
                    source={item.icon}
                    resizeMode='contain'
                    style={{
                      width: ms(60),
                      height: ms(60),
                    }}
                  />
                  <Typography style={styles.serviceText}>{item.title}</Typography>
                </View>
              </ScaleTouchable>
            )}
          />
        </View>

        {/* Pets */}
        <View style={styles.section}>
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

        {/* Banner */}
        <Image
          resizeMode='cover'
          style={{ flex: 1, marginBottom: 20 }}
          source={require('../../assets/images/common/Banner.png')}
        />

        {/* Advisors */}
        <View style={styles.section}>
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
  bannerImage: { width: ms(100), height: ms(100) },

  section: { marginBottom: vs(20) },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: ms(16), fontWeight: '600', marginBottom: vs(10), color: COLORS.TEXT },
  seeAllView: {
    fontSize: ms(14),
    marginBottom: vs(10),
    fontWeight: '500',
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
  serviceText: { fontSize: ms(12), marginTop: vs(6), color: COLORS.TEXT },

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
});
