// ExperienceStep.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Typography } from 'components/common';
import { AppWrapper } from 'components/common/AppWapper';
import { COLORS } from 'utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';

type Experience = {
  id: string;
  company: string;
  title: string;
  details: string;
  from: string; // YYYY-MM-DD
  to: string; // YYYY-MM-DD or 'present'
  present: boolean;
};

interface Props {
  onBack?: () => void;
  onFinish: (payload: { experiences: Experience[] }) => void;
}

const emptyExperience = (): Experience => ({
  id: String(Date.now() + Math.random()),
  company: '',
  title: '',
  details: '',
  from: '',
  to: '',
  present: false,
});

const ExperienceStep: React.FC<Props> = ({ onBack, onFinish }) => {
  const [experiences, setExperiences] = useState<Experience[]>([emptyExperience()]);
  const [errors, setErrors] = useState<Record<string, Partial<Record<keyof Experience, string>>>>(
    {},
  );

  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<{ id: string; field: 'from' | 'to' } | null>(
    null,
  );
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 360, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(prev => prev.map(e => (e.id === id ? { ...e, [field]: value } : e)));

    // clear error for that field if any
    setErrors(prev => {
      if (!prev[id] || !prev[id]![field]) return prev;
      const next = { ...prev };
      next[id] = { ...next[id]!, [field]: '' };
      return next;
    });
  };

  const addExperience = () => {
    // ensure last entry is not empty before adding
    const last = experiences[experiences.length - 1];
    if (!last.company.trim() && !last.title.trim() && !last.details.trim() && !last.from) {
      Alert.alert(
        'Complete entry',
        'Please fill at least the company or title or from date before adding another.',
      );
      return;
    }
    setExperiences(prev => [...prev, emptyExperience()]);
  };

  const removeExperience = (id: string) => {
    setExperiences(prev => prev.filter(e => e.id !== id));
    setErrors(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const showPicker = (id: string, field: 'from' | 'to') => {
    setPickerTarget({ id, field });
    setPickerVisible(true);
  };

  const hidePicker = () => {
    setPickerVisible(false);
    setPickerTarget(null);
  };

  const handleDateConfirm = (date: Date) => {
    if (!pickerTarget) {
      hidePicker();
      return;
    }
    const iso = moment(date).format('YYYY-MM-DD');
    updateExperience(pickerTarget.id, pickerTarget.field, iso);
    hidePicker();
  };

  const validateAll = (): boolean => {
    const newErrors: typeof errors = {};
    experiences.forEach(exp => {
      const e: Partial<Record<keyof Experience, string>> = {};
      if (!exp.company.trim() && !exp.title.trim()) {
        e.company = 'Company or Title required';
        e.title = 'Company or Title required';
      }
      if (!exp.from) e.from = 'Start date required';
      if (!exp.present && !exp.to) e.to = 'End date required or mark Present';
      // If both dates present, ensure from <= to
      if (exp.from && exp.to && !exp.present) {
        const fromM = moment(exp.from, 'YYYY-MM-DD');
        const toM = moment(exp.to, 'YYYY-MM-DD');
        if (fromM.isAfter(toM)) e.to = 'End date must be after start date';
      }
      if (Object.keys(e).length > 0) newErrors[exp.id] = e;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (experiences.length === 0) {
      Alert.alert('No experience', 'Please add at least one experience or skip.');
      return;
    }
    if (!validateAll()) {
      // scroll to first error? for now just alert
      Alert.alert('Validation', 'Please fix the errors shown in the form.');
      return;
    }

    // prepare payload (you can adjust shape as needed)
    const payload = {
      experiences: experiences.map(exp => ({
        ...exp,
        // keep present field boolean and to='' => present true
        to: exp.present ? 'present' : exp.to,
      })),
    };

    onFinish(payload);
  };

  return (
    <AppWrapper useSafeArea={false} Header={false}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY }] }}>
        <Typography style={styles.title}>Add Experience</Typography>

        {experiences.map((exp, idx) => (
          <View key={exp.id} style={styles.card}>
            {/* company */}
            <TextInput
              placeholder='Company'
              value={exp.company}
              onChangeText={t => updateExperience(exp.id, 'company', t)}
              style={styles.input}
              placeholderTextColor={COLORS.GRAY_LIGHT}
            />
            {errors[exp.id]?.company ? (
              <Typography style={styles.errorText}>{errors[exp.id]?.company}</Typography>
            ) : null}

            {/* title */}
            <TextInput
              placeholder='Job Name / Type'
              value={exp.title}
              onChangeText={t => updateExperience(exp.id, 'title', t)}
              style={styles.input}
              placeholderTextColor={COLORS.GRAY_LIGHT}
            />
            {errors[exp.id]?.title ? (
              <Typography style={styles.errorText}>{errors[exp.id]?.title}</Typography>
            ) : null}

            {/* details */}
            <TextInput
              placeholder='Your job details'
              value={exp.details}
              onChangeText={t => updateExperience(exp.id, 'details', t)}
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={3}
            />

            {/* from / to */}
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => showPicker(exp.id, 'from')}
                style={[styles.dateBtn]}
                activeOpacity={0.7}
              >
                <Icon name='calendar-outline' size={ms(16)} color={COLORS.PRIMARY} />
                <Typography style={styles.dateText}>
                  {exp.from ? moment(exp.from).format('MMM DD, YYYY') : 'From'}
                </Typography>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => showPicker(exp.id, 'to')}
                style={[styles.dateBtn]}
                activeOpacity={0.7}
                disabled={exp.present}
              >
                <Icon name='calendar-outline' size={ms(16)} color={COLORS.PRIMARY} />
                <Typography style={[styles.dateText, exp.present && { opacity: 0.5 }]}>
                  {exp.present ? 'Present' : exp.to ? moment(exp.to).format('MMM DD, YYYY') : 'To'}
                </Typography>
              </TouchableOpacity>
            </View>
            <View style={styles.rowBetween}>
              <View />
              <View style={styles.presentRow}>
                <TouchableOpacity
                  onPress={() => updateExperience(exp.id, 'present', !exp.present)}
                  style={[styles.checkbox, exp.present && styles.checkboxChecked]}
                  activeOpacity={0.8}
                >
                  {exp.present ? <Icon name='checkmark' size={ms(14)} color='#fff' /> : null}
                </TouchableOpacity>
                <Typography style={styles.presentText}>Present</Typography>
              </View>
            </View>

            {errors[exp.id]?.from ? (
              <Typography style={styles.errorText}>{errors[exp.id]?.from}</Typography>
            ) : null}
            {errors[exp.id]?.to ? (
              <Typography style={styles.errorText}>{errors[exp.id]?.to}</Typography>
            ) : null}

            {/* remove button */}
            {experiences.length > 1 && (
              <TouchableOpacity
                onPress={() => removeExperience(exp.id)}
                style={styles.removeBtn}
                activeOpacity={0.8}
              >
                <Typography style={styles.removeText}>Remove</Typography>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* add another */}
        <TouchableOpacity onPress={addExperience} style={styles.addBtn} activeOpacity={0.8}>
          <Icon name='add' size={ms(16)} color={COLORS.WHITE} />
          <Typography style={styles.addText}> Add Another Experience</Typography>
        </TouchableOpacity>

        {/* actions */}
        <View style={{ marginTop: ms(18) }}>
          <TouchableOpacity onPress={handleSubmit} activeOpacity={0.85}>
            <LinearGradient
              colors={[COLORS.HEADER_BACKGROUND, COLORS.HEADER_BACKGROUND]}
              style={styles.primaryBtn}
            >
              <Typography style={styles.primaryBtnText}>Start My Journey</Typography>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Date Picker */}
      <DateTimePickerModal
        isVisible={pickerVisible}
        mode='date'
        onConfirm={handleDateConfirm}
        onCancel={hidePicker}
        maximumDate={new Date()}
      />
    </AppWrapper>
  );
};

