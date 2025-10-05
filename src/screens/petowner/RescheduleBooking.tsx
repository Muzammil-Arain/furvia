import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import CalendarPicker from 'react-native-calendar-picker';
import { onBack } from 'navigation/index';
import Animated, { FadeIn } from 'react-native-reanimated';

const RescheduleBooking = () => {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState('12:00 PM');
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  const timeSlots = ['12:00 PM', '01:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'];

  return (
    <AppWrapper title='Reschedule Booking'>
      <View style={styles.container}>
        {/* Date Section */}
        <Typography style={styles.label}>Select Date</Typography>

        <View style={styles.calendarContainer}>
          <CalendarPicker
            onDateChange={setSelectedDate}
            selectedStartDate={selectedDate}
            selectedDayColor={COLORS.PRIMARY}
            selectedDayTextColor='#fff'
            textStyle={styles.calendarText}
            monthTitleStyle={styles.calendarHeader}
            yearTitleStyle={styles.calendarHeader}
            previousTitleStyle={styles.calendarArrow}
            nextTitleStyle={styles.calendarArrow}
            todayBackgroundColor='transparent'
            minDate={today}
            width={ms(330)}
            scaleFactor={ms(340)}
          />
        </View>

        {/* Time Section */}
        <Typography style={[styles.label, { marginTop: ms(20) }]}>Start Time</Typography>

        <FlatList
          data={timeSlots}
          numColumns={3}
          contentContainerStyle={styles.timeList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.timeButton, selectedTime === item && styles.selectedTimeButton]}
              onPress={() => setSelectedTime(item)}
            >
              <Typography
                style={[styles.timeText, selectedTime === item && styles.selectedTimeText]}
              >
                {item}
              </Typography>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
        />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setCancelModalVisible(true)} style={styles.cancelButton}>
            <Typography style={styles.cancelText}>Cancel</Typography>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onBack()} style={styles.rescheduleButton}>
            <Typography style={styles.rescheduleText}>Reschedule</Typography>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cancel Modal */}
      <Modal visible={cancelModalVisible} transparent animationType='fade'>
        <Animated.View entering={FadeIn} style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Typography style={styles.modalTitle}>Cancel Order?</Typography>
            <Typography style={styles.modalText}>
              Are you sure you want to cancel
              {/* <Typography style={{ fontWeight: '700' }}>{selectedOrder?.title}</Typography>? */}
            </Typography>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setCancelModalVisible(false)}
              >
                <Typography style={styles.modalCancelText}>No, Keep</Typography>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalConfirmBtn}
                onPress={() => setCancelModalVisible(false)}
              >
                <Typography style={styles.modalConfirmText}>Yes, Cancel</Typography>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Modal>
    </AppWrapper>
  );
};

export default RescheduleBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(20),
    paddingBottom: ms(30),
  },
  label: {
    fontSize: ms(16),
    fontWeight: 'bold',
    color: COLORS.TEXT,
    marginBottom: ms(10),
  },
  calendarContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  calendarText: {
    color: COLORS.TEXT,
  },
  calendarHeader: {
    color: COLORS.TEXT,
    fontWeight: 'bold',
  },
  calendarArrow: {
    color: COLORS.TEXT,
  },
  timeList: {
    alignItems: 'center',
  },
  timeButton: {
    backgroundColor: '#F4F4F4',
    paddingVertical: ms(10),
    paddingHorizontal: ms(20),
    borderRadius: ms(8),
    margin: ms(5),
  },
  selectedTimeButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  timeText: {
    color: COLORS.TEXT,
    fontSize: ms(13),
    fontWeight: '500',
  },
  selectedTimeText: {
    color: COLORS.WHITE,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(30),
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingVertical: ms(14),
    borderRadius: ms(10),
    marginRight: ms(10),
    alignItems: 'center',
  },
  rescheduleButton: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: ms(14),
    borderRadius: ms(10),
    marginLeft: ms(10),
    alignItems: 'center',
  },
  cancelText: {
    color: COLORS.TEXT,
    fontWeight: '600',
  },
  rescheduleText: {
    color: COLORS.WHITE,
    fontWeight: '600',
  },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(12),
    width: '80%',
    padding: ms(20),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: ms(18),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: ms(10),
  },
  modalText: {
    fontSize: ms(13),
    color: COLORS.GRAY,
    textAlign: 'center',
  },
  modalBtnRow: {
    flexDirection: 'row',
    marginTop: ms(20),
    gap: ms(10),
  },
  modalCancelBtn: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 1.5,
    borderRadius: ms(8),
    paddingVertical: ms(8),
    width: ms(100),
    alignItems: 'center',
  },
  modalCancelText: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
  modalConfirmBtn: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: ms(8),
    paddingVertical: ms(8),
    width: ms(120),
    alignItems: 'center',
  },
  modalConfirmText: {
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  CancelBtn: {
    borderColor: COLORS.RED,
    borderWidth: 1,
    paddingVertical: 6,
    borderRadius: ms(8),
    width: ms(130),
    alignItems: 'center',
  },
  CancelText: {
    color: COLORS.RED,
    fontWeight: '600',
    fontSize: ms(11),
  },
});
