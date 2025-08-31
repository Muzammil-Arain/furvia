import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import { BackgroundWrapper } from '../../../components';
import { useTheme } from '../../../context/ThemeContext';

const { width } = Dimensions.get('window');

export const onboardingData = [
  {
    id: '1',
    title: 'Find Services Easily',
    description: 'Search and book services near you in just a few taps.',
    // image: require('src/assets/images/onboarding1.png'),
  },
  {
    id: '2',
    title: 'Offer Your Skills',
    description: 'Become a helper and earn by offering your skills.',
    // image: require('src/assets/images/onboarding2.png'),
  },
  {
    id: '3',
    title: 'All in One Place',
    description: 'Connect, book, and manage everything in one app.',
    // image: require('src/assets/images/onboarding3.png'),
  },
];

const OnboardingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { theme } = useTheme();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('Home'); // onboarding complete
    }
  };

  const handleSkip = () => {
    navigation.replace('Home');
  };

  return (
    <BackgroundWrapper loading={false}>
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
          <View style={styles.slide}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={[styles.title, { color: theme.text }]}>
              {item.title}
            </Text>
            <Text style={[styles.desc, { color: theme.gray }]}>
              {item.description}
            </Text>
          </View>
        )}
      />

      {/* Bottom Controls */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={[styles.skip, { color: theme.gray }]}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.dotsContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentIndex ? theme.primary : theme.gray,
                },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextBtn, { backgroundColor: theme.primary }]}
          onPress={handleNext}
        >
          <Text style={styles.nextText}>
            {currentIndex === onboardingData.length - 1
              ? 'Get Started'
              : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: ms(20),
  },
  image: {
    width: ms(250),
    height: ms(250),
    marginBottom: ms(20),
  },
  title: {
    fontSize: ms(22),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: ms(10),
  },
  desc: {
    fontSize: ms(14),
    textAlign: 'center',
    paddingHorizontal: ms(20),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(20),
    paddingBottom: ms(30),
  },
  skip: {
    fontSize: ms(14),
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: ms(8),
    height: ms(8),
    borderRadius: ms(4),
    marginHorizontal: ms(3),
  },
  nextBtn: {
    paddingVertical: ms(8),
    paddingHorizontal: ms(16),
    borderRadius: ms(20),
  },
  nextText: {
    color: '#fff',
    fontSize: ms(14),
  },
});

export default OnboardingScreen;
