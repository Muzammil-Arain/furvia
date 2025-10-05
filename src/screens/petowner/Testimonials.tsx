import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { COLORS } from 'utils/colors';
import { Icon, Typography } from 'components/index';
import { AppWrapper } from 'components/common/AppWapper';
import { ms } from 'react-native-size-matters';

const testimonialsData = [
  {
    id: '1',
    name: 'Carla Johnson',
    date: '02 Jan',
    rating: 5,
    review: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
  },
  {
    id: '2',
    name: 'Carla Johnson',
    date: '02 Jan',
    rating: 5,
    review: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
  },
  {
    id: '3',
    name: 'Carla Johnson',
    date: '02 Jan',
    rating: 5,
    review: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
  },
];

const TestimonialsScreen = () => {
  const rating = 4.5; // Example average rating

  // Function to render stars based on the rating
  const renderStars = rating => {
    const fullStars = Math.floor(rating); // Full stars (e.g., 4 from 4.5)
    const hasHalfStar = rating % 1 !== 0; // Check if there’s a half star
    const totalStars = 5; // Maximum number of stars

    let stars = [];
    for (let i = 0; i < totalStars; i++) {
      if (i < fullStars) {
        stars.push(
          <Icon componentName='Ionicons' key={i} iconName='star' size={18} color={COLORS.GOLD} />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Icon
            componentName='Ionicons'
            key={i}
            iconName='star-half'
            size={18}
            color={COLORS.GOLD}
          />,
        );
      } else {
        stars.push(
          <Icon
            componentName='Ionicons'
            key={i}
            iconName='star-outline'
            size={18}
            color={COLORS.GOLD}
          />,
        );
      }
    }
    return stars;
  };

  return (
    <AppWrapper title='Testimonials'>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Typography style={styles.rating}>4.5</Typography>
          <View style={styles.headerRating}>{renderStars(rating)}</View>
          <Typography style={styles.reviews}>100 Reviews</Typography>
        </View>

        {/* Rating Bar Sections */}
        <View style={styles.ratingBarContainer}>
          {['Excellent', 'Good', 'Average', 'Bad', 'Very Bad'].map((label, index) => {
            const barWidth = (5 - index) * 20;

            // Define colors based on the rating category
            const ratingColors = [
              '#3FF328', // Excellent (Green)
              '#FFAE00', // Good (Yellow)
              '#FF7F00', // Average (Orange)
              '#992222', // Bad (Red)
              '#fccc', // Very Bad (Light Red)
            ];

            return (
              <View key={index} style={styles.ratingBar}>
                <Typography style={styles.ratingLabel}>{label}</Typography>
                <View style={styles.ratingBarFill}>
                  <View style={[styles.ratingFillBackground, { width: '100%' }]} />
                  {/* Fill the bar based on rating category */}
                  <View
                    style={[
                      styles.ratingFill,
                      {
                        width: `${barWidth}%`,
                        backgroundColor: ratingColors[index],
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>

        {/* Testimonials List */}
        <FlatList
          data={testimonialsData}
          renderItem={({ item }) => (
            <View style={styles.testimonialCard}>
              <Typography style={styles.testimonialTitle}>Best Service</Typography>
              <Typography style={styles.testimonialDate}>
                {item.date} · {item.name}
              </Typography>
              <View style={styles.starRating}>{renderStars(item.rating)}</View>
              <Typography style={styles.testimonialReview}>{item.review}</Typography>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </AppWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ms(20),
  },
  // Header Style
  header: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 40,
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  reviews: {
    color: COLORS.BLACK,
    fontSize: 14,
  },

  // Rating Bar Styles
  ratingBarContainer: {
    marginBottom: 30,
  },
  ratingBar: {
    marginBottom: 10,
    width: '100%',
  },
  ratingLabel: {
    fontSize: 14,
    color: COLORS.BLACK,
  },
  ratingBarFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#eaeaeaff',
    overflow: 'hidden',
    marginTop: 5,
  },
  ratingFillBackground: {
    backgroundColor: '#fdfdfdff',
  },
  ratingFill: {
    height: '100%',
  },
  // Testimonial Card Styles
  testimonialCard: {
    margin: 5,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  testimonialTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.PRIMARY,
  },
  headerRating: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  testimonialDate: {
    fontSize: 12,
    color: '#888',
    marginVertical: 5,
  },
  starRating: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  testimonialReview: {
    fontSize: 12,
    color: '#333',
  },
});

export default TestimonialsScreen;
