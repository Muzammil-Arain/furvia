import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { COLORS } from 'utils/colors';
import { AppWrapper } from 'components/common/AppWapper';
import { Typography } from 'components/index';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';

const AppointmentDetailsScreen = () => {
  return (
    <AppWrapper title='Appointment Details'>
      <Animated.ScrollView
        entering={FadeInUp.duration(400)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Pet Information */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name='paw' size={ms(20)} color={COLORS.SECONDARY} />
            <Typography style={styles.cardTitle}> Pet Information</Typography>
          </View>

          <View style={styles.row}>
            <Image
              source={{
                uri: 'https://cdn.shopify.com/s/files/1/0086/0795/7054/files/Golden-Retriever.jpg?v=1645179525',
              }}
              style={styles.petImage}
            />
            <View style={{ flex: 1, marginLeft: ms(10) }}>
              <Text style={styles.petName}>
                Buddy <Text style={styles.petType}>(Dog)</Text>
              </Text>
              <Text style={styles.petInfo}>
                Breed: <Text style={styles.bold}>Golden Retriever</Text>
              </Text>
              <Text style={styles.petInfo}>
                Age: <Text style={styles.bold}>3 years</Text>
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Service Details */}
        <Animated.View entering={FadeInUp.delay(200)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name='clipboard-text' size={ms(20)} color={COLORS.SECONDARY} />
            <Typography style={styles.cardTitle}> Service Details</Typography>
          </View>

          <View style={styles.serviceRow}>
            <View style={styles.serviceItem}>
              <Typography style={styles.label}>Service Type:</Typography>
              <Typography style={styles.value}>Veterinary Checkup</Typography>
            </View>
            <View style={styles.serviceItem}>
              <Typography style={styles.label}>Visit Type</Typography>
              <Typography style={styles.value}>In-Home</Typography>
            </View>
          </View>

          <View style={styles.serviceRow}>
            <View style={styles.serviceItem}>
              <Typography style={styles.label}>Date</Typography>
              <Typography style={styles.value}>Today, Sep 29</Typography>
            </View>
            <View style={styles.serviceItem}>
              <Typography style={styles.label}>Time</Typography>
              <Typography style={styles.value}>2:00 PM</Typography>
            </View>
          </View>
        </Animated.View>

        {/* Client Information */}
        <Animated.View entering={FadeInUp.delay(300)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name='account' size={ms(20)} color={COLORS.SECONDARY} />
            <Typography style={styles.cardTitle}> Client Information</Typography>
          </View>
          <Typography style={styles.label}>Client Name:</Typography>
          <Typography style={styles.value}>Sarah Johnson</Typography>
          <Text style={[styles.label, { marginTop: 5 }]}>Address:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: ms(5) }}>
            <Icon name='map-marker' size={16} color={COLORS.HEADER_BACKGROUND} />
            <Typography style={[styles.value, { marginLeft: 5 }]}>
              123 Oak Street, Springfield, IL 62701
            </Typography>
          </View>
        </Animated.View>

        {/* Special Notes */}
        <Animated.View entering={FadeInUp.delay(400)} style={styles.card}>
          <Typography style={styles.cardTitle}>Special Notes</Typography>
          <Typography style={styles.value}>
            Buddy has been limping slightly on his front left paw. Please check for any injuries or
            soreness.
          </Typography>
        </Animated.View>

        {/* Buttons */}
        <Animated.View entering={FadeInUp.delay(500)}>
          <TouchableOpacity onPress={() => navigate(SCREENS.UserChatScreen)} activeOpacity={0.8} style={styles.fullButton}>
            <Icon name='message-text-outline' size={18} color='#fff' />
            <Text style={styles.fullButtonText}> Chat With Client</Text>
          </TouchableOpacity>

          <View style={styles.rowButtons}>
            <TouchableOpacity activeOpacity={0.8} style={styles.outlineButton}>
              <Icon name='phone' size={16} color={COLORS.HEADER_BACKGROUND} />
              <Typography style={styles.outlineButtonText}> Call Client</Typography>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate(SCREENS.NavigationScreen)} activeOpacity={0.8} style={styles.outlineButton}>
              <Icon name='navigation' size={16} color={COLORS.HEADER_BACKGROUND} />
              <Typography style={styles.outlineButtonText}> Navigate</Typography>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Ready to Start */}
        <Animated.View entering={FadeInUp.delay(600)} style={styles.readyCard}>
          <Typography style={styles.readyTitle}>Ready To Start?</Typography>
          <Typography style={styles.value}>
            Tap "Start Job" when you arrive at the customer's location
          </Typography>

          <TouchableOpacity onPress={() => navigate(SCREENS.JobInProgressScreen)} activeOpacity={0.8} style={styles.startJobButton}>
            <Icon name='play-circle' size={18} color='#fff' />
            <Typography style={styles.startJobText}> Start Job</Typography>
          </TouchableOpacity>
        </Animated.View>
      </Animated.ScrollView>
    </AppWrapper>
  );
};

export default AppointmentDetailsScreen;

const styles = StyleSheet.create({
  content: {
    padding:5,
    paddingBottom: ms(100),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: ms(12),
    padding: ms(15),
    marginBottom: ms(15),
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(15),
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: ms(16),
    color: COLORS.BLACK,
    marginLeft: 4,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  petImage: {
    width: ms(60),
    height: ms(60),
    borderRadius: ms(10),
  },
  petName: {
    fontSize: ms(15),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  petType: {
    fontWeight: 'normal',
    color: COLORS.GRAY,
    fontSize: 12,
  },
  petInfo: {
    fontSize: ms(13),
    color: COLORS.TEXT,
  },
  bold: {
    color: COLORS.BLACK,
    fontSize: 12,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceItem: {
    flex: 1,
    marginVertical: 5,
  },
  label: {
    fontSize: ms(13),
    color: COLORS.BLACK,
  },
  value: {
    fontSize: ms(12),
    color: COLORS.TEXT,
    marginTop: ms(5),
  },
  fullButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.HEADER_BACKGROUND,
    paddingVertical: ms(12),
    borderRadius: ms(10),
    marginBottom: ms(10),
    shadowColor: '#5C2E9E',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  fullButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: ms(14),
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: ms(15),
  },
  outlineButton: {
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.HEADER_BACKGROUND,
    borderRadius: ms(10),
    paddingVertical: ms(12),
  },
  outlineButtonText: {
    color: COLORS.HEADER_BACKGROUND,
    fontWeight: 'bold',
    fontSize: ms(13),
  },
  readyCard: {
    backgroundColor: '#FEF8FF',
    borderWidth: 1,
    borderColor: COLORS.SECONDARY,
    borderRadius: ms(12),
    padding: ms(15),
  },
  readyTitle: {
    fontWeight: 'bold',
    fontSize: ms(15),
    marginBottom: ms(8),
    color: COLORS.BLACK,
  },
  startJobButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.HEADER_BACKGROUND,
    paddingVertical: ms(12),
    borderRadius: ms(10),
    marginTop: ms(10),
  },
  startJobText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: ms(14),
  },
});
