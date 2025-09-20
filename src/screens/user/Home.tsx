import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, MessageBox, RowComponent, Typography, Wrapper } from 'components/index';
import { screenHeight, screenWidth, STYLES, COLORS, greetings, safeNumber } from 'utils/index';
import { SCREENS, VARIABLES } from 'constants/index';
import { FontSize, useAppSelector } from 'types/index';
import { navigate } from 'navigation/index';

const services = [
  // { id: '1', name: 'Groomer', icon: require('assets/icons/groomer.png') },
  // { id: '2', name: 'Walkers', icon: require('assets/icons/walkers.png') },
  // { id: '3', name: 'Trainers', icon: require('assets/icons/trainers.png') },
  // { id: '4', name: 'Vets', icon: require('assets/icons/vet.png') },
];

const pets = [
  // { id: '1', image: require('assets/images/pet1.png') },
  // { id: '2', image: require('assets/images/pet2.png') },
];

const advisors = [
  {
    id: '1',
    name: 'Nina Wu',
    role: 'Pet Care',
    rating: 4.5,
    price: '$23',
    status: 'Available',
    // image: require('assets/images/doctor1.png'),
  },
  {
    id: '2',
    name: 'Sophie Lin',
    role: 'Petcare',
    rating: 4.5,
    price: '$54',
    status: 'Not available',
    // image: require('assets/images/doctor2.png'),
  },
];

export const Home = () => {
  const { userDetails } = useAppSelector(state => state?.user);
  return (
    <Wrapper>
      <View style={styles.header}>
        
        {/* <Image source={require('assets/images/profile.png')} style={styles.avatar} /> */}

        <View style={styles.locationBox}>
          <Typography style={styles.locationText}>Location</Typography>
          <Typography style={styles.location}>📍 California, USA</Typography>
        </View>
        <TouchableOpacity style={styles.circleBtn}>
          <Typography>⚪</Typography>
        </TouchableOpacity>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.WHITE, padding: ms(15) },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  locationBox: { flex: 1, marginHorizontal: 10 },
  locationText: { fontSize: 12, color: COLORS.GRAY },
  location: { fontSize: 14, fontWeight: '600' },
  circleBtn: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: COLORS.LIGHTGRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Banner
  banner: {
    flexDirection: 'row',
    backgroundColor: COLORS.LIGHTBLUE,
    borderRadius: 15,
    padding: 15,
    marginVertical: 20,
  },
  bannerText: { flex: 1 },
  bannerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.BLACK },
  bannerDesc: { fontSize: 12, color: COLORS.GRAY, marginVertical: 5 },
  bannerBtn: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 5,
  },
  bannerBtnText: { color: COLORS.WHITE, fontSize: 12 },
  bannerImg: { width: 100, height: 100, resizeMode: 'contain' },

  // Services
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  sectionLink: { fontSize: 12, color: COLORS.PRIMARY },
  serviceItem: { alignItems: 'center', marginRight: 20 },
  serviceIcon: { width: 40, height: 40 },
  serviceName: { marginTop: 5, fontSize: 12 },

  // Pets
  petCard: {
    width: 120,
    height: 140,
    backgroundColor: COLORS.LIGHTGRAY,
    borderRadius: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  petImage: { width: '100%', height: '100%', borderRadius: 15 },

  // Advisors
  advisorCard: {
    width: 140,
    padding: 10,
    backgroundColor: COLORS.LIGHTGRAY,
    borderRadius: 15,
    marginRight: 15,
    alignItems: 'center',
  },
  advisorImage: { width: 60, height: 60, borderRadius: 30 },
  advisorName: { fontSize: 14, fontWeight: '600', marginTop: 5 },
  advisorRole: { fontSize: 12, color: COLORS.GRAY },
  advisorPrice: { fontSize: 14, fontWeight: '700', color: COLORS.PRIMARY, marginTop: 5 },
});
