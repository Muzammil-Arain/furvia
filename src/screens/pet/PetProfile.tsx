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
import PetAgeWheel from 'components/appComponents/PetAgePicker';

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

  // 🔹 Form states
  const [name, setName] = useState('');
  const [type, setType] = useState<string | null>(null);
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState<string | null>(null);
  const [genderCastration, setGenderCastration] = useState<string | null>(null);
  const [dob, setDob] = useState<{ year: string; month: string }>({ year: '0', month: '0' });

  const [step, setStep] = useState(1);

  const progressValue = step / TOTAL_STEPS;

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // ✅ Final submit
  const handleFinish = () => {
    const payload = {
      name,
      type,
      breed,
      gender,
      gender_castration: genderCastration,
      dob,
      photo: selectedMedia?.[0],
    };

    console.log('🚀 ~ Final Payload:', payload);

    // 🔹 Yahan API call kar sakte ho
    // await postRequest('/pets', payload)
    navigate(SCREENS.COMPLETEPETPROFILE);
  };

  return (
    <Wrapper useScrollView={step !== 6}>
      {/* Step Count */}
      <Typography style={[styles.Bartitle, { color: COLORS.PRIMARY }]}>
        {step}/{TOTAL_STEPS}
      </Typography>

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

          {/* 🔹 Step 1 - Name */}
          {step === 1 && (
            <AppTextInput placeholder='Type name' value={name} onChangeText={setName} name='' />
          )}

          {/* 🔹 Step 2 - Species */}
          {step === 2 && (
            <View>
              <View style={styles.row}>
                <SelectButton
                  icon={IMAGES.Dog}
                  label='Dog'
                  selected={type === 'dog'}
                  onPress={() => setType('dog')}
                />
                <SelectButton
                  label='Cat'
                  icon={IMAGES.Cat}
                  selected={type === 'cat'}
                  onPress={() => setType('cat')}
                />
              </View>
              <View style={[styles.row, { marginBottom: 20 }]}>
                <SelectButton
                  icon={IMAGES.Bird}
                  label='Bird'
                  selected={type === 'bird'}
                  onPress={() => setType('bird')}
                />
                <SelectButton
                  icon={IMAGES.OtherPets}
                  label='Other'
                  selected={type === 'other'}
                  onPress={() => setType('other')}
                />
              </View>
            </View>
          )}

          {/* 🔹 Step 3 - Breed */}
          {step === 3 && (
            <AppTextInput
              // iconName='paw'
              // iconType='FontAwesome'
              placeholder="Type pet's breed"
              value={breed}
              onChangeText={setBreed}
              name=''
            />
          )}

          {/* 🔹 Step 4 - Gender */}
          {step === 4 && (
            <View style={styles.row}>
              <SelectButton
                icon={IMAGES.Male}
                label='Male'
                selected={gender === 'male'}
                onPress={() => setGender('male')}
              />
              <SelectButton
                icon={IMAGES.Female}
                label='Female'
                selected={gender === 'female'}
                onPress={() => setGender('female')}
              />
            </View>
          )}

          {/* 🔹 Step 5 - Castration */}
          {step === 5 && (
            <View style={styles.row}>
              <SelectButton
                icon={IMAGES.Yes}
                label=''
                selected={genderCastration === 'spayed'}
                onPress={() => setGenderCastration('spayed')}
              />
              <SelectButton
                icon={IMAGES.No}
                label=''
                selected={genderCastration === 'not_spayed'}
                onPress={() => setGenderCastration('not_spayed')}
              />
            </View>
          )}

          {/* 🔹 Step 6 - DOB */}
          {step === 6 && (
            <View style={{ zIndex: 999, position: 'relative', marginBottom: 20 }}>
              <PetAgeWheel
                onChange={(year: any, month: any) => {
                  console.log('🚀 ~ month:', month);
                  console.log('🚀 ~ year:', year);
                  // const today = new Date();
                  // const birthYear = today.getFullYear() - parseInt(year);
                  // const birthMonth = today.getMonth() - parseInt(month);
                  // const dobDate = new Date(
                  //   birthYear,
                  //   birthMonth >= 0 ? birthMonth : 0,
                  //   today.getDate(),
                  // );
                  // const dobString = dobDate.toISOString().split('T')[0];

                  setDob({ year: year, month: month });
                }}
              />
            </View>
          )}

          {/* 🔹 Step 7 - Image */}
          {step === 7 && (
            <TouchableOpacity onPress={() => setPickerVisible(true)}>
              <View style={{ position: 'absolute', zIndex: 999, left: 35, top: -10 }}>
                <Typography
                  style={{
                    color: selectedMedia.length > 0 ? COLORS.PRIMARY : COLORS.WHITE,
                    fontWeight: 'bold',
                    fontSize: ms(25),
                  }}
                >
                  {name ?? 'Ghost'}
                </Typography>
                <Typography
                  style={{ color: selectedMedia.length > 0 ? COLORS.PRIMARY : COLORS.WHITE }}
                >
                  {' '}
                  {dob.year}.{dob.month} years old
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
              pickMedia({ source: 'gallery' });
            }}
          />

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <Button
              onPress={() => {
                if (step === TOTAL_STEPS) {
                  handleFinish();
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
