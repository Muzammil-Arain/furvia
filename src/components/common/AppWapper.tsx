import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLORS, isIOS } from 'utils/index';
import { Icon, Loader, Typography } from './index';
import { RootState, useAppSelector } from 'types/reduxTypes';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ms } from 'react-native-size-matters';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { onBack } from 'navigation/index';

interface WrapperProps {
  children: React.ReactNode;
  useSafeArea?: boolean;
  useScrollView?: boolean;
  backgroundColor?: string;
  darkMode?: boolean;
  showAppLoader?: boolean;
  goBack?: boolean;
  loading?: boolean;
  title?: string;
  onRightPress?: () => void;
  onBackPress?: () => void;
  onEndIcon?: any;
  Header?: boolean;
}

export const AppWrapper: React.FC<WrapperProps> = ({
  children,
  useSafeArea = true,
  useScrollView = true,
  backgroundColor = COLORS.WHITE,
  darkMode = false,
  showAppLoader = false,
  goBack = true,
  title,
  onEndIcon,
  loading,
  Header = true,
  onRightPress,
}) => {
  const isAppLoading = useAppSelector((state: RootState) => state.app.isAppLoading);
  const insets = useSafeAreaInsets();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const Content = (
    <KeyboardAvoidingView
      behavior={isIOS() ? 'padding' : isKeyboardVisible ? 'height' : undefined}
      style={[styles.flex, { paddingBottom: insets.bottom, backgroundColor }]}
    >
      {useScrollView ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={styles.innerContent}>{children}</View>
      )}
    </KeyboardAvoidingView>
  );

  return (
    <>
      {useSafeArea && (
        <SafeAreaView
          edges={['top']}
          style={[styles.safeArea, { backgroundColor: COLORS.HEADER_BACKGROUND }]}
        />
      )}

      <StatusBar
        backgroundColor={COLORS.HEADER_BACKGROUND}
        barStyle={darkMode ? 'light-content' : 'light-content'}
      />

      {(loading || (showAppLoader && isAppLoading)) && <Loader />}

      {/* ✅ Cool Animated Header */}
      {Header && (
        <Animated.View entering={FadeInDown.duration(500)} style={styles.headerContainer}>
          <View style={styles.headerRow}>
            {/* Left: Back Button */}
            {goBack ? (
              <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                <Icon
                  componentName='Ionicons'
                  iconName='arrow-back'
                  color={COLORS.WHITE}
                  size={22}
                />
              </TouchableOpacity>
            ) : (
              <View style={{ width: ms(40) }} />
            )}

            {/* Center: Title */}
            <View style={styles.titleContainer}>
              <Typography style={styles.headerTitle} numberOfLines={1}>
                {title}
              </Typography>
            </View>

            {/* Right: Either Custom Icon or End Icon */}
            <View style={styles.rightContainer}>
              {onEndIcon ? (
                onEndIcon()
              ) : onRightPress ? (
                <TouchableOpacity style={{}} onPress={onRightPress}>
                  <Image
                    source={require('../../assets/images/common/plus.png')}
                    style={styles.plusIcon}
                  />
                </TouchableOpacity>
              ) : (
                <View style={{ width: ms(30) }} />
              )}
            </View>
          </View>
        </Animated.View>
      )}

      {Content}
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: ms(16),
  },
  innerContent: {
    flex: 1,
    padding: ms(16),
  },
  headerContainer: {
    backgroundColor: COLORS.HEADER_BACKGROUND,
    paddingVertical: ms(24),
    paddingHorizontal: ms(16),
    borderBottomLeftRadius: ms(20),
    borderBottomRightRadius: ms(20),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: ms(20),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    minWidth: ms(40),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  plusIcon: {
    width: ms(26),
    height: ms(26),
  },
  headerTitle: {
    fontSize: ms(18),
    fontWeight: '600',
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
