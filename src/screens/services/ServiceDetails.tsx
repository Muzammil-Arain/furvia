import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Icon, Typography } from 'components/index';
import { ms, mvs } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';
import * as Animatable from 'react-native-animatable';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';

const { width } = Dimensions.get('window');

const ServiceDetails = () => {
  return (
    <AppWrapper title='Dog Grooming'>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <Animatable.View animation='fadeInDown' duration={800}>
          <Image
            resizeMode='cover'
            source={require('../../assets/images/common/Image.png')}
            style={styles.bannerImage}
          />
        </Animatable.View>

        {/* Service Info */}
        <View style={styles.serviceHeader}>
          <View>
            <Typography type='title' style={styles.title}>
              Dog Grooming
            </Typography>
            <Typography style={styles.price}>$100 - $200</Typography>
          </View>
          <View style={styles.iconWrapper}>
            <Icon
              componentName='Ionicons'
              iconName='calendar-outline'
              size={22}
              color={COLORS.WHITE}
            />
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Typography type='subtitle' style={styles.sectionTitle}>
            Description
          </Typography>
          <Typography style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </Typography>
        </View>

        {/* Reviews */}
        <View style={[styles.section, { marginTop: mvs(20) }]}>
          <View style={styles.reviewHeader}>
            <Typography type='subtitle' style={styles.sectionTitle}>
              Reviews
            </Typography>
            <TouchableOpacity onPress={() => navigate(SCREENS.TestimonialsScreen)}>
              <Typography style={styles.linkText}>See All</Typography>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{
              paddingHorizontal: 5,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {reviews.map((r, i) => (
              <Animatable.View
                key={i}
                animation='fadeInUp'
                delay={150 * i}
                style={styles.reviewCard}
              >
                <View style={styles.reviewHeaderRow}>
                  <Image source={{ uri: r.image }} style={styles.reviewAvatar} />
                  <View style={{ flex: 1 }}>
                    <Typography style={styles.reviewerName}>{r.name}</Typography>
                    <Typography style={styles.reviewDate}>{r.date}</Typography>
                  </View>
                  <View style={styles.ratingRow}>
                    <Typography style={styles.ratingText}>{r.rating}</Typography>
                    <Icon componentName='Ionicons' iconName='star' size={14} color='#FFA500' />
                  </View>
                </View>
                <Typography style={styles.reviewText}>{r.comment}</Typography>
              </Animatable.View>
            ))}
          </ScrollView>
        </View>

        {/* Improved Details Card */}
        <Animatable.View animation='fadeInUp' delay={400} style={styles.detailsCard}>
          <Typography type='subtitle' style={styles.detailsTitle}>
            Service Details
          </Typography>
          <View style={styles.divider} />
          {details.map((item, index) => (
            <View
              key={index}
              style={[styles.detailRow, index === details.length - 1 && { borderBottomWidth: 0 }]}
            >
              <Typography style={styles.detailLabel}>{item.label}</Typography>
              <Typography style={styles.detailValue}>{item.value}</Typography>
            </View>
          ))}
        </Animatable.View>

        {/* Book Button */}
        <Animatable.View animation='pulse' iterationCount='infinite' delay={1200}>
          <TouchableOpacity
            onPress={() => navigate(SCREENS.BookService)}
            activeOpacity={0.9}
            style={styles.button}
          >
            <Typography style={styles.buttonText}>Book Service</Typography>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </AppWrapper>
  );
};

export default ServiceDetails;

// 🔹 Dummy Data
const reviews = [
  {
    name: 'Jac Fraser',
    date: '3 Days Ago',
    rating: '5.0',
    comment: 'Lorem ipsum dolor sit amet consectetur. Massa vel molestie sagittis mi nunc.',
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    name: 'Mark Allison',
    date: '3 Days Ago',
    rating: '4.8',
    comment: 'Lorem ipsum dolor sit amet consectetur. Massa vel molestie sagittis mi nunc.',
    image: 'https://randomuser.me/api/portraits/men/15.jpg',
  },
];

const details = [
  { label: 'Accepted Pet Size', value: '1 - 15 KG' },
  { label: 'Potty Breaks', value: '03' },
  { label: 'Day Walks', value: '02' },
  { label: 'Outdoor Area Size', value: 'Large' },
  { label: 'Pick-Up & Drop-Off', value: 'Available' },
  { label: 'Sleep Area', value: 'In a Crate' },
];

// 💅 Styles
const styles = StyleSheet.create({
  container: {
    paddingBottom: mvs(60),
    backgroundColor: COLORS.WHITE,
  },
  bannerImage: {
    width,
    height: width * 0.55,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ms(20),
    marginTop: mvs(20),
  },
  title: {
    fontWeight: '700',
    fontSize: ms(17),
  },
  price: {
    fontSize: ms(13),
    color: COLORS.BLACK,
    opacity: 0.6,
  },
  iconWrapper: {
    backgroundColor: COLORS.PRIMARY,
    padding: ms(8),
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.PRIMARY,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 4 },
    }),
  },
  section: {
    paddingHorizontal: ms(20),
    marginTop: mvs(15),
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: ms(15),
    marginBottom: 5,
  },
  description: {
    fontSize: ms(11),
    color: COLORS.BLACK,
    opacity: 0.6,
    lineHeight: 18,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    color: COLORS.PRIMARY,
    fontSize: ms(13),
    fontWeight: '500',
  },
  reviewCard: {
    backgroundColor: COLORS.WHITE,
    width: width * 0.7,
    borderRadius: 12,
    padding: ms(12),
    marginRight: 15,
    marginVertical: 10,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 3 },
    }),
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: ms(40),
    height: ms(40),
    borderRadius: 100,
    marginRight: 10,
  },
  reviewerName: {
    fontWeight: '600',
    fontSize: ms(13),
  },
  reviewDate: {
    fontSize: ms(10),
    color: COLORS.BLACK,
    opacity: 0.5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFA500',
    marginRight: 3,
    fontSize: ms(12),
    fontWeight: '600',
  },
  reviewText: {
    fontSize: ms(12),
    color: COLORS.BLACK,
    opacity: 0.6,
  },

  // ✨ Improved Details Card
  detailsCard: {
    backgroundColor: COLORS.WHITE,
    marginHorizontal: ms(20),
    marginTop: mvs(25),
    borderRadius: 12,
    paddingVertical: mvs(15),
    paddingHorizontal: ms(15),
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 2 },
    }),
  },
  detailsTitle: {
    fontWeight: '600',
    fontSize: ms(15),
    marginBottom: 8,
    color: COLORS.BLACK,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.SILVER,
    opacity: 0.4,
    marginBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: COLORS.SILVER,
  },
  detailLabel: { color: COLORS.BLACK, opacity: 0.6, fontSize: ms(12) },
  detailValue: {
    fontWeight: '600',
    color: COLORS.BLACK,
    fontSize: ms(13),
  },

  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: ms(12),
    borderRadius: 8,
    width: '85%',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: mvs(25),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.PRIMARY,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 4 },
    }),
  },
  buttonText: { color: COLORS.WHITE, fontWeight: '600', fontSize: ms(14) },
});
