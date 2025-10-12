import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppWrapper } from 'components/common/AppWapper';
import { Icon, Typography } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';

const { width } = Dimensions.get('window');

const MyPetProfile = () => {
  const pets = [
    {
      id: 1,
      name: 'Persian Charlie',
      age: '1 year 1 month',
      image:
        'https://media.4-paws.org/d/2/5/f/d25ff020556e4b5eae747c55576f3b50886c0b90/cut%20cat%20serhio%2002-1813x1811-720x719.jpg',
    },
    {
      id: 2,
      name: 'Golden Max',
      age: '2 years',
      image:
        'https://images.unsplash.com/photo-1601758123927-196c4a62eb3f?auto=format&fit=crop&w=720&q=80',
    },
    {
      id: 3,
      name: 'Bella',
      age: '8 months',
      image:
        'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=720&q=80',
    },
  ];

  return (
    <AppWrapper title='My Pets'>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Swiper
          loop
          autoplay
          autoplayTimeout={4}
          showsPagination
          activeDotColor={COLORS.PRIMARY}
          dotColor='#ccc'
          paginationStyle={{ bottom: ms(20) }}
          style={{ height: width * 1.15 }}
        >
          {pets.map((pet, index) => (
            <Animated.View
              key={pet.id}
              entering={FadeInDown.delay(index * 150).springify()}
              style={styles.slideContainer}
            >
              <ImageBackground
                source={{ uri: pet.image }}
                resizeMode='cover'
                style={styles.imageBackground}
                imageStyle={{ borderRadius: ms(24) }}
              >
                <View style={styles.overlay} />
                <View style={styles.infoContainer}>
                  <View>
                    <Typography style={styles.petName}>{pet.name}</Typography>
                    <Typography style={styles.petAge}>{pet.age}</Typography>
                  </View>
                  <TouchableOpacity
                    // onPress={() => navigate(SCREENS.PetProfileDetails)}
                    style={styles.editButton}
                  >
                    <Image
                      resizeMode='contain'
                      style={styles.editIcon}
                      source={require('../../assets/icons/edit.png')}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </Animated.View>
          ))}
        </Swiper>
      </View>
    </AppWrapper>
  );
};

export default MyPetProfile;

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: width * 0.9,
    height: width * 1.1,
    borderRadius: ms(24),
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: ms(24),
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(20),
    paddingVertical: ms(16),
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderBottomLeftRadius: ms(24),
    borderBottomRightRadius: ms(24),
  },
  petName: {
    color: COLORS.BLACK,
    fontWeight: '700',
    fontSize: ms(22),
  },
  petAge: {
    color: COLORS.GRAY_DARK,
    fontSize: ms(15),
    marginTop: ms(4),
  },
  editButton: {
    backgroundColor: COLORS.PRIMARY,
    width: ms(45),
    height: ms(45),
    borderRadius: ms(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    width: ms(24),
    height: ms(24),
    tintColor: COLORS.WHITE,
  },
});
