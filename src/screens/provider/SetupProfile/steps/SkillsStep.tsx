import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/common';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

const sampleSkills = [
  'Small Animal Medicine',
  'Preventive Care',
  'Dental Care',
  'Behavioral Consultation',
  'Emergency Medicine',
  'Surgical Procedures',
  'Geriatric Pet Care',
  'Nutrition Counseling',
];

interface SkillsStepProps {
  onNext: (skills: string[]) => void;
  onBack?: () => void;
}

const SkillsStep: React.FC<SkillsStepProps> = ({ onNext }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const toggleSkill = (skill: string) => {
    setSelected(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill],
    );
    setError(''); // clear error when user selects something
  };

  const handleNext = () => {
    if (selected.length === 0) {
      setError('Please select at least one skill before continuing.');
      return;
    }
    onNext(selected);
  };

  return (
    <AppWrapper useSafeArea={false} Header={false}>
      <Typography style={styles.title}>Specializations & Skills</Typography>

      <View style={styles.skillContainer}>
        {sampleSkills.map(skill => {
          const isSelected = selected.includes(skill);
          return (
            <TouchableOpacity
              key={skill}
              style={[
                styles.skillTag,
                isSelected ? styles.selectedSkill : styles.unselectedSkill,
              ]}
              onPress={() => toggleSkill(skill)}
              activeOpacity={0.8}
            >
              <View style={styles.skillContent}>
                <Icon
                  name={isSelected ? 'close' : 'add'}
                  size={ms(14)}
                  color={isSelected ? '#4FC3C9' : '#666'}
                  style={{ marginRight: ms(6) }}
                />
                <Typography
                  style={[
                    styles.skillText,
                    isSelected ? styles.selectedText : styles.unselectedText,
                  ]}
                >
                  {skill}
                </Typography>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 🔸 Error Message */}
      {error ? <Typography style={styles.errorText}>{error}</Typography> : null}

      {/* 🔸 Next Step Button */}
      <TouchableOpacity activeOpacity={0.8} onPress={handleNext}>
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

export default SkillsStep;

const styles = StyleSheet.create({
  title: {
    fontSize: ms(17),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: ms(15),
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: ms(10),
    padding: ms(12),
    marginBottom: ms(10),
  },
  skillTag: {
    borderRadius: ms(8),
    paddingHorizontal: ms(10),
    paddingVertical: ms(6),
    margin: ms(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedSkill: {
    backgroundColor: '#E6F6F8',
  },
  unselectedSkill: {
    backgroundColor: '#E8E8E8',
  },
  selectedText: {
    color: '#4FC3C9',
    fontWeight: '600',
  },
  unselectedText: {
    color: '#5D5D5D',
  },
  skillText: {
    fontSize: ms(13),
  },
  gradient: {
    paddingVertical: ms(14),
    borderRadius: ms(10),
    alignItems: 'center',
    marginTop: ms(20),
  },
  nextText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(14),
  },
  errorText: {
    color: COLORS.ERROR || 'red',
    fontSize: ms(13),
    marginBottom: ms(10),
    textAlign: 'center',
  },
});