import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/index';
import { ms } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedRe, { FadeInUp } from 'react-native-reanimated';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';

const JobCompletedScreen = ({ route }: any) => {
  const elapsedSeconds = route?.params?.elapsedSeconds ?? 0;

  const h = Math.floor(elapsedSeconds / 3600);
  const m = Math.floor((elapsedSeconds % 3600) / 60);
  const s = Math.floor(elapsedSeconds % 60);

  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();

    Animated.timing(rotate, {
      toValue: 1,
      duration: 2200,
      useNativeDriver: true,
    }).start();
  }, []);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '8deg'],
  });

  return (
    <AppWrapper title='Job Completed'>
      <View style={styles.centerWrap}>
        {/* Animated Checkmark */}
        <Animated.View
          style={[
            styles.checkCircle,
            { transform: [{ scale: scaleAnim }, { rotate: rotateInterpolate }] },
          ]}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/709/709510.png' }}
            resizeMode='contain'
            style={{
              tintColor: COLORS.WHITE,
              width: ms(70),
              height: ms(70),
            }}
          />
        </Animated.View>

        <Typography style={styles.title}>Job Completed!</Typography>
        <Typography style={styles.subtitle}>
          Great work! Payment will be processed automatically.
        </Typography>

        {/* Animated Card */}
        <AnimatedRe.View entering={FadeInUp.duration(450)} style={styles.timeCard}>
          <Typography style={styles.timeCardTitle}>Job Completion Time</Typography>

          <View style={styles.timeRow}>
            {[
              { label: 'Hours', value: h },
              { label: 'Minutes', value: m },
              { label: 'Seconds', value: s },
            ].map((t, i) => (
              <View key={i} style={styles.timeBlock}>
                <Typography style={styles.timeNumber}>
                  {String(t.value).padStart(2, '0')}
                </Typography>
                <Typography style={styles.timeLabel}>{t.label}</Typography>
              </View>
            ))}
          </View>
        </AnimatedRe.View>

        {/* Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            onPress={() => navigate(SCREENS.BOTTOM_STACK)}
            style={styles.primaryBtnWrap}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[COLORS.HEADER_BACKGROUND, COLORS.HEADER_BACKGROUND]}
              style={styles.primaryBtn}
            >
              <Typography style={styles.primaryBtnText}>Back to Home</Typography>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </AppWrapper>
  );
};

export default JobCompletedScreen;

const styles = StyleSheet.create({
  centerWrap: {
    paddingTop: ms(36),
    alignItems: 'center',
  },
  checkCircle: {
    width: ms(110),
    height: ms(110),
    borderRadius: ms(60),
    backgroundColor: COLORS.HEADER_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ms(18),
    elevation: 3,
  },
  title: {
    fontSize: ms(20),
    fontWeight: '700',
    color: COLORS.TEXT,
    marginBottom: ms(8),
  },
  subtitle: {
    textAlign: 'center',
    color: COLORS.GRAY,
    marginHorizontal: ms(36),
  },
  timeCard: {
    marginTop: ms(18),
    backgroundColor: COLORS.WHITE,
    padding: ms(14),
    borderRadius: ms(12),
    width: '92%',
    elevation: 2,
  },
  timeCardTitle: {
    fontWeight: '700',
    fontSize: ms(14),
    marginBottom: ms(10),
    color: COLORS.TEXT,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeBlock: {
    alignItems: 'center',
    flex: 1,
  },
  timeNumber: {
    fontSize: ms(20),
    fontWeight: '700',
    color: COLORS.TEXT,
  },
  timeLabel: {
    fontSize: ms(12),
    color: COLORS.GRAY,
    marginTop: ms(6),
  },
  buttonSection: {
    width: '100%',
    paddingHorizontal: ms(16),
    marginTop: ms(18),
  },
  primaryBtnWrap: {
    marginBottom: ms(12),
  },
  primaryBtn: {
    height: ms(48),
    borderRadius: ms(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: COLORS.WHITE,
    fontWeight: '700',
  },
  linkText: {
    color: COLORS.PRIMARY,
    textAlign: 'center',
    marginTop: ms(8),
    fontWeight: '600',
  },
});
