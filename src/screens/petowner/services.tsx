import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Icon, Typography } from 'components/index';
import { COLORS } from 'utils/colors';
import { ms } from 'react-native-size-matters';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';

// Dummy Data
const servicesData = [
  { id: '1', title: 'Groomer', icon: require('../../assets/icons/services/Groomer.png') },
  { id: '2', title: 'Training', icon: require('../../assets/icons/services/Training.png') },
  { id: '3', title: 'Sitting', icon: require('../../assets/icons/services/Training.png') },
  { id: '4', title: 'Dermatology', icon: require('../../assets/icons/services/Groomer.png') },
  { id: '5', title: 'Walking', icon: require('../../assets/icons/services/Training.png') },
  { id: '6', title: 'Vets', icon: require('../../assets/icons/services/Vets.png') },
  { id: '7', title: 'Nutrition', icon: require('../../assets/icons/services/Vector.png') },
  { id: '7', title: 'Nutrition', icon: require('../../assets/icons/services/Nutrition.png') },
];

const Services = () => {
  const renderService = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity onPress={() => navigate(SCREENS.ServiceDetails)}>
      <Animated.View
        entering={FadeInDown.delay(index * 100).springify()}
        style={styles.serviceCard}
      >
        <View style={styles.iconWrapper}>
          <Image source={item.icon} resizeMode='contain' style={styles.serviceIcon} />
        </View>
        <Typography style={styles.serviceText}>{item.title}</Typography>
      </Animated.View>
    </TouchableOpacity>
  );

  const BottomCard = () => (
    <Animated.View entering={FadeInDown.delay(500).springify()} style={styles.bottomCard}>
      <View style={styles.bottomRow}>
        <Image
          source={require('../../assets/images/common/serviceBanner.png')}
          resizeMode='cover'
          style={styles.bottomImage}
        />
        <Typography style={styles.bottomText}>
          Our Experience Trainers are ready to take care of your pets
        </Typography>
        <TouchableOpacity onPress={() => navigate(SCREENS.TrainersScreen)} style={styles.forwardButton}>
          <Icon
            componentName='Ionicons'
            iconName='chevron-forward'
            size={20}
            color={COLORS.WHITE}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigate(SCREENS.Dashboard)} style={styles.joinButton}>
        <Typography style={styles.joinButtonText}>Join Our Community</Typography>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <AppWrapper title='Services'>
      <Typography style={styles.headerTitle}>Explore Services</Typography>
      <FlatList
        data={servicesData}
        numColumns={4}
        keyExtractor={item => item.id}
        columnWrapperStyle={styles.row}
        renderItem={renderService}
        ListFooterComponent={BottomCard}
        showsVerticalScrollIndicator={false}
      />
    </AppWrapper>
  );
};

export default Services;

const styles = StyleSheet.create({
  headerTitle: {
    color: COLORS.BLACK,
    fontWeight: '600',
    fontSize: ms(18),
    marginBottom: ms(20),
    marginLeft: ms(10),
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: ms(20),
  },
  serviceCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ms(70),
  },
  iconWrapper: {
    width: ms(60),
    height: ms(60),
    borderRadius: 100,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ms(8),
  },
  serviceIcon: {
    width: ms(30),
    height: ms(30),
  },
  serviceText: {
    fontSize: ms(10),
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  // 🔽 Bottom Card
  bottomCard: {
    backgroundColor: COLORS.LIGHT_BLUE,
    borderRadius: ms(16),
    padding: ms(16),
    marginHorizontal: ms(12),
    marginTop: ms(10),
    marginBottom: ms(40),
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(12),
  },
  bottomImage: {
    width: ms(50),
    height: ms(50),
    marginRight: ms(8),
  },
  bottomText: {
    flex: 1,
    fontWeight: '500',
    fontSize: ms(14),
    color: COLORS.BLACK,
    marginHorizontal: ms(8),
  },
  forwardButton: {
    backgroundColor: COLORS.PRIMARY,
    width: ms(40),
    height: ms(60),
    borderRadius: ms(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: ms(10),
    borderRadius: ms(12),
    alignItems: 'center',
  },
  joinButtonText: {
    color: COLORS.WHITE,
    fontSize: ms(14),
    fontWeight: '600',
  },
});
