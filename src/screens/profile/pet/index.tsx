import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { BackgroundWrapper } from '../../../components';
import { useTheme } from '../../../context/ThemeContext';
import { AppButton, AppTextInput } from '../../../components/common';
import fonts from '../../../assets/fonts';
import * as Progress from 'react-native-progress';
import SelectButton from '../../../components/appComponents/SelectButton';

const TOTAL_STEPS = 7;

const PetProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);

  const progressValue = step / TOTAL_STEPS;

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      console.log('Form Finished!');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <BackgroundWrapper loading={false}>
      {/* Step Count */}
      <Text style={[styles.Bartitle, { color: theme.primary }]}>
        {step}/{TOTAL_STEPS}
      </Text>

      {/* Progress Bar */}
      <Progress.Bar
        progress={progressValue}
        width={ms(320)}
        color={theme.primary}
        unfilledColor="#3E055B"
        borderWidth={0}
        height={10}
        style={styles.progressBar}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Heading */}
          <View style={styles.heading}>
            <Text style={[styles.title, { color: theme.primary }]}>
              {step === 1 && 'FurBaby’s Name?'}
              {step === 2 && 'Species?'}
              {step === 3 && 'Breed?'}
              {step === 4 && 'Gender?'}
              {step === 5 && 'Is your FurBaby spayed or neutered?'}
              {step === 6 && 'Age?'}
              {step === 7 && 'Add a photo of your FurBaby'}
            </Text>
          </View>

          {/* Inputs Example */}
          {step === 1 && (
            <AppTextInput
              iconName="user"
              iconType="FontAwesome"
              placeholder="Type name"
              value={name}
              onChangeText={setName}
            />
          )}
          {step === 2 && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <SelectButton
                  label="Dog"
                  selected={selected === 'dog'}
                  onPress={() => setSelected('dog')}
                />
                <SelectButton
                  label="Cat"
                  selected={selected === 'cat'}
                  onPress={() => setSelected('cat')}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <SelectButton
                  label="Bird"
                  selected={selected === 'Bird'}
                  onPress={() => setSelected('Bird')}
                />
                <SelectButton
                  label="Other"
                  selected={selected === 'Other'}
                  onPress={() => setSelected('Other')}
                />
              </View>
            </View>
          )}
          {step === 3 && (
            <AppTextInput
              iconName="paw"
              iconType="FontAwesome"
              placeholder="Enter breed"
            />
          )}

          {step === 4 && (
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <SelectButton
                label="Male"
                selected={selected === 'Male'}
                onPress={() => setSelected('Male')}
              />
              <SelectButton
                label="Female"
                selected={selected === 'Female'}
                onPress={() => setSelected('Female')}
              />
            </View>
          )}

           {step === 5 && (
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <SelectButton
                label="Yes"
                selected={selected === 'Yes'}
                onPress={() => setSelected('Yes')}
              />
              <SelectButton
                label="No"
                selected={selected === 'No'}
                onPress={() => setSelected('No')}
              />
            </View>
          )}

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <AppButton
              onPress={handleNext}
              title={step === TOTAL_STEPS ? 'Finish' : 'Next'}
            />
            {step > 1 && (
              <AppButton
                variant="outline"
                onPress={handleBack}
                title={'Back'}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: ms(60),
    justifyContent: 'center',
    paddingHorizontal: ms(20),
  },
  heading: {
    marginBottom: vs(25),
    alignItems: 'center',
  },
  title: {
    fontSize: ms(22),
    fontFamily: fonts.PoppinsBold,
    textAlign: 'center',
  },
  Bartitle: {
    fontFamily: fonts.PoppinsRegular,
    textAlign: 'right',
    marginRight: ms(20),
    fontSize: ms(15),
    marginBottom: ms(10),
  },
  progressBar: {
    alignSelf: 'center',
    marginBottom: vs(20),
  },
  buttonRow: {
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    minWidth: ms(120),
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: ms(14) },
});

export default PetProfileScreen;
