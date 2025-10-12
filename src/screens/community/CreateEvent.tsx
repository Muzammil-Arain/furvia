import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';
import { AppWrapper } from 'components/common/AppWapper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { onBack } from 'navigation/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMediaPicker, UseMediaPickerOptions } from 'hooks/useMediaPicker';
import { openCameraOrGallery } from 'utils/helpers';

const CreateEvent = () => {
  const { pickMedia, selectedMedia } = useMediaPicker();
  console.log("🚀 ~ CreateEvent ~ selectedMedia:", selectedMedia)
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventNotes, setEventNotes] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState(null);

  const [errors, setErrors] = useState({
    eventName: '',
    eventLocation: '',
    eventNotes: '',
    eventDate: '',
    eventDescription: '',
    eventImage: '',
  });


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // 🎨 Pick Image Function
  const imageConfig: UseMediaPickerOptions = {
    mediaType: 'image',
    cropping: true,
    width: 300,
    height: 300,
    cropperCircleOverlay: true,
  };

  const handleCreateEvent = () => {
    let formValid = true;
    let newErrors = { ...errors };

    if (!eventName) {
      formValid = false;
      newErrors.eventName = 'Event Name is required';
    } else newErrors.eventName = '';

    if (!eventLocation) {
      formValid = false;
      newErrors.eventLocation = 'Event Location is required';
    } else newErrors.eventLocation = '';

    if (!eventNotes) {
      formValid = false;
      newErrors.eventNotes = 'Event Notes are required';
    } else newErrors.eventNotes = '';

    if (!eventDate) {
      formValid = false;
      newErrors.eventDate = 'Event Date is required';
    } else newErrors.eventDate = '';

    if (!eventDescription) {
      formValid = false;
      newErrors.eventDescription = 'Event Description is required';
    } else newErrors.eventDescription = '';

    if (!selectedMedia[0]?.uri) {
      formValid = false;
      newErrors.eventImage = 'Event Image is required';
    } else newErrors.eventImage = '';

    setErrors(newErrors);

    if (!formValid) return;

    console.log('Event Created:', {
      eventName,
      eventLocation,
      eventNotes,
      eventDate,
      eventDescription,
      eventImage,
    });

    onBack();
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleDateConfirm = date => {
    setEventDate(date.toDateString());
    hideDatePicker();
  };

  const handleInputChange = (value, field) => {
    setErrors(prev => ({ ...prev, [field]: '' }));
    if (field === 'eventName') setEventName(value);
    if (field === 'eventLocation') setEventLocation(value);
    if (field === 'eventNotes') setEventNotes(value);
    if (field === 'eventDescription') setEventDescription(value);
  };

  return (
    <AppWrapper title='Create Event'>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* 📸 Event Image */}
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={() => {
            openCameraOrGallery({
              cameraPress: () => {
                pickMedia({ ...imageConfig, source: 'camera' });
              },
              galleryPress: () => {
                pickMedia({ ...imageConfig, source: 'gallery' });
              },
            });
          }}
        >
          {selectedMedia[0]?.uri ? (
            <Image source={{ uri: selectedMedia[0]?.uri }} style={styles.eventImage} />
          ) : (
            <View style={styles.placeholderContainer}>
              <Icon name='camera-outline' size={ms(30)} color={COLORS.GRAY} />
              <Text style={styles.placeholderText}>Add Event Image</Text>
            </View>
          )}
        </TouchableOpacity>
        {errors.eventImage ? <Text style={styles.errorText}>{errors.eventImage}</Text> : null}

        {/* Event Name */}
        <TextInput
          style={[styles.input, errors.eventName && styles.inputError]}
          placeholder='Event Name'
          value={eventName}
          onChangeText={v => handleInputChange(v, 'eventName')}
        />
        {errors.eventName && <Text style={styles.errorText}>{errors.eventName}</Text>}

        {/* Event Location */}
        <TextInput
          style={[styles.input, errors.eventLocation && styles.inputError]}
          placeholder='Event Location'
          value={eventLocation}
          onChangeText={v => handleInputChange(v, 'eventLocation')}
        />
        {errors.eventLocation && <Text style={styles.errorText}>{errors.eventLocation}</Text>}

        {/* Event Notes */}
        <TextInput
          style={[styles.input, errors.eventNotes && styles.inputError]}
          placeholder='Event Notes'
          value={eventNotes}
          onChangeText={v => handleInputChange(v, 'eventNotes')}
        />
        {errors.eventNotes && <Text style={styles.errorText}>{errors.eventNotes}</Text>}

        {/* Event Date */}
        <TouchableOpacity
          style={[styles.input, errors.eventDate && styles.inputError]}
          onPress={showDatePicker}
        >
          <Text style={styles.dateText}>{eventDate || 'Select Event Date'}</Text>
        </TouchableOpacity>
        {errors.eventDate && <Text style={styles.errorText}>{errors.eventDate}</Text>}

        {/* Event Description */}
        <TextInput
          style={[styles.textArea, errors.eventDescription && styles.inputError]}
          placeholder='Event Description'
          value={eventDescription}
          onChangeText={v => handleInputChange(v, 'eventDescription')}
          multiline
        />
        {errors.eventDescription && <Text style={styles.errorText}>{errors.eventDescription}</Text>}

        {/* Create Event Button */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
          <Text style={styles.createButtonText}>Create Event</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 📅 Date Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </AppWrapper>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: ms(20),
    backgroundColor: COLORS.WHITE,
  },
  imagePicker: {
    height: ms(180),
    borderRadius: ms(12),
    borderWidth: 1.5,
    borderColor: COLORS.GRAY,
    marginBottom: ms(15),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 5,
    color: COLORS.GRAY,
    fontSize: ms(13),
  },
  input: {
    height: ms(50),
    borderColor: COLORS.GRAY,
    borderWidth: 1.5,
    borderRadius: ms(12),
    marginBottom: ms(15),
    paddingHorizontal: ms(15),
    fontSize: ms(14),
    color: COLORS.BLACK,
  },
  inputError: {
    borderColor: COLORS.RED,
  },
  dateText: {
    marginTop: ms(10),
    fontSize: ms(14),
    color: COLORS.GRAY,
  },
  textArea: {
    height: ms(120),
    borderColor: COLORS.GRAY,
    borderWidth: 1.5,
    borderRadius: ms(12),
    marginBottom: ms(20),
    paddingHorizontal: ms(15),
    fontSize: ms(14),
    textAlignVertical: 'top',
    color: COLORS.BLACK,
  },
  createButton: {
    backgroundColor: COLORS.PRIMARY,
    height: ms(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(12),
    marginTop: ms(20),
  },
  createButtonText: {
    fontSize: ms(16),
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: ms(12),
    color: COLORS.RED,
    marginTop: ms(5),
    marginBottom: ms(10),
    paddingHorizontal: ms(10),
  },
});
