import React from 'react';
import { View, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Icon, Typography } from 'components/index';
import { ms } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';
import { AppWrapper } from 'components/common/AppWapper';

const GromingService = () => {
  const data = [
    {
      title: 'Bathing',
      services: [
        { id: 1, name: 'Regular Bath', desc: '(shampoo & rinse)' },
        { id: 2, name: 'Medicated Bath', desc: '(for fleas, ticks, skin issues)' },
      ],
    },
    {
      title: 'Brushing',
      services: [
        { id: 3, name: 'Basic brushing', desc: '' },
        { id: 4, name: 'De-shedding treatment', desc: '' },
      ],
    },
  ];

  const renderServiceItem = ({ item, index }) => (
    <Animated.View entering={FadeInDown.delay(index * 150).springify()} style={styles.serviceCard}>
      <View style={styles.cardLeft}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../assets/icons/services/Brushing.png')}
            style={styles.icon}
            resizeMode='contain'
          />
        </View>
        <View>
          <Typography style={styles.serviceName}>{item.name}</Typography>
          {item.desc ? <Typography style={styles.serviceDesc}>{item.desc}</Typography> : null}
        </View>
      </View>
      <TouchableOpacity style={styles.scheduleIcon}>
        <Icon componentName='Ionicons' iconName='calendar-outline' size={20} color={COLORS.WHITE} />
      </TouchableOpacity>
    </Animated.View>
  );

  const BottomCard = () => (
    <Animated.View entering={FadeInDown.delay(600).springify()} style={styles.bottomCard}>
      {/* <View style={styles.bottomRow}>
        <Image
          source={require('../../assets/images/common/serviceBanner.png')}
          resizeMode='cover'
          style={styles.bottomImage}
        />
        <Typography style={styles.bottomText}>
          Our experienced trainers are ready to take care of your pets.
        </Typography>
        <View style={styles.forwardButton}>
          <Icon
            componentName='Ionicons'
            iconName='chevron-forward'
            size={20}
            color={COLORS.WHITE}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.joinButton}>
        <Typography style={styles.joinButtonText}>Join Our Community</Typography>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.joinButton}>
        <Typography style={styles.joinButtonText}>Join Our Community</Typography>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <AppWrapper title='Basic Grooming Services'>
      {data.map((section, i) => (
        <View key={i} style={{ marginBottom: ms(25) }}>
          <Typography style={styles.sectionTitle}>{section.title}</Typography>
          <FlatList
            data={section.services}
            renderItem={renderServiceItem}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: ms(10) }} />}
            contentContainerStyle={{ paddingHorizontal: ms(10), paddingBottom: 20 }}
          />
        </View>
      ))}
      <BottomCard />
    </AppWrapper>
  );
};

export default GromingService;

const styles = StyleSheet.create({
  sectionTitle: {
    color: COLORS.BLACK,
    fontWeight: '700',
    fontSize: ms(18),
    marginBottom: ms(12),
    marginLeft: ms(12),
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(16),
    padding: ms(14),
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: ms(50),
    height: ms(50),
    borderRadius: ms(12),
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ms(12),
  },
  icon: {
    width: ms(28),
    height: ms(28),
  },
  serviceName: {
    fontSize: ms(15),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  serviceDesc: {
    fontSize: ms(12),
    color: '#777',
  },
  scheduleIcon: {
    backgroundColor: COLORS.PRIMARY,
    width: ms(36),
    height: ms(36),
    borderRadius: ms(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomCard: {
    // backgroundColor: '#E6F4FF',
    borderRadius: ms(16),
    padding: ms(16),
    marginHorizontal: ms(12),
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
    fontSize: ms(13),
    color: COLORS.BLACK,
  },
  forwardButton: {
    backgroundColor: COLORS.PRIMARY,
    width: ms(36),
    height: ms(50),
    borderRadius: ms(10),
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
