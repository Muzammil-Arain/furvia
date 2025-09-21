import { Typography } from 'components/common';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from 'react-native-wheel-pick';
import { COLORS } from 'utils/colors';

const PetAgeWheel: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2');
  const [selectedMonth, setSelectedMonth] = useState('6');

  // years array 0-20
  const years = Array.from({ length: 21 }, (_, i) => `${i}`);
  // months array 0-11
  const months = Array.from({ length: 12 }, (_, i) => `${i}`);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Years Picker */}
        <View style={styles.pickerWrapper}>
          <Picker
            textSize={30}
            style={styles.picker}
            selectedValue={selectedYear}
            pickerData={years}
            textColor={COLORS.WHITE}
            selectTextColor={COLORS.PRIMARY}
            isShowSelectBackground={false}
            selectBackgroundColor='#8080801A'
            isShowSelectLine={false}
            selectLineColor='black'
            selectLineSize={6}
            isCyclic={true}
            onValueChange={(value: string) => setSelectedYear(value)}
          />
          <Typography style={styles.unit}>Years</Typography>
        </View>

        {/* Months Picker */}
        <View style={styles.pickerWrapper}>
          <Picker
            style={styles.picker}
            selectedValue={selectedMonth}
            pickerData={months}
            textColor={COLORS.WHITE}
            selectTextColor={COLORS.PRIMARY}
            isShowSelectBackground={false}
            selectBackgroundColor='#8080801A'
            isShowSelectLine={false}
            selectLineColor='black'
            selectLineSize={6}
            isCyclic={true}
            onValueChange={(value: string) => setSelectedMonth(value)}
          />
          <Typography style={styles.unit}>Months</Typography>
        </View>
      </View>

      {/* <Typography style={styles.selectedText}>
        Selected Age: {selectedYear} years {selectedMonth} months
      </Typography> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
  },
  label: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pickerWrapper: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  picker: {
    width: 120,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  unit: {
    marginTop: 10,
    fontSize: 22,
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default PetAgeWheel;
