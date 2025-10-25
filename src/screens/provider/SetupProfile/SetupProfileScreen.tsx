import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from 'utils/colors';
import { Icon, Typography } from 'components/common';
import AddBioStep from './steps/AddBioStep';
import EducationStep from './steps/EducationStep';
import LicenseStep from './steps/LicenseStep';
import SkillsStep from './steps/SkillsStep';
import ServicesStep from './steps/ServicesStep';
import AvailabilityStep from './steps/AvailabilityStep';
import ExperienceStep from './steps/ExperienceStep';
import { ms } from 'react-native-size-matters';
import { navigate, onBack } from 'navigation/index';
import PersonalInformationStep from './PersonalInformationStep';
import { SCREENS } from 'constants/routes';

const { width } = Dimensions.get('window');

const SetupProfileScreen = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 8;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  const stepTitles = [
    'Add Bio',
    'Personal Information',
    'Education & Certification',
    'License & Certification',
    'Skills',
    'Services Offered',
    'Availability',
    'Professional Experience',
  ];

  // Animate progress bar on step change
  useEffect(() => {
    const progress = (step - 1) / (totalSteps - 1);
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [step]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - ms(80)],
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AddBioStep onNext={nextStep} />;
      case 2:
        return <PersonalInformationStep onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <EducationStep onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <LicenseStep onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <SkillsStep onNext={nextStep} onBack={prevStep} />;
      case 6:
        return <ServicesStep onNext={nextStep} onBack={prevStep} />;
      case 7:
        return <AvailabilityStep onNext={nextStep} onBack={prevStep} />;
      case 8:
        return <ExperienceStep onFinish={() => {
          navigate(SCREENS.BOTTOM_STACK)
        }} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => {
            if (step > 1) {
              prevStep();
            } else {
              onBack();
            }
          }}
          activeOpacity={0.7}
          style={styles.backButton}
        >
          <Icon componentName='Ionicons' iconName='arrow-back' color={COLORS.WHITE} />
        </TouchableOpacity>

        {/* Step Title */}
        <Typography color={COLORS.WHITE} style={styles.headerText}>
          {stepTitles[step - 1]}
        </Typography>

        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
          <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
        </View>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>{renderStep()}</View>
    </View>
  );
};

export default SetupProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ms(140),
    paddingTop: ms(20),
    borderBottomLeftRadius: ms(20),
    borderBottomRightRadius: ms(20),
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: ms(20),
    backgroundColor: COLORS.HEADER_BACKGROUND,
  },
  backButton: {
    position: 'absolute',
    left: ms(16),
    top: ms(50),
    zIndex: 10,
  },
  headerText: {
    fontSize: ms(18),
    fontWeight: '700',
    marginBottom: ms(20),
  },
  progressBarBackground: {
    width: '90%',
    height: ms(6),
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: ms(3),
    overflow: 'hidden',
  },
  progressBarFill: {
    height: ms(6),
    borderRadius: ms(3),
    backgroundColor: COLORS.PRIMARY,
  },
  content: {
    flex: 1,
    paddingHorizontal: ms(16),
    paddingVertical: ms(10),
  },
});