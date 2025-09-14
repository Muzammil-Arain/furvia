/* eslint-disable react-native/no-inline-styles */
import SelectButton from 'components/appComponents/SelectButton';
import AppTextInput from 'components/common/Input';
import { Button, Typography, Wrapper } from 'components/index';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';
import * as Progress from 'react-native-progress';
import { IMAGES } from 'constants/assets';
import { navigate } from 'navigation/index';
import PetAgePicker from 'components/appComponents/PetAgePicker';
import { SCREENS } from 'constants/routes';
import { useMediaPicker, UseMediaPickerOptions } from 'hooks/useMediaPicker';
import { CameraGalleryPicker } from 'components/appComponents/openCameraOrGallery';

const TOTAL_STEPS = 7;

const imageConfig: UseMediaPickerOptions = {
  mediaType: 'image',
  cropping: true,
  width: 300,
  height: 300,
  cropperCircleOverlay: true,
};

const PetProfileScreen: React.FC = () => {
  const { pickMedia, selectedMedia } = useMediaPicker();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);


  const progressValue = step / TOTAL_STEPS;

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
     
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Wrapper useScrollView={step !== 6}>
      {/* Step Count */}
      <Typography style={[styles.Bartitle, { color: COLORS.PRIMARY }]}>
        {step}/{TOTAL_STEPS}
      </Typography>

      {/* Progress Bar */}
      <Progress.Bar
        progress={progressValue}
        width={ms(320)}
        color={COLORS.PRIMARY}
        unfilledColor='#3E055B'
        borderWidth={0}
        height={10}
        style={styles.progressBar}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Heading */}
          <View style={styles.heading}>
            <Typography style={[styles.title, { color: COLORS.PRIMARY }]}>
              {step === 1 && 'FurBaby’s Name?'}
              {step === 2 && 'Species?'}
              {step === 3 && 'Breed?'}
              {step === 4 && 'Gender?'}
              {step === 5 && 'Is your FurBaby spayed or neutered?'}
              {step === 6 && 'Age?'}
              {step === 7 && 'Add a photo of your FurBaby'}
            </Typography>
          </View>
          {/* Inputs */}
          {step === 1 && (
            <AppTextInput placeholder='Type name' value={name} onChangeText={setName} name={''} />
          )}
          {step === 2 && (
            <View>
              <View style={styles.row}>
                <SelectButton
                  icon={IMAGES.Dog}
                  label='Dog'
                  selected={selected === 'dog'}
                  onPress={() => setSelected('dog')}
                />
                <SelectButton
                  label='Cat'
                  icon={IMAGES.Cat}
                  selected={selected === 'cat'}
                  onPress={() => setSelected('cat')}
                />
              </View>
              <View style={[styles.row, { marginBottom: 20 }]}>
                <SelectButton
                  icon={IMAGES.Bird}
                  label='Bird'
                  selected={selected === 'Bird'}
                  onPress={() => setSelected('Bird')}
                />
                <SelectButton
                  icon={IMAGES.OtherPets}
                  label='Other'
                  selected={selected === 'Other'}
                  onPress={() => setSelected('Other')}
                />
              </View>
            </View>
          )}
          {step === 3 && (
            <AppTextInput
              iconName='paw'
              iconType='FontAwesome'
              placeholder="Type pet's breed"
              name={''}
            />
          )}
          {step === 4 && (
            <View style={styles.row}>
              <SelectButton
                icon={IMAGES.Male}
                label='Male'
                selected={selected === 'Male'}
                onPress={() => setSelected('Male')}
              />
              <SelectButton
                icon={IMAGES.Female}
                label='Female'
                selected={selected === 'Female'}
                onPress={() => setSelected('Female')}
              />
            </View>
          )}
          {step === 5 && (
            <View style={styles.row}>
              <SelectButton
                icon={IMAGES.Yes}
                label=''
                selected={selected === 'Yes'}
                onPress={() => setSelected('Yes')}
              />
              <SelectButton
                icon={IMAGES.No}
                label=''
                selected={selected === 'No'}
                onPress={() => setSelected('No')}
              />
            </View>
          )}
          {step === 6 && (
            <View style={{ zIndex: 999, position: 'relative', marginBottom: 20 }}>
              <PetAgePicker />
            </View>
          )}
          {step === 7 && (
            <TouchableOpacity
              onPress={() => {
                setPickerVisible(true);
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  zIndex: 999,
                  left: 35,
                  top: -10,
                }}
              >
                <Typography
                  style={{
                    color: COLORS.WHITE,
                    fontWeight: 'bold',
                    fontSize: ms(25),
                  }}
                >
                  Ghost
                </Typography>
                <Typography
                  style={{
                    color: COLORS.WHITE,
                  }}
                >
                  3 years old
                </Typography>
              </View>
              <Image
                source={
                  selectedMedia && selectedMedia.length > 0 && selectedMedia[0]?.uri
                    ? { uri: selectedMedia[0].uri }
                    : IMAGES.Pet_Card
                }
                resizeMode='cover'
                style={{
                  alignSelf: 'center',
                  borderRadius: 20,
                  marginTop: -30,
                  width: ms(300),
                  height: ms(400),
                }}
              />
            </TouchableOpacity>
          )}
          <CameraGalleryPicker
            visible={pickerVisible}
            onClose={() => setPickerVisible(false)}
            onCameraPress={() => {
              setPickerVisible(false);
              pickMedia({ source: 'camera' });
            }}
            onGalleryPress={() => {
              setPickerVisible(false);
              pickMedia({
                source: 'gallery',
              });
            }}
          />
          {/* Buttons */}
          <View style={styles.buttonRow}>
            <Button
              onPress={() => {
                if (step === TOTAL_STEPS) {
                  navigate(SCREENS.COMPLETEPETPROFILE);
                } else {
                  handleNext();
                }
              }}
              title={step === TOTAL_STEPS ? 'Finish' : 'Next'}
            />
            {step > 1 && (
              <Button
                style={{ marginTop: 20 }}
                variant='outline'
                onPress={handleBack}
                title={'Back'}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: ms(20),
    justifyContent: 'center',
    paddingHorizontal: ms(20),
  },
  heading: {
    marginBottom: vs(25),
    alignItems: 'center',
  },
  title: {
    fontSize: ms(22),
    textAlign: 'center',
  },
  Bartitle: {
    textAlign: 'right',
    marginRight: ms(20),
    fontSize: ms(15),
    marginBottom: ms(10),
  },
  progressBar: {
    alignSelf: 'center',
    marginBottom: vs(20),
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
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
