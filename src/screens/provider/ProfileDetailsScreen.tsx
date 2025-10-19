import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ms } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';
import { AppWrapper } from 'components/common/AppWapper';
import { Icon, Typography } from 'components/index';

const ProfileDetailsScreen = () => {
  const user = {
    name: 'Dr. Hughie Watson',
    title: 'Licensed Veterinarian',
    rating: 4.9,
    experience: 8,
    appointments: 247,
    thisMonth: 28,
    email: 'dr.thompson@petwellness.com',
    phone: '(555) 123-4567',
    address: '123 Pet Care Lane, Springfield, IL 62701',
  };

  const education = [
    {
      degree: 'Doctor of Veterinary Medicine (DVM)',
      school: 'University of Florida College of Veterinary Medicine',
      note: 'Graduated 2018 • Magna Cum Laude',
    },
    {
      degree: 'Bachelor of Science in Animal Sciences',
      school: 'Iowa State University',
      note: 'Graduated 2012 • Dean’s List',
    },
  ];

  const licenses = ['Illinois Veterinary License', 'Advanced Canine Surgery Certification'];

  const skills = [
    'Animal Surgery',
    'Preventive Care',
    'Dental Care',
    'Emergency Care',
    'Behavioral Counseling',
    'Nutrition Counseling',
  ];

  const availability = [
    { day: 'Monday - Friday', time: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '9:00 AM - 4:00 PM' },
    { day: 'Sunday', time: 'Emergency Only' },
    { day: 'Emergency Services', time: '24/7 Available', highlight: true },
  ];

  const services = [
    'General Checkup',
    'Vaccinations',
    'Dental Care',
    'Surgery',
    'Nutrition Counseling',
    'Behavioral Therapy',
  ];

  const contactItems = [
    {
      icon: 'mail',
      text: user.email,
      action: () => Linking.openURL(`mailto:${user.email}`),
    },
    {
      icon: 'call',
      text: user.phone,
      action: () => Linking.openURL(`tel:${user.phone}`),
    },
    {
      icon: 'location',
      text: user.address,
      action: () =>
        Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(user.address)}`),
    },
  ];

  return (
    <AppWrapper backgroundColor={COLORS.INPUT_BACKGROUND} title='Profile Details'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <Animated.View entering={FadeInUp.delay(200)} style={styles.profileCard}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
          <Typography style={styles.name}>{user.name}</Typography>
          <Typography style={styles.subtitle}>{user.title}</Typography>

          <View style={styles.ratingRow}>
            <Icon componentName='FontAwesome' iconName='star' color='#FFB400' size={14} />
            <Text style={styles.rating}>{user.rating}/5.0</Text>
          </View>

          <Typography style={styles.description}>
            Passionate veterinarian with over 8 years of experience in small animal medicine.
            Dedicated to providing compassionate care and building lasting relationships with pets
            and their families.
          </Typography>

          <View style={styles.statsRow}>
            {[
              { label: 'Years Experience', value: user.experience },
              { label: 'Total Appointments', value: user.appointments },
              { label: 'This Month', value: user.thisMonth },
            ].map((stat, i) => (
              <View key={i} style={styles.statBox}>
                <Typography style={styles.statValue}>{stat.value}</Typography>
                <Typography style={styles.statLabel}>{stat.label}</Typography>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Education */}
        <Animated.View entering={FadeInUp.delay(400)} style={styles.section}>
          <Typography style={styles.sectionTitle}>🎓 Education</Typography>
          {education.map((edu, i) => (
            <View key={i} style={styles.infoCard}>
              <Typography style={styles.boldText}>{edu.degree}</Typography>
              <Typography style={styles.lightText}>{edu.school}</Typography>
              <Typography style={styles.linkText}>{edu.note}</Typography>
            </View>
          ))}
        </Animated.View>

        {/* Licenses */}
        <Animated.View entering={FadeInUp.delay(500)} style={styles.section}>
          <Typography style={styles.sectionTitle}>📜 Licenses & Certifications</Typography>
          {licenses.map((item, i) => (
            <View key={i} style={styles.licenseCard}>
              <Typography style={styles.boldText}>{item}</Typography>
              <Typography style={styles.lightText}>
                Issued: June 2016 • Expires: June 2026
              </Typography>
              <Typography style={styles.validBadge}>Valid</Typography>
            </View>
          ))}
        </Animated.View>

        {/* Skills */}
        <Animated.View entering={FadeInUp.delay(600)} style={styles.section}>
          <Typography style={styles.sectionTitle}>💡 Specializations & Skills</Typography>
          <View style={styles.tagsContainer}>
            {skills.map((tag, i) => (
              <View key={i} style={styles.tag}>
                <Typography style={styles.tagText}>{tag}</Typography>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Availability */}
        <Animated.View entering={FadeInUp.delay(700)} style={styles.section}>
          <Typography style={styles.sectionTitle}>🕒 Availability</Typography>
          {availability.map((item, i) => (
            <View key={i} style={styles.availabilityRow}>
              <Typography
                style={[
                  styles.availabilityDay,
                  item.highlight && { color: COLORS.PRIMARY, fontWeight: '700' },
                ]}
              >
                {item.day}
              </Typography>
              <Typography
                style={[styles.availabilityTime, item.highlight && { color: COLORS.PRIMARY }]}
              >
                {item.time}
              </Typography>
            </View>
          ))}
        </Animated.View>

        {/* Services Offered */}
        <Animated.View entering={FadeInUp.delay(800)} style={styles.section}>
          <Typography style={styles.sectionTitle}>💼 Services Offered</Typography>
          <View style={styles.servicesContainer}>
            {services.map((service, i) => (
              <View key={i} style={styles.serviceCard}>
                <Typography style={styles.serviceText}>{service}</Typography>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Contact Info */}
        <Animated.View entering={FadeInUp.delay(900)} style={styles.section}>
          <Typography style={styles.sectionTitle}>📞 Contact Information</Typography>
          {contactItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.contactRow}
              activeOpacity={0.7}
              onPress={item.action}
            >
              <Icon
                componentName='Ionicons'
                iconName={item.icon}
                size={18}
                color={COLORS.PRIMARY}
              />
              <Typography style={styles.contactText}>{item.text}</Typography>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </ScrollView>
    </AppWrapper>
  );
};

export default ProfileDetailsScreen;

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: ms(12),
    paddingBottom: ms(25),
  },
  profileCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: ms(16),
    marginTop: ms(10),
    elevation: 2,
    shadowColor: '#00000030',
  },
  avatar: {
    width: ms(90),
    height: ms(90),
    borderRadius: ms(45),
    alignSelf: 'center',
  },
  name: {
    fontSize: ms(17),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: ms(10),
    color: COLORS.PRIMARY,
  },
  subtitle: {
    fontSize: ms(12),
    textAlign: 'center',
    color: '#666',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: ms(4),
  },
  rating: { marginLeft: 5, color: '#444' },
  description: {
    fontSize: ms(11),
    textAlign: 'center',
    color: '#555',
    marginHorizontal: ms(12),
    lineHeight: 17,
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: ms(14),
  },
  statBox: {
    backgroundColor: '#f7f8fa',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    width: '30%',
  },
  statValue: {
    fontSize: ms(14),
    fontWeight: '700',
    color: COLORS.PRIMARY,
  },
  statLabel: {
    fontSize: ms(10),
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 14,
    padding: ms(14),
    marginTop: ms(12),
    elevation: 1,
    shadowColor: '#00000020',
  },
  sectionTitle: {
    fontSize: ms(15),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: ms(8),
  },
  infoCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: ms(10),
    marginBottom: ms(10),
  },
  boldText: { fontWeight: '600', color: COLORS.BLACK, fontSize: ms(12.5) },
  lightText: { color: '#555', fontSize: ms(11), marginTop: 2 },
  linkText: { color: COLORS.PRIMARY, fontSize: ms(10.5), marginTop: 2 },
  licenseCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: ms(10),
    marginBottom: ms(10),
    position: 'relative',
  },
  validBadge: {
    position: 'absolute',
    top: ms(10),
    right: ms(10),
    backgroundColor: '#E8DFF9',
    color: COLORS.PRIMARY,
    fontSize: ms(11),
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#E7F3F4',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagText: { fontSize: ms(11), color: COLORS.PRIMARY },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    marginLeft: 8,
    color: '#444',
    fontSize: ms(12),
    flexShrink: 1,
  },
  availabilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: '#e6e6e6',
  },
  availabilityDay: { fontSize: ms(12), color: '#444' },
  availabilityTime: { fontSize: ms(12), color: '#555' },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  serviceCard: {
    backgroundColor: '#F4F6FB',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  serviceText: {
    fontSize: ms(12),
    color: COLORS.PRIMARY,
  },
});
