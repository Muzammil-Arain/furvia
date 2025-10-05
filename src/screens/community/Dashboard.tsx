import { AppWrapper } from 'components/common/AppWapper';
import { DEFULT_IMAGE } from 'constants/assets';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import { Icon, Typography } from 'components/index';
import { servicesData } from '../../api/data';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';

// Data for story, park and event sections
const storyData = [
  { id: '1', name: 'Your Story', image: '', isAdd: true },
  { id: '2', name: 'Edward Frans', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '3', name: 'Samantha', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '4', name: 'Kris', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
];

const parksData = [
  {
    id: '1',
    title: 'Paws and Play Park',
    location: 'Parker Rd, Allentown, New Mexico',
    image:
      'https://media.istockphoto.com/id/841278554/photo/beautiful-morning-light-in-public-park-with-green-grass-field.jpg?s=612x612&w=0&k=20&c=rXOM3Uq9kPbpM5IWnCAnffHOP8KKpVKCJDMuNBlTNls=',
  },
  {
    id: '2',
    title: 'PetPals Picnic',
    location: 'Elgin St. Center, New Mexico',
    image:
      'https://us.123rf.com/450wm/themorningglory/themorningglory1602/themorningglory160200194/52530295-beautiful-green-summer-park-garden-with-blue-sky.jpg?ver=6',
  },
];

const eventsData = [
  {
    id: '1',
    title: 'Cat Birthday',
    image:
      'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?cs=srgb&dl=pexels-chevanon-1108099.jpg&fm=jpg',
    date: '9 Nov - 7 AM',
  },
  {
    id: '2',
    title: 'My Little Pony Meeting',
    image:
      'https://www.atozvet.com/wp-content/uploads/2017/07/Prevention-and-Treatment-For-Pet-Disease-Midland-TX-scaled.jpg',
    date: '10 Nov - 3 PM',
  },
  {
    id: '3',
    title: 'Surprise Funny Pets',
    image: 'https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_960_720.jpg',
    date: '11 Nov - 5 PM',
  },
];

const activitiesData = [
  {
    id: '1',
    userImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    userName: 'Marvin McKinney',
    date: '24 Aug',
    postImage:
      'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?cs=srgb&dl=pexels-chevanon-1108099.jpg&fm=jpg',
    description: 'Playtime Adventures: Unleashing Joy and Tail Wags! 🐶🐱',
    likes: 1200,
    comments: 10,
  },
  {
    id: '2',
    userImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    userName: 'Courtney Henry',
    date: '22 Aug',
    postImage: 'https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_960_720.jpg',
    description: 'Mastering Obedience Training for Your Furry Friend 🐕',
    likes: 2200,
    comments: 60,
  },
];

const Dashboard = () => {
  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          width: ms(150),
          backgroundColor: COLORS.WHITE,
          elevation: 3,
          margin: 2,
          borderRadius: 5,
        },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <Typography numberOfLines={1} style={styles.eventTitle}>
        {item.title}
      </Typography>
      <Typography style={styles.eventDate}>{item.date}</Typography>
    </TouchableOpacity>
  );

  const renderStoryItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigate(SCREENS.StoryView)}
        style={styles.imageContainer}
        activeOpacity={0.8}
      >
        {item.isAdd ? (
          <ImageBackground
            source={{ uri: DEFULT_IMAGE }}
            resizeMode='cover'
            style={styles.addImageContainer}
            borderRadius={100}
          >
            <View style={styles.addButton}>
              <Typography style={styles.addButtonText}>+</Typography>
            </View>
          </ImageBackground>
        ) : (
          <LinearGradient
            colors={[COLORS.PRIMARY, COLORS.SECONDARY]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder}
          >
            <Image
              source={{ uri: item.image || 'https://placekitten.com/200/200' }}
              style={styles.storyprofileImage}
            />
          </LinearGradient>
        )}
      </TouchableOpacity>
      <Typography style={styles.storyuserName}>{item.name}</Typography>
    </View>
  );

  const renderParkItem = ({ item }) => (
    <View
      style={[
        styles.card,
        {
          margin: 3,
          width: ms(250),
          backgroundColor: COLORS.WHITE,
          borderRadius: 6,
          elevation: 3,
        },
      ]}
    >
      <View style={styles.parkImageContainer}>
        <Image source={{ uri: item.image }} style={styles.parkImage} />
      </View>
      <Typography style={styles.parkTitle}>{item.title}</Typography>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 5,
          marginBottom: 10,
        }}
      >
        <Icon componentName='Entypo' iconName='location-pin' color={COLORS.SECONDARY} />
        <Typography style={styles.parkLocation}>{item.location}</Typography>
      </View>
    </View>
  );

  const renderActivityItem = ({ item }) => (
    <View style={styles.activityCard}>
      {/* Header with Profile Image and Name */}
      <View style={styles.headerContainer}>
        <Image source={{ uri: item.userImage }} style={styles.profileImage} />
        <View style={styles.headerTextContainer}>
          <Typography style={styles.userName}>{item.userName}</Typography>
          <Typography style={styles.postDate}>{item.date}</Typography>
        </View>
      </View>

      {/* Post Image */}
      <Image source={{ uri: item.postImage }} style={styles.postImage} />

      {/* Description */}
      <Typography style={styles.description}>{item.description}</Typography>

      {/* Footer with Likes and Comments */}
      <View style={styles.footerContainer}>
        <View style={styles.statsContainer}>
          <View style={styles.statsItem}>
            <Icon componentName='Ionicons' iconName='heart' size={22} color={COLORS.SECONDARY} />
            <Typography style={styles.statsText}>{item.likes}</Typography>
          </View>
          <View style={styles.statsItem}>
            <Icon componentName='Ionicons' iconName='chatbubbles' size={22} color={COLORS.GRAY} />
            <Typography style={styles.statsText}>{item.comments}</Typography>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <AppWrapper onRightPress={() => navigate(SCREENS.CreateEvent)} title='Community'>
      {/* Story Section */}
      <FlatList
        data={storyData}
        horizontal
        keyExtractor={item => item.id}
        renderItem={renderStoryItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
      />
      <Typography style={styles.title}>Welcome to Furvia Community</Typography>

      {/* Services Section */}
      <View style={styles.servicesSection}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={servicesData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.serviceCard}>
              <View style={styles.serviceIconContainer}>
                <Image source={item.icon} resizeMode='contain' style={styles.serviceIcon} />
              </View>
              <Typography style={styles.serviceText}>{item.title}</Typography>
            </View>
          )}
        />
      </View>
      <Typography style={styles.title}>Events</Typography>
      {/* Events Section */}
      <FlatList
        data={eventsData}
        horizontal
        keyExtractor={item => item.id}
        renderItem={renderEventItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.eventList}
      />
      {/* Parks Section */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Typography style={styles.title}>Furvia Recommended Parks</Typography>
          <TouchableOpacity>
            <Typography style={styles.viewAllText}>View all</Typography>
          </TouchableOpacity>
        </View>

        <FlatList
          data={parksData}
          horizontal
          keyExtractor={item => item.id}
          renderItem={renderParkItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View
        style={{
          marginTop: ms(20),
        }}
      >
        <Typography style={styles.title}>Activities</Typography>
        {/* activities Section */}
        <FlatList
          data={activitiesData}
          keyExtractor={item => item.id}
          renderItem={renderActivityItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.activitiesList}
        />
      </View>
    </AppWrapper>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    marginTop: ms(10),
  },
  carouselContainer: {
    paddingVertical: ms(10),
    marginBottom: ms(10),
  },
  card: {
    // alignItems: 'center',
    marginRight: ms(15),
    // justifyContent: 'center',
  },
  imageContainer: {
    width: ms(80),
    height: ms(80),
    borderRadius: ms(40),
    backgroundColor: COLORS.GRAY,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  storyprofileImage: {
    width: '93%',
    height: '93%',
    borderRadius: ms(40),
    margin: 5,
  },
  addImageContainer: {
    width: ms(75),
    height: ms(75),
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  addButton: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.PRIMARY,
    fontSize: ms(24),
    fontWeight: 'bold',
  },
  gradientBorder: {
    width: ms(80),
    height: ms(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(40),
  },
  storyuserName: {
    marginTop: ms(5),
    fontSize: ms(11),
    color: COLORS.BLACK,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Title
  title: {
    fontWeight: 'bold',
    fontSize: ms(17),
    marginBottom: ms(15),
  },

  // Event Section
  eventList: {
    paddingVertical: ms(10),
  },
  eventCard: {
    width: ms(150),
    height: ms(200),
    marginRight: ms(15),
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(12),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: ms(4),
    shadowOffset: { width: 0, height: ms(2) },
  },
  eventImage: {
    resizeMode: 'cover',
    width: '100%',
    height: ms(140),
  },
  eventTitle: {
    fontSize: ms(14),
    fontWeight: 'bold',
    color: COLORS.BLACK,
    paddingHorizontal: ms(10),
    marginTop: ms(5),
    textAlign: 'left',
  },
  eventDate: {
    fontSize: ms(12),
    color: COLORS.GRAY,
    paddingHorizontal: ms(10),
    marginBottom: ms(10),
    textAlign: 'left',
  },

  //   Service Section
  servicesSection: {
    marginBottom: ms(20),
    marginTop: ms(10),
  },
  serviceCard: {
    width: ms(80),
    height: ms(80),
    borderRadius: ms(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ms(5),
  },
  serviceIconContainer: { backgroundColor: '#F3F3F3', padding: ms(18), borderRadius: ms(40) },
  serviceIcon: { width: ms(30), height: ms(30) },
  serviceText: {
    fontSize: ms(11),
    marginTop: vs(1),
    color: COLORS.TEXT,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  // Park Section
  parkImageContainer: {
    width: ms(250),
    height: ms(150),
    backgroundColor: COLORS.GRAY,
    overflow: 'hidden',
    position: 'relative',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  parkImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  parkTitle: {
    marginTop: ms(5),
    fontSize: ms(14),
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginLeft: 10,
    textAlign: 'left',
  },
  parkLocation: {
    fontSize: ms(12),
    color: COLORS.GRAY,
    textAlign: 'left',
    marginTop: 3,
  },
  viewAllText: {
    fontSize: ms(14),
    color: COLORS.PRIMARY,
  },

  // Header section for parks
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ms(15),
  },

  // ACTIVITY LIST
  activitiesList: {
    paddingHorizontal: ms(10),
  },
  activityCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: ms(12),
    marginBottom: ms(15),
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: ms(6),
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: ms(10),
  },
  profileImage: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    marginRight: ms(10),
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: ms(14),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  postDate: {
    fontSize: ms(12),
    color: COLORS.GRAY,
  },
  postImage: {
    width: '100%',
    height: ms(200),
    marginVertical: ms(10),
  },
  description: {
    fontSize: ms(14),
    color: COLORS.BLACK,
    paddingHorizontal: ms(10),
    marginBottom: ms(10),
  },
  footerContainer: {
    paddingHorizontal: ms(10),
    paddingBottom: ms(10),
  },
  statsContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    width: '32%',
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: ms(12),
    color: COLORS.GRAY,
    marginLeft: ms(5),
  },
});

export default Dashboard;
