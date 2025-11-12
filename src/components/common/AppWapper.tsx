import React, { useContext, useEffect, useState } from 'react';
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
import { ThemeContext } from 'theme/ThemeContext';

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
  backgroundColor,
  showAppLoader = false,
  goBack = true,
  title,
  onEndIcon,
  loading,
  Header = true,
  onRightPress,
}) => {
  const { theme, isDarkMode } = useContext(ThemeContext);
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
      style={[
        styles.flex,
        {
          paddingBottom: insets.bottom,
          backgroundColor: backgroundColor || theme.colors.background,
        },
      ]}
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
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* ✅ SafeArea top color */}
      {useSafeArea && (
        <SafeAreaView
          edges={['top']}
          style={[styles.safeArea, { backgroundColor: theme.colors.HEADER_BACKGROUND }]}
        />
      )}

      {/* ✅ StatusBar color and style */}
      <StatusBar
        backgroundColor={theme.colors.HEADER_BACKGROUND}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      {(loading || (showAppLoader && isAppLoading)) && <Loader />}

      {/* ✅ Header */}
      {Header && (
        <Animated.View
          entering={FadeInDown.duration(500)}
          style={[styles.headerContainer, { backgroundColor: theme.colors.HEADER_BACKGROUND }]}
        >
          <View style={styles.headerRow}>
            {/* Left: Back Button */}
            {goBack ? (
              <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                <Icon
                  componentName='Ionicons'
                  iconName='arrow-back'
                  color={COLORS.WHITE}
                  // color={theme.colors.text}
                  size={22}
                />
              </TouchableOpacity>
            ) : (
              <View style={{ width: ms(40) }} />
            )}

            {/* Center: Title */}
            <View style={styles.titleContainer}>
              <Typography
                style={[styles.headerTitle, { color: theme.colors.background }]}
                numberOfLines={1}
              >
                {title}
              </Typography>
            </View>

            {/* Right: Custom Icon or End Icon */}
            <View style={styles.rightContainer}>
              {onEndIcon ? (
                onEndIcon()
              ) : onRightPress ? (
                <TouchableOpacity onPress={onRightPress}>
                  <Image
                    source={require('../../assets/images/common/plus.png')}
                    style={[styles.plusIcon, { tintColor: theme.colors.text }]}
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
    </View>
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
    textAlign: 'center',
  },
});
