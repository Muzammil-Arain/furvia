import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import Animated, { FadeInDown } from 'react-native-reanimated';

const PetProfileView = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [petData, setPetData] = useState({
    name: 'Persian Charlie',
    petType: 'Cat',
    gender: 'Male',
    dob: '21/02/2023',
    areaSize: '02',
    weight: '2.5 KG',
    breed: 'Abruzzendhund',
    vaccination: 'Yes',
    image:
      'https://media.4-paws.org/d/2/5/f/d25ff020556e4b5eae747c55576f3b50886c0b90/cut%20cat%20serhio%2002-1813x1811-720x719.jpg',
  });

  const handleChange = (key, value) => {
    setPetData(prev => ({ ...prev, [key]: value }));
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const renderRow = (label, value, key) => (
    <View style={styles.row} key={key}>
      <Typography style={styles.label}>{label}</Typography>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={text => handleChange(key, text)}
        />
      ) : (
        <Typography style={styles.value}>{value}</Typography>
      )}
    </View>
  );

  return (
    <AppWrapper title={petData.name}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: ms(15), paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Pet Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.card}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: petData.image }} style={styles.image} />
            <TouchableOpacity onPress={handleToggleEdit} style={styles.editIcon}>
              <Image
                source={require('../../assets/icons/Edit_Icon.png')}
                style={styles.editIconImage}
              />
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <TextInput
              style={styles.nameInput}
              value={petData.name}
              onChangeText={text => handleChange('name', text)}
            />
          ) : (
            <Typography style={styles.petName}>{petData.name}</Typography>
          )}

          {/* Edit/Save button */}
          <TouchableOpacity onPress={handleToggleEdit} style={styles.editButton}>
            <Typography style={styles.editButtonText}>
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Typography>
          </TouchableOpacity>
        </Animated.View>

        {/* Pet Info Section */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.infoContainer}>
          {renderRow('Pet Type', petData.petType, 'petType')}
          {renderRow('Gender', petData.gender, 'gender')}
          {renderRow('Date of Birth', petData.dob, 'dob')}
          {renderRow('Outdoor Area Size', petData.areaSize, 'areaSize')}
          {renderRow('Weight', petData.weight, 'weight')}
          {renderRow('Pet Breed', petData.breed, 'breed')}
          {renderRow('Vaccination', petData.vaccination, 'vaccination')}
        </Animated.View>
      </ScrollView>
    </AppWrapper>
  );
};

export default PetProfileView;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(12),
    paddingVertical: ms(20),
    marginBottom: ms(20),
    elevation: 5,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.2,
    shadowRadius: ms(6),
    shadowOffset: { width: 0, height: 4 },
  },
  imageContainer: {
    width: ms(250),
    height: ms(250),
    borderRadius: ms(125),
    backgroundColor: COLORS.GRAY,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  editIcon: {
    position: 'absolute',
    bottom: ms(10),
    right: ms(10),
    backgroundColor: COLORS.PRIMARY,
    borderRadius: ms(20),
    padding: ms(8),
    elevation: 5,
  },
  editIconImage: {
    width: 20,
    height: 20,
  },
  petName: {
    marginTop: ms(12),
    fontSize: ms(20),
    fontWeight: '700',
    color: COLORS.BLACK,
  },
  nameInput: {
    marginTop: ms(12),
    fontSize: ms(20),
    fontWeight: '700',
    color: COLORS.BLACK,
    borderBottomWidth: 1.5,
    borderColor: COLORS.GRAY,
    textAlign: 'center',
    width: '75%',
    paddingVertical: ms(8),
  },
  infoContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(12),
    paddingHorizontal: ms(20),
    paddingVertical: ms(15),
    elevation: 2,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: ms(5),
    shadowOffset: { width: 0, height: 4 },
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: ms(10),
    borderBottomWidth: 1,
    borderColor: COLORS.SILVER,
  },
  label: {
    color: COLORS.ICONS,
    fontSize: ms(15),
  },
  value: {
    color: COLORS.BLACK,
    fontWeight: '600',
    fontSize: ms(15),
  },
  input: {
    borderBottomWidth: 1.5,
    borderColor: COLORS.GRAY,
    textAlign: 'right',
    fontSize: ms(15),
    color: COLORS.BLACK,
    width: '45%',
    paddingVertical: ms(8),
  },
  editButton: {
    marginTop: ms(15),
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: ms(14),
    borderRadius: ms(12),
    width: ms(170),
    alignItems: 'center',
    marginBottom: ms(10),
  },
  editButtonText: {
    color: COLORS.WHITE,
    fontSize: ms(16),
    fontWeight: '600',
  },
});
