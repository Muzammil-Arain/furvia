import { Button, Typography } from 'components/index';
import { IMAGES } from 'constants/assets';
import { SCREENS } from 'constants/routes';
import { navigate } from 'navigation/index';
import React, { useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Text, ImageBackground } from 'react-native';
import { ms } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';

const { width, height } = Dimensions.get('window');

export const onboardingData = [
  {
    id: '1',
    image: IMAGES.OnBoarding_1,
    title: 'Furvia Connects You & Your Fur-Babies',
    link: 'Where community goes hand in paw! ',
    description:
      'With the local pet care community groomers, walkers, vets, and pet-loving neighbors—all in one smart, seamless app.',
    button: 'Next',
  },
  {
    id: '2',
    image: IMAGES.OnBoarding_2,
    title: 'Local pros. Instant Booking.',
    description: 'Total Peace of Mind.',
    button: 'Next',
  },
  {
    id: '3',
    image: IMAGES.OnBoarding_3,
    title: 'Sign Up Today',
    description: 'Because being a great pet parent just got easier.',
    button: 'Start Now',
  },
];

const OnBoarding: React.FC<{ navigation: any }> = ({}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigate(SCREENS.UserType);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={onboardingData}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <ImageBackground source={item.image} style={styles.slide}>
            <View
              style={[
                styles.textContainer,
                {
                  marginBottom: item.id == '3' ? ms(150) :item.id == '2' ? ms(150) : ms(112),
                },
              ]}
            >
              {/* Title with partial highlight */}
              {item.id === '1' ? (
                <Typography style={styles.title}>
                  Furvia Connects You & Your
                  <Typography style={[styles.title, styles.highlight]}> Fur-Babies</Typography>
                </Typography>
              ) : item.id === '2' ? (
                <Typography style={styles.title}>
                  Local pros. Instant Booking. Total
                  <Typography style={[styles.title, styles.highlight]}> Peace of Mind.</Typography>
                </Typography>
              ) : item.id === '3' ? (
                <Typography style={styles.title}>
                  Sign Up
                  <Typography style={[styles.title, styles.highlight]}> Today</Typography>
                </Typography>
              ) : (
                <Typography style={styles.title}>{item.title}</Typography>
              )}

              <Typography style={styles.description}>{item.description}</Typography>
              {item.link && <Typography style={styles.linktext}>{item.link}</Typography>}
            </View>
          </ImageBackground>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
        ))}
      </View>

      {/* Next / Get Started Button */}
      <View style={styles.nextButton}>
        <Button
          title={currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#56077E' },
  slide: { width, height, justifyContent: 'flex-end', padding: 20 },
  textContainer: { marginBottom: ms(115) },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  highlight: {
    color: COLORS.PRIMARY,
  },
  description: {
    fontSize: 16,
    color: '#eee',
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: ms(100),
    width: '100%',
  },
  linktext: {
    color: COLORS.PRIMARY,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '500',
    marginTop: 10,
    fontSize: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.PRIMARY,
    width: 30,
    height: 7,
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default OnBoarding;
