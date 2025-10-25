import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from 'components/common';
import { AppWrapper } from 'components/common/AppWapper';
import { COLORS } from 'utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { ms } from 'react-native-size-matters';
import moment from 'moment';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AvailabilityStep = ({
  onNext,
  onBack,
}: {
  onNext: (data: any) => void;
  onBack?: () => void;
}) => {
  const [availability, setAvailability] = useState<{
    [key: string]: { enabled: boolean; start: string; end: string };
  }>({});
  const [showPicker, setShowPicker] = useState<{ day: string; type: 'start' | 'end' | null }>({
    day: '',
    type: null,
  });
  const [tempTime, setTempTime] = useState(new Date());

  const handleToggleDay = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        enabled: !prev[day]?.enabled,
        start: prev[day]?.start || '09:00 AM',
        end: prev[day]?.end || '05:00 PM',
      },
    }));
  };

  const handleTimeChange = (_: any, selectedDate?: Date) => {
    if (selectedDate && showPicker.day && showPicker.type) {
      const timeStr = moment(selectedDate).format('hh:mm A');
      setAvailability(prev => ({
        ...prev,
        [showPicker.day]: {
          ...prev[showPicker.day],
          [showPicker.type]: timeStr,
        },
      }));
    }
    setShowPicker({ day: '', type: null });
  };

  const validateAndNext = () => {
    const activeDays = Object.keys(availability).filter(d => availability[d]?.enabled);
    if (activeDays.length === 0) {
      alert('Please select at least one available day.');
      return;
    }
    onNext(availability);
  };

  return (
    <AppWrapper useSafeArea={false} Header={false}>
      <Typography style={styles.title}>Set Your Availability</Typography>

      {days.map(day => {
        const dayData = availability[day] || {};
        const isEnabled = dayData.enabled;
        return (
          <View key={day} style={styles.dayCard}>
            <TouchableOpacity
              style={[styles.checkbox, isEnabled && styles.checkboxActive]}
              onPress={() => handleToggleDay(day)}
              activeOpacity={0.8}
            >
              {isEnabled && <Icon name='checkmark' size={ms(16)} color={COLORS.WHITE} />}
            </TouchableOpacity>

            <View style={styles.dayInfo}>
              <Typography style={styles.dayLabel}>{day}</Typography>
              {isEnabled ? (
                <View style={styles.timeRow}>
                  <TouchableOpacity
                    style={styles.timeButton}
                    onPress={() => setShowPicker({ day, type: 'start' })}
                  >
                    <Typography style={styles.timeText}>{dayData.start}</Typography>
                    <Icon name='time-outline' size={ms(16)} color={COLORS.PRIMARY_DARK} />
                  </TouchableOpacity>

                  <Typography style={styles.toText}>to</Typography>

                  <TouchableOpacity
                    style={styles.timeButton}
                    onPress={() => setShowPicker({ day, type: 'end' })}
                  >
                    <Typography style={styles.timeText}>{dayData.end}</Typography>
                    <Icon name='time-outline' size={ms(16)} color={COLORS.PRIMARY_DARK} />
                  </TouchableOpacity>
                </View>
              ) : (
                <Typography style={styles.offText}>Day Off</Typography>
              )}
            </View>
          </View>
        );
      })}

      {/* Time Picker */}
      {showPicker.type && (
        <DateTimePicker
          value={tempTime}
          mode='time'
          is24Hour={false}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}

      {/* Next Step Button */}
      <TouchableOpacity activeOpacity={0.8} onPress={validateAndNext} style={styles.nextWrapper}>
        <LinearGradient
          colors={[COLORS.HEADER_BACKGROUND, COLORS.HEADER_BACKGROUND]}
          style={styles.gradient}
        >
          <Typography style={styles.nextText}>Next Step</Typography>
        </LinearGradient>
      </TouchableOpacity>
    </AppWrapper>
  );
};

export default AvailabilityStep;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(20),
    paddingVertical: ms(25),
  },
  title: {
    fontSize: ms(17),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: ms(15),
  },
  dayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(12),
    paddingVertical: ms(12),
    paddingHorizontal: ms(14),
    marginBottom: ms(10),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  checkbox: {
    width: ms(22),
    height: ms(22),
    borderRadius: ms(2),
    borderWidth: 1.5,
    borderColor: COLORS.GRAY_DARK,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ms(12),
  },
  checkboxActive: {
    backgroundColor: COLORS.HEADER_BACKGROUND,
    borderColor: COLORS.HEADER_BACKGROUND,
  },
  dayInfo: {
    flex: 1,
  },
  dayLabel: {
    fontWeight: '500',
    fontSize: ms(13),
    color: COLORS.BLACK,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ms(6),
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F6F8',
    borderRadius: ms(8),
    paddingVertical: ms(6),
    paddingHorizontal: ms(10),
  },
  timeText: {
    fontSize: ms(13),
    color: COLORS.PRIMARY_DARK,
    marginRight: ms(4),
  },
  toText: {
    marginHorizontal: ms(8),
    color: COLORS.GRAY_DARK,
    fontSize: ms(13),
  },
  offText: {
    color: COLORS.GRAY_DARK,
    fontSize: ms(12),
  },
  nextWrapper: {
    marginTop: ms(30),
  },
  gradient: {
    paddingVertical: ms(14),
    borderRadius: ms(10),
    alignItems: 'center',
  },
  nextText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(14),
  },
});
