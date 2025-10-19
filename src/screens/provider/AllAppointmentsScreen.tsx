import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ms } from 'react-native-size-matters';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/index';
import { COLORS } from 'utils/colors';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';

const { width } = Dimensions.get('window');

const TABS = ['All', 'Upcoming', 'Active'];

const APPOINTMENTS = [
  {
    id: '1',
    title: 'Veterinary Checkup',
    type: 'House Visit',
    date: 'Today, Sep 9 at 2:00 PM',
    address: '123 Oak Street, Springfield, IL 62701',
    status: 'Upcoming',
    pet: {
      name: 'Buddy',
      breed: 'Golden Retriever',
      age: '3 years',
      type: 'Dog',
      image:
        'https://cdn.shopify.com/s/files/1/0255/7424/4445/files/image3_480x480.jpg?v=1651129751',
    },
  },
  {
    id: '2',
    title: 'Vaccination',
    type: 'On Site',
    date: 'Tomorrow, Sep 10 at 11:30 AM',
    address: '45 Pine Street, Springfield, IL 62702',
    status: 'Active',
    pet: {
      name: 'Max',
      breed: 'Beagle',
      age: '2 years',
      type: 'Dog',
      image:
        'https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/45ed8ecf-0bb2-4e34-8fcf-624db47c43c8/Golden+Retrievers+dans+pet+care.jpeg',
    },
  },
  {
    id: '3',
    title: 'Grooming Session',
    type: 'In-Home',
    date: 'Yesterday, Sep 8 at 4:00 PM',
    address: '98 Elm Street, Springfield, IL 62703',
    status: 'Completed',
    pet: {
      name: 'Charlie',
      breed: 'Labrador',
      age: '4 years',
      type: 'Dog',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYfRejHLe2RY56RGS8lzIdaJjcm-oNuGw0Sa8FRx7XJhIh5y3FHlY0h_UuRAHGsG4Auyo&usqp=CAU',
    },
  },
];

const AllAppointmentsScreen = () => {
  const [activeTab, setActiveTab] = useState('All');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  const filteredAppointments = APPOINTMENTS.filter(item =>
    activeTab === 'All' ? true : item.status === activeTab
  );

  const animateTransition = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(40);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    animateTransition();
  }, [activeTab]);

  const renderCard = ({ item, index }) => (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.headerRow}>
        <Typography style={styles.title}>{item.title}</Typography>
        <View
          style={[
            styles.statusTag,
            {
              backgroundColor:
                item.status === 'Upcoming'
                  ? '#E19133'
                  : item.status === 'Active'
                  ? '#5B2E90'
                  : '#43A047',
            },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.iconTag}>
          <Icon name='home-outline' size={16} color='#3A9EC2' />
          <Typography style={styles.iconText}>{item.type}</Typography>
        </View>
        <View style={[styles.iconTag, { backgroundColor: '#E5D4F9' }]}>
          <Icon name='calendar-outline' size={16} color='#6A1B9A' />
          <Typography style={[styles.iconText, { color: '#6A1B9A' }]}>{item.date}</Typography>
        </View>
      </View>

      <View style={styles.locationRow}>
        <Icon name='map-marker-outline' size={18} color='#43A047' />
        <Typography style={styles.locationText}>{item.address}</Typography>
      </View>

      <View style={styles.separator} />

      <View style={styles.petRow}>
        <Image source={{ uri: item.pet.image }} style={styles.petImage} />
        <View>
          <Text style={styles.petName}>
            {item.pet.name}{' '}
            <Typography style={styles.petType}>({item.pet.type})</Typography>
          </Text>
          <Text style={styles.petDetails}>
            {item.pet.breed} • {item.pet.age}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigate(SCREENS.AppointmentDetailsScreen)} style={styles.detailButton} activeOpacity={0.8}>
        <Typography style={styles.detailButtonText}>View Details</Typography>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <AppWrapper title='All Appointments'>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Typography style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>

      {/* Animated FlatList */}
      <Animated.FlatList
        data={filteredAppointments}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: ms(50) }}
        showsVerticalScrollIndicator={false}
      />
    </AppWrapper>
  );
};

export default AllAppointmentsScreen;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginHorizontal: ms(15),
    borderRadius: 12,
    padding: ms(5),
    elevation: 2,
    marginBottom: ms(10),
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: ms(38),
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#5B2E90',
  },
  tabText: {
    color: '#9E9E9E',
    fontSize: ms(13),
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: ms(15),
    marginVertical: ms(8),
    padding: ms(15),
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: ms(15),
    color: '#212121',
  },
  statusTag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: ms(10),
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  iconTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1F3F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  iconText: {
    marginLeft: 4,
    color: '#3A9EC2',
    fontSize: ms(11),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  locationText: {
    color: '#43A047',
    marginLeft: 5,
    fontSize: ms(11),
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  petRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  petImage: {
    width: ms(45),
    height: ms(45),
    borderRadius: 10,
    marginRight: 10,
  },
  petName: {
    fontWeight: '700',
    fontSize: ms(14),
    color: '#212121',
  },
  petType: {
    color: '#999',
    fontSize: 12,
  },
  petDetails: {
    color: '#666',
    fontSize: ms(12),
  },
  detailButton: {
    marginTop: 12,
    borderWidth: 1.5,
    borderColor: '#5B2E90',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#5B2E90',
    fontWeight: '600',
    fontSize: ms(13),
  },
});