import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';
import { Typography } from 'components/index'; // Assuming you have Typography component
import { AppWrapper } from 'components/common/AppWapper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { onBack } from 'navigation/index';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventNotes, setEventNotes] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const [errors, setErrors] = useState({
    eventName: '',
    eventLocation: '',
    eventNotes: '',
    eventDate: '',
    eventDescription: '',
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleCreateEvent = () => {
    let formValid = true;
    let newErrors = { ...errors };

    // Validation logic
    if (!eventName) {
      formValid = false;
      newErrors.eventName = 'Event Name is required';
    } else {
      newErrors.eventName = '';
    }

    if (!eventLocation) {
      formValid = false;
      newErrors.eventLocation = 'Event Location is required';
    } else {
      newErrors.eventLocation = '';
    }

    if (!eventNotes) {
      formValid = false;
      newErrors.eventNotes = 'Event Notes are required';
    } else {
      newErrors.eventNotes = '';
    }

    if (!eventDate) {
      formValid = false;
      newErrors.eventDate = 'Event Date is required';
    } else {
      newErrors.eventDate = '';
    }

    if (!eventDescription) {
      formValid = false;
      newErrors.eventDescription = 'Event Description is required';
    } else {
      newErrors.eventDescription = '';
    }

    setErrors(newErrors);

    if (!formValid) {
      return; // Do not submit if there are validation errors
    }

    // Handle form submission (e.g., send data to API)
    console.log('Event Created:', {
      eventName,
      eventLocation,
      eventNotes,
      eventDate,
      eventDescription,
    });
    onBack();
    // Alert.alert('Success', 'Event created successfully!');
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    setEventDate(date.toDateString());
    hideDatePicker();
  };

  // Update error state when value changes
  const handleInputChange = (value, field) => {
    // Remove error message when user starts typing
    setErrors(prevState => ({
      ...prevState,
      [field]: '', // Clear error for the specific field
    }));

    if (field === 'eventName') setEventName(value);
    if (field === 'eventLocation') setEventLocation(value);
    if (field === 'eventNotes') setEventNotes(value);
    if (field === 'eventDescription') setEventDescription(value);
  };

  return (
    <AppWrapper title='Create Event'>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Event Name */}
        <TextInput
          style={[styles.input, errors.eventName && styles.inputError]}
          placeholder='Event Name'
          value={eventName}
          onChangeText={(value) => handleInputChange(value, 'eventName')}
        />
        {errors.eventName && <Text style={styles.errorText}>{errors.eventName}</Text>}

        {/* Event Location */}
        <TextInput
          style={[styles.input, errors.eventLocation && styles.inputError]}
          placeholder='Event Location'
          value={eventLocation}
          onChangeText={(value) => handleInputChange(value, 'eventLocation')}
        />
        {errors.eventLocation && <Text style={styles.errorText}>{errors.eventLocation}</Text>}

        {/* Event Notes */}
        <TextInput
          style={[styles.input, errors.eventNotes && styles.inputError]}
          placeholder='Event Notes'
          value={eventNotes}
          onChangeText={(value) => handleInputChange(value, 'eventNotes')}
        />
        {errors.eventNotes && <Text style={styles.errorText}>{errors.eventNotes}</Text>}

        {/* Select Event Date */}
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
          onChangeText={(value) => handleInputChange(value, 'eventDescription')}
          multiline
        />
        {errors.eventDescription && <Text style={styles.errorText}>{errors.eventDescription}</Text>}

        {/* Create Event Button */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
          <Text style={styles.createButtonText}>Create Event</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </AppWrapper>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ms(20),
    backgroundColor: COLORS.WHITE,
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
    marginTop: 10,
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

export default CreateEvent;