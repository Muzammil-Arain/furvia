import React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import Loader from './Loader';
import { lightTheme } from '../../theme';
import { BACKGROUND_COLOUR_IMAGE } from '../../assets';
import Header from './Header';

type Props = {
  children: React.ReactNode;
  loading?: boolean; // loader control
  bgImage?: any; // background image
  scrollEnabled?: boolean; // agar scroll chahiye ya nahi
};

const BackgroundWrapper: React.FC<Props> = ({
  children,
  loading = false,
  bgImage,
  scrollEnabled = true,
}) => {
  return (
    <ImageBackground
      source={BACKGROUND_COLOUR_IMAGE}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
        translucent
      />
      <Header />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {scrollEnabled ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        ) : (
          <View style={styles.scrollContent}>{children}</View>
        )}
      </KeyboardAvoidingView>

      {/* Loader Overlay */}
      <Loader visible={loading} message="Loading..." />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: ms(16), // responsive padding
  },
});

export default BackgroundWrapper;
