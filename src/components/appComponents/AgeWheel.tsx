import { Typography } from 'components/common';
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { ms } from 'react-native-size-matters';

const ITEM_HEIGHT = ms(50);

interface AgeWheelProps {
  data: string[];
  onValueChange: (value: string) => void;
  initialIndex?: number;
}

const AgeWheel: React.FC<AgeWheelProps> = ({ data, onValueChange, initialIndex = 0 }) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const flatListRef = useRef<FlatList<string>>(null);

  useEffect(() => {
    // Initial scroll to selected index
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: initialIndex,
        animated: false,
      });
    }
  }, [initialIndex]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    setSelectedIndex(index);
    onValueChange(data[index]);
  };

  return (
    <View style={styles.wheelContainer}>
      {/* Highlight Bar */}
      <View style={styles.highlight} />

      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate='fast'
        bounces={false}
        scrollEnabled={true}
        nestedScrollEnabled={true} // ✅ added
        contentContainerStyle={{
          zIndex:999,
          paddingVertical: ITEM_HEIGHT * 2,
        }}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={({ item, index }) => (
          <View style={[styles.item, index === selectedIndex && styles.selectedItem]}>
            <Typography
              style={[styles.itemText, index === selectedIndex && styles.selectedItemText]}
            >
              {item}
            </Typography>
          </View>
        )}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wheelContainer: {
    zIndex:999,
    height: ITEM_HEIGHT * 5,
    width: ms(100),
    overflow: 'hidden',
  },
  highlight: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    height: ITEM_HEIGHT,
    width: '100%',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#00B3C3',
    zIndex: 999,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: ms(18),
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '500',
  },
  selectedItemText: {
    fontSize: ms(22),
    color: '#00B3C3',
    fontWeight: '700',
  },
});

export default AgeWheel;
