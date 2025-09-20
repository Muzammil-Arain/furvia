import { Button } from 'components/index';
import { IMAGES } from 'constants/assets';
import { SCREENS } from 'constants/routes';
import { navigate } from 'navigation/index';
import React, { useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
// import { AppButton } from '../../../components/common';

const { width, height } = Dimensions.get('window');

export const onboardingData = [
  { id: '1', image: IMAGES.OnBoarding_1 },
  { id: '2', image: IMAGES.OnBoarding_2 },
  { id: '3', image: IMAGES.OnBoarding_3 },
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
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} resizeMode='cover' />
          </View>
        )}
      />

      {/* AppButton directly use karo */}
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
  slide: { width, height },
  image: { width, height, marginTop: -40 },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default OnBoarding;
