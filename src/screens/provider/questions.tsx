import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { Button, Typography, Wrapper } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';

const QuestionScreen: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = ['Dog', 'Cat', 'Bird', 'Other'];

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonSlide = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(buttonSlide, {
        toValue: 0,
        duration: 700,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleNext = () => {
    if (selectedOption) {
      // Later: navigate to next screen
      console.log('Selected:', selectedOption);
    }
  };

  return (
    <Wrapper>
      <View style={styles.container}>
        {/* Animated Question */}
        <Animated.View
          style={[
            styles.questionWrapper,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}>
          <Typography style={styles.question}>
            Which type of pet do you like?
          </Typography>
        </Animated.View>

        {/* Animated Options */}
        <View style={styles.optionsContainer}>
          {options.map(option => {
            const scaleAnim = useRef(new Animated.Value(1)).current;

            const handlePress = () => {
              setSelectedOption(option);
              Animated.sequence([
                Animated.spring(scaleAnim, {
                  toValue: 1.05,
                  useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                  toValue: 1,
                  friction: 3,
                  useNativeDriver: true,
                }),
              ]).start();
            };

            return (
              <Animated.View
                key={option}
                style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                  style={[
                    styles.option,
                    selectedOption === option && styles.optionSelected,
                  ]}
                  onPress={handlePress}>
                  <Typography
                    style={[
                      styles.optionText,
                      selectedOption === option && styles.optionTextSelected,
                    ]}>
                    {option}
                  </Typography>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Animated Next Button */}
        <Animated.View
          style={[
            styles.nextButton,
            { transform: [{ translateY: buttonSlide }] },
          ]}>
          <Button title="Next" onPress={handleNext} />
        </Animated.View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: ms(20) },
  questionWrapper: { marginBottom: ms(30) },
  question: {
    fontSize: ms(22),
    fontWeight: '700',
    color: COLORS.PRIMARY,
    textAlign: 'center',
  },
  optionsContainer: { marginBottom: ms(40) },
  option: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderRadius: ms(10),
    padding: ms(15),
    marginVertical: ms(8),
  },
  optionSelected: {
    backgroundColor: COLORS.PRIMARY,
  },
  optionText: {
    fontSize: ms(18),
    textAlign: 'center',
    color: COLORS.PRIMARY,
  },
  optionTextSelected: {
    color: COLORS.WHITE,
  },
  nextButton: {
    position: 'absolute',
    bottom: ms(20),
    left: ms(20),
    right: ms(20),
  },
});

export default QuestionScreen;