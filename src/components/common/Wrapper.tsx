import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  View,
} from 'react-native';
import { COLORS, isIOS } from 'utils/index';
import { Loader } from './index';
import { RootState, useAppSelector } from 'types/reduxTypes';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from './Header';

interface WrapperProps {
  children: React.ReactNode;
  useSafeArea?: boolean;
  useScrollView?: boolean;
  backgroundColor?: string;
  darkMode?: boolean;
  loader?: boolean;
  showAppLoader?: boolean;
  goBack?: boolean;
  loading?: boolean;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  useSafeArea = true,
  useScrollView = true,
  backgroundColor = '#56077E',
  darkMode = false,
  showAppLoader = false,
  goBack = true,
  loading,
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
      style={[styles.flex, { paddingBottom: insets.bottom }]}
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
        <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor }]} />
      )}

      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      />

      {(loading || (showAppLoader && isAppLoading)) && <Loader />}

      <ImageBackground
        source={require('../../assets/images/common/background_colour.jpg')}
        style={styles.flex}
        resizeMode='cover'
      >
        {/* ✅ Header padding se bahar */}
        <Header goBack={goBack} />

        {/* ✅ Padding sirf content ke liye */}
        {Content}
      </ImageBackground>
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
    padding: 16,
  },
  innerContent: {
    flex: 1,
    padding: 16,
  },
});
