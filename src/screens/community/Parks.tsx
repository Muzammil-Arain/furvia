import React, { useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/index';
import { ms } from 'react-native-size-matters';
import { SCREENS } from 'constants/routes';
import { navigate } from 'navigation/index';

const parks = [
  {
    id: '1',
    name: 'Paws and Play Park',
    location: 'Parker Rd. Allentown, New Mexico',
    image:
      'https://media.istockphoto.com/id/841278554/photo/beautiful-morning-light-in-public-park-with-green-grass-field.jpg?s=612x612&w=0&k=20&c=rXOM3Uq9kPbpM5IWnCAnffHOP8KKpVKCJDMuNBlTNls=',
  },
  {
    id: '2',
    name: 'PetPals Picnic Park',
    location: 'Elgin St. Celina, Delaware',
    image:
      'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?fm=jpg&q=60&w=3000',
  },
  {
    id: '3',
    name: 'Green Valley Park',
    location: 'Elgin St. Celina, Delaware',
    image:
      'https://media.istockphoto.com/id/888763532/photo/avenue-through-trees-in-a-formal-garden.jpg?s=612x612&w=0&k=20&c=_3XPCpp4e6GyDz4XErdPcjyYQ5epgUGqYGOKcAjsRcc=',
  },
];

const ParksScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();

    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderItem = ({ item, index }) => (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.card}
        onPress={() => navigate(SCREENS.ParkInfoScreen, { park: item })}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Typography style={styles.title}>{item.name}</Typography>
          <View style={styles.locationContainer}>
            <Icon name="location-outline" size={ms(15)} color="#7A42FF" />
            <Typography style={styles.locationText}>{item.location}</Typography>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <AppWrapper title="Parks">
      <FlatList
        data={parks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </AppWrapper>
  );
};

export default ParksScreen;

const styles = StyleSheet.create({
  listContainer: {
    padding: ms(15),
  },
  cardContainer: {
    marginBottom: ms(15),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: ms(12),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: ms(160),
  },
  textContainer: {
    paddingVertical: ms(10),
    paddingHorizontal: ms(12),
  },
  title: {
    fontSize: ms(15),
    fontWeight: '600',
    color: '#222',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ms(4),
  },
  locationText: {
    fontSize: ms(12.5),
    color: '#555',
    marginLeft: ms(5),
  },
});