export default ExperienceStep;

const styles = StyleSheet.create({
  title: {
    fontSize: ms(18),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: ms(14),
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(12),
    padding: ms(12),
    marginBottom: ms(14),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: ms(8),
    paddingHorizontal: ms(10),
    paddingVertical: ms(8),
    marginBottom: ms(8),
    fontSize: ms(13),
    color: COLORS.BLACK,
    height: ms(42),
  },
  textArea: {
    height: ms(80),
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: ms(8),
    paddingHorizontal: ms(10),
    paddingVertical: ms(10),
    width: '48%',
  },
  dateText: {
    marginLeft: ms(8),
    color: COLORS.BLACK,
    fontSize: ms(13),
  },
  presentRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: ms(18),
    height: ms(18),
    borderRadius: ms(2),
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ms(8),
  },
  checkboxChecked: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  presentText: {
    textAlign: 'center',
    color: COLORS.BLACK,
    fontSize: ms(13),
    marginTop: 3,
  },
  removeBtn: {
    marginTop: ms(10),
    alignSelf: 'flex-end',
  },
  removeText: {
    color: COLORS.ERROR || 'red',
    fontWeight: '600',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: ms(12),
    borderRadius: ms(10),
    marginTop: ms(6),
  },
  addText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    marginLeft: ms(8),
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    paddingHorizontal: ms(18),
    paddingVertical: ms(12),
    borderRadius: ms(10),
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  backText: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
  primaryBtn: {
    paddingHorizontal: ms(18),
    paddingVertical: ms(12),
    borderRadius: ms(10),
  },
  primaryBtnText: {
    color: COLORS.WHITE,
    fontWeight: '700',
    textAlign: 'center',
  },
  errorText: {
    color: COLORS.ERROR || 'red',
    fontSize: ms(12),
    marginBottom: ms(6),
  },
});
