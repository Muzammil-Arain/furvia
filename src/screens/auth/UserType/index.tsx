import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { Button, Typography, Wrapper } from 'components/index';
import { IMAGES } from 'constants/assets';
import { COLORS } from 'utils/colors';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';
import { useAppDispatch } from 'types/reduxTypes';
import { setIsUserLoggedIn, setUserRole } from 'store/slices/appSettings';
import { setItem } from 'utils/storage';
import { VARIABLES } from 'constants/common';
import store from 'store/store';

const UserType: React.FC = () => {
  // Animations
  const imageScale = useSharedValue(0.6);
  const textOpacity = useSharedValue(0);
  const buttonTranslate = useSharedValue(100);

  const dispatch = useAppDispatch();

  useEffect(() => {
    imageScale.value = withSpring(1, { damping: 8, stiffness: 80 });
    textOpacity.value = withTiming(1, { duration: 600 });
    buttonTranslate.value = withSpring(0, { damping: 10 });
  }, []);

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonTranslate.value }],
  }));

  return (
    <Wrapper goBack={false}>
      <View style={styles.container}>
        {/* Animated Image */}
        <Animated.View style={imageStyle}>
          <Image source={IMAGES.Dog_1} style={styles.image} resizeMode='contain' />
        </Animated.View>

        {/* Animated Text */}
        <Animated.View style={textStyle}>
          <Typography style={[styles.title, { color: COLORS.WHITE }]}>Choose Your Role</Typography>

          <Typography style={[styles.subtitle, { color: COLORS.WHITE }]}>
            Select how you want to use Furvia.
          </Typography>
          <Typography style={[styles.subtitle, { color: COLORS.WHITE, marginBottom: ms(30) }]}>
            Built with love for pets and their people.
          </Typography>
        </Animated.View>

        {/* Animated Buttons */}
        <Animated.View style={[buttonStyle, { width: '100%' }]}>
          <Button
            onPress={() => {
              dispatch(setUserRole('user'));
              // setItem(VARIABLES.IS_USER_LOGGED_IN, VARIABLES.IS_USER_LOGGED_IN);
              // store.dispatch(setIsUserLoggedIn(true));
              navigate(SCREENS.LOGIN);
            }}
            title='I’m a Pet Owner'
          />

          <Button
            onPress={() => {
              dispatch(setUserRole('provider'));
              // setItem(VARIABLES.IS_USER_LOGGED_IN, VARIABLES.IS_USER_LOGGED_IN);
              // store.dispatch(setIsUserLoggedIn(true));
              navigate(SCREENS.LOGIN);
            }}
            style={[styles.secondaryButton, { backgroundColor: COLORS.WHITE }]}
            textStyle={{ color: COLORS.BLACK }}
            title='I’m a Service Provider'
          />
        </Animated.View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: ms(200),
    height: ms(200),
    marginBottom: ms(30),
  },
  title: {
    fontSize: ms(27),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: ms(10),
  },
  subtitle: {
    fontWeight: '500',
    fontSize: ms(15),
    textAlign: 'center',
  },
  secondaryButton: {
    marginTop: ms(15),
  },
});

export default UserType;
