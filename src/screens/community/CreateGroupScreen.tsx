import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { launchImageLibrary } from 'react-native-image-picker';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import { AppWrapper } from 'components/common/AppWapper';
import { COLORS } from 'utils/colors';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';

const dummyUsers = [
  { id: '1', name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '3', name: 'Michael', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '4', name: 'Sophia', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: '5', name: 'David', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
];

const CreateGroupScreen = () => {
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // 🖼️ Pick group image from gallery
  const handleImagePick = async () => {
    // const result = await launchImageLibrary({
    //   mediaType: 'photo',
    //   selectionLimit: 1,
    //   quality: 0.8,
    // });
    // if (!result.didCancel && result.assets?.[0]?.uri) {
    //   setGroupImage(result.assets[0].uri);
    // }
  };

  const toggleUserSelection = (id: string) => {
    setSelectedUsers(prev => (prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]));
  };

  const renderUserItem = ({ item }: any) => {
    const isSelected = selectedUsers.includes(item.id);

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.userItem,
          isSelected && { backgroundColor: COLORS.LIGHT_BLUE, borderColor: COLORS.PRIMARY },
        ]}
        onPress={() => toggleUserSelection(item.id)}
      >
        <View style={styles.userInfo}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <Text style={styles.username}>{item.name}</Text>
        </View>
        {isSelected && <Icon name='check-circle' size={22} color={COLORS.PRIMARY} />}
      </TouchableOpacity>
    );
  };

  return (
    <AppWrapper title='Create Group'>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Animated.ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* 📷 Group Image Picker */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.imagePicker}
            onPress={handleImagePick}
          >
            {groupImage ? (
              <Image source={{ uri: groupImage }} style={styles.groupImage} />
            ) : (
              <View style={styles.placeholder}>
                <Icon name='camera' size={32} color={COLORS.GRAY} />
                <Text style={styles.placeholderText}>Add Group Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* 📝 Group Name Input */}
          <TextInput
            placeholder='Enter group name'
            placeholderTextColor={COLORS.GRAY}
            style={styles.input}
            value={groupName}
            onChangeText={setGroupName}
          />

          {/* 👥 Member Selection */}
          <Text style={styles.sectionTitle}>Select Members</Text>
          <FlatList
            data={dummyUsers}
            renderItem={renderUserItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.userList}
            showsVerticalScrollIndicator={false}
          />

          {/* 🚀 Create Button */}
          <TouchableOpacity onPress={() => navigate(SCREENS.GroupChatScreen)} activeOpacity={0.9}>
            <LinearGradient colors={[COLORS.PRIMARY, COLORS.PRIMARY]} style={styles.createButton}>
              <Text style={styles.createButtonText}>Create Group</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    </AppWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ms(20),
    paddingBottom: ms(40),
  },
  imagePicker: {
    alignSelf: 'center',
    marginVertical: ms(20),
  },
  groupImage: {
    width: ms(120),
    height: ms(120),
    borderRadius: ms(60),
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
  },
  placeholder: {
    width: ms(120),
    height: ms(120),
    borderRadius: ms(60),
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
  placeholderText: {
    color: COLORS.GRAY,
    fontSize: ms(12),
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.GRAY,
    borderRadius: 12,
    paddingHorizontal: ms(14),
    paddingVertical: ms(12),
    color: COLORS.TEXT,
    fontSize: ms(13),
    marginBottom: ms(16),
    backgroundColor: COLORS.WHITE,
    paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: ms(16),
    fontWeight: '600',
    color: COLORS.TEXT,
    marginBottom: ms(10),
  },
  userList: {
    paddingBottom: ms(20),
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE_OPACITY,
    height: ms(60),
    paddingHorizontal: ms(20),
    borderRadius: 14,
    marginBottom: ms(10),
    borderWidth: 1,
    borderColor: COLORS.GRAY,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(22),
    marginRight: ms(12),
  },
  username: {
    fontSize: ms(14),
    color: COLORS.TEXT,
    fontWeight: '500',
  },
  createButton: {
    marginTop: ms(20),
    paddingVertical: ms(14),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.PRIMARY,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  createButtonText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(16),
  },
});

export default CreateGroupScreen;
