import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { AppWrapper } from 'components/common/AppWapper';
import { Icon, Typography } from 'components/index';
import MapView, { Marker } from 'react-native-maps';
import { ms, mvs } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';
import * as Animatable from 'react-native-animatable';
import ImageViewing from 'react-native-image-viewing';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';

const { width } = Dimensions.get('window');

const TrainerDetails = () => {
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImagePress = index => {
    setSelectedIndex(index);
    setVisible(true);
  };

  return (
    <AppWrapper title='Kane Williamson'>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <Animatable.View animation='fadeInDown' duration={800} style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0',
            }}
            style={styles.avatar}
          />
          <Typography type='title' style={styles.name}>
            Kane Williamson
          </Typography>
          <Typography style={styles.subtitle}>Pet Trainer</Typography>
          <Typography style={styles.description}>
            Lorem ipsum dolor sit amet consectetur. Varius proin elit aliquam maecenas.
          </Typography>

          {/* Stats */}
          <View style={styles.statsRow}>
            <StatItem label='Years' value='5+' delay={200} />
            <StatItem label='Appointments' value='200+' delay={400} />
            <StatItem label='Rating' value='4.8' delay={600} />
          </View>
        </Animatable.View>

        {/* Details Card */}
        <Animatable.View animation='fadeInUp' delay={800} style={styles.detailsCard}>
          <DetailRow label='Location' value='Area name, 1.1 KM' />
          <DetailRow label='Services' value='Name01, Name02, Name03' />
          <DetailRow label='Days' value='Monday - Friday' />
          <DetailRow label='Time' value='9:30 AM - 7:30 PM' />
          <DetailRow label='Pick-Up & Drop-Off' value='Available' />
          <DetailRow label='Sleep Area' value='In a Crate' />
        </Animatable.View>

        {/* Gallery */}
        <Typography type='subtitle' style={styles.sectionTitle}>
          Gallery
        </Typography>
        <Animatable.View animation='fadeInUp' delay={900} style={styles.galleryRow}>
          {galleryImages.map((img, idx) => (
            <TouchableOpacity key={idx} activeOpacity={0.8} onPress={() => handleImagePress(idx)}>
              <Animatable.Image
                source={{ uri: img.uri }}
                style={styles.galleryImage}
                animation='zoomIn'
                delay={idx * 200 + 1000}
              />
            </TouchableOpacity>
          ))}
        </Animatable.View>

        {/* Full-Screen Image Viewer */}
        <ImageViewing
          images={galleryImages}
          imageIndex={selectedIndex}
          visible={visible}
          onRequestClose={() => setVisible(false)}
          backgroundColor='rgba(0,0,0,0.95)'
        />

        {/* Location */}
        <Typography type='subtitle' style={styles.sectionTitle}>
          Location
        </Typography>
        <View style={styles.mapContainer}>
          <Animatable.View animation='fadeInUp' delay={1200}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: -36.875,
                longitude: 174.745,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{ latitude: -36.875, longitude: 174.745 }}
                title='Beverly Hills'
              />
            </MapView>
          </Animatable.View>

          <Animatable.View animation='fadeInUp' delay={1300} style={styles.addressRow}>
            <Icon componentName='Ionicons' iconName='location-outline' size={18} color='#555' />
            <Typography style={styles.addressText}>
              19 Great North Road, Grey Lynn, Auckland 1021
            </Typography>
          </Animatable.View>
          <Animatable.View animation='fadeInUp' delay={1400}>
            <Typography style={styles.mapLink}>Show in Maps</Typography>
          </Animatable.View>
        </View>

        <Animatable.View animation='pulse' iterationCount='infinite' delay={1600}>
          <TouchableOpacity
            onPress={() => navigate(SCREENS.BookService)}
            activeOpacity={0.9}
            style={styles.button}
          >
            <Typography style={styles.buttonText}>Start Appointment | $9.99</Typography>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </AppWrapper>
  );
};

export default TrainerDetails;

// 🔹 Reusable Components
const StatItem = ({ label, value, delay }) => (
  <Animatable.View animation='fadeInUp' delay={delay} style={styles.statItem}>
    <Typography style={styles.statValue}>{value}</Typography>
    <Typography style={styles.statLabel}>{label}</Typography>
  </Animatable.View>
);

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Typography style={styles.detailLabel}>{label}</Typography>
    <Typography style={styles.detailValue}>{value}</Typography>
  </View>
);

// 🐶 Gallery Images
const galleryImages = [
  { uri: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg' },
  {
    uri: 'https://images.wagwalkingweb.com/media/daily_wag/blog_articles/hero/1723114015.705158/popular-dogs-hero-1.jpg',
  },
  { uri: 'https://www.stockvault.net/data/2021/03/23/284540/preview16.jpg' },
];

// 💅 Styles
const styles = StyleSheet.create({
  container: {
    paddingBottom: ms(60),
    backgroundColor: COLORS.WHITE,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: ms(20),
    paddingVertical: mvs(10),
  },
  avatar: {
    width: ms(100),
    height: ms(100),
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
  },
  name: { fontWeight: '700', marginTop: ms(10), fontSize: ms(18) },
  subtitle: { color: COLORS.BLACK, opacity: 0.5, fontSize: ms(14), marginBottom: 5 },
  description: {
    textAlign: 'center',
    color: COLORS.BLACK,
    opacity: 0.5,
    fontSize: ms(13),
    paddingHorizontal: ms(10),
    marginBottom: mvs(10),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: mvs(15),
  },
  statItem: { alignItems: 'center', flex: 1 },
  statValue: { fontWeight: '700', fontSize: ms(16) },
  statLabel: { color: '#777', fontSize: ms(12) },
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: ms(12),
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: mvs(10),
    shadowColor: COLORS.PRIMARY,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: { color: COLORS.WHITE, fontWeight: '600', fontSize: ms(14) },
  detailsCard: {
    backgroundColor: COLORS.WHITE,
    marginHorizontal: ms(20),
    borderRadius: 10,
    padding: ms(20),
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    borderBottomWidth: 1,
    borderRadius: 1,
    borderColor: COLORS.SILVER,
    paddingBottom: 10,
  },
  detailLabel: { color: COLORS.BLACK, opacity: 0.5, fontSize: ms(13) },
  detailValue: { fontWeight: '500', color: COLORS.BLACK, fontSize: ms(13) },
  sectionTitle: {
    marginLeft: ms(20),
    marginTop: mvs(15),
    fontWeight: '600',
    fontSize: ms(15),
  },
  galleryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: ms(15),
    marginVertical: mvs(10),
  },
  galleryImage: {
    width: width / 3.7,
    height: width / 3.7,
    borderRadius: 10,
    margin: 2,
  },
  mapContainer: {
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    borderRadius: 12,
    margin: 10,
  },
  map: {
    height: mvs(160),
    marginHorizontal: ms(20),
    marginVertical: mvs(15),
    borderRadius: 10,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: ms(20),
    marginTop: -10,
  },
  addressText: {
    marginLeft: 6,
    color: COLORS.BLACK,
    opacity: 0.6,
    fontSize: ms(13),
    width: '80%',
  },
  mapLink: {
    color: '#FF6600',
    marginLeft: ms(45),
    marginBottom: 10,
    fontSize: ms(13),
  },
});
