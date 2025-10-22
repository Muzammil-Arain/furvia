import { Button, Typography, Wrapper } from 'components/index';
import { IMAGES } from 'constants/assets';
import { VARIABLES } from 'constants/common';
import { SCREENS } from 'constants/routes';
import { navigate, reset } from 'navigation/index';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import { setIsUserLoggedIn } from 'store/slices/appSettings';
import store from 'store/store';
import { COLORS } from 'utils/colors';
import { setItem } from 'utils/storage';

const CompletePetProfile: React.FC = () => {
  return (
    <Wrapper>
      <View style={styles.container}>
        <Image source={IMAGES.Dog_1} style={styles.image} resizeMode='contain' />

        <Typography style={[styles.title, { color: COLORS.PRIMARY }]}>Welcome to FURVIA</Typography>

        <Typography style={[styles.subtitle, { color: COLORS.WHITE }]}>
          Built by Pet Lovers.
        </Typography>
        <Typography style={[styles.subtitle, { color: COLORS.WHITE, marginBottom: ms(20) }]}>
          Made for You.
        </Typography>

        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginTop: 20,
          }}
        >
          <Button onPress={() => navigate(SCREENS.CREATEPETPROFILE)} title='Add another FurBaby' />

          <Button
            style={[styles.secondaryButton, { backgroundColor: COLORS.WHITE }]}
            textStyle={{ color: COLORS.BLACK }}
            onPress={() => {
              setItem(VARIABLES.IS_USER_LOGGED_IN, VARIABLES.IS_USER_LOGGED_IN),
                store.dispatch(setIsUserLoggedIn(true));
              reset(SCREENS.BOTTOM_STACK);
            }}
            title='Go to Home Page'
          />
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ms(20),
  },
  image: {
    width: ms(200),
    height: ms(200),
    marginTop: ms(100),
    marginBottom: ms(30),
    alignSelf: 'center',
  },
  title: {
    fontSize: ms(27),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: ms(10),
  },
  subtitle: {
    fontWeight: '500',
    fontSize: ms(17),
    textAlign: 'center',
  },
  secondaryButton: {
    marginTop: ms(15),
  },
});

export default CompletePetProfile;
