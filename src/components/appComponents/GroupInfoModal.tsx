import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ms } from 'react-native-size-matters';
import { COLORS } from 'utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const GroupInfoModal = ({ visible, onClose, group }) => {
  const [search, setSearch] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;

  // Animate modal entrance and exit
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 100,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  // Filter members (memoized for performance)
  const filteredMembers = useMemo(() => {
    const term = search.toLowerCase();
    return group?.members?.filter(member =>
      member.name.toLowerCase().includes(term),
    );
  }, [search, group]);

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Drag Handle */}
          <View style={styles.dragHandle} />

          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Group Members</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={ms(22)} color={COLORS.TEXT_DARK} />
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View style={styles.searchContainer}>
            <Icon
              name="search"
              size={ms(18)}
              color={COLORS.GREY}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search members..."
              placeholderTextColor={COLORS.GREY}
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>

          {/* Members Grid */}
          <FlatList
            data={filteredMembers}
            numColumns={4}
            keyExtractor={item => item._id?.toString()}
            contentContainerStyle={styles.memberGrid}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No members found</Text>
            }
            renderItem={({ item }) => (
              <View style={styles.memberItem}>
                <Image source={{ uri: item.avatar }} style={styles.memberAvatar} />
                <Text numberOfLines={1} style={styles.memberName}>
                  {item.name}
                </Text>
              </View>
            )}
          />

          {/* Leave Group Button */}
          <TouchableOpacity style={styles.leaveButton}>
            <LinearGradient
              colors={[COLORS.PRIMARY, COLORS.PRIMARY_DARK || COLORS.PRIMARY]}
              style={styles.leaveGradient}
            >
              <Text style={styles.leaveText}>Leave Group</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default GroupInfoModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: ms(25),
    borderTopRightRadius: ms(25),
    paddingHorizontal: ms(18),
    paddingTop: ms(12),
    paddingBottom: ms(25),
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  dragHandle: {
    alignSelf: 'center',
    width: ms(40),
    height: ms(5),
    borderRadius: ms(3),
    backgroundColor: COLORS.GREY,
    marginBottom: ms(10),
    opacity: 0.4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: ms(16),
    fontWeight: '700',
    color: COLORS.TEXT_DARK,
  },
  closeButton: {
    padding: ms(4),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.SEARCH_BAR,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GREY || COLORS.PRIMARY,
    marginVertical: ms(12),
    borderRadius: ms(10),
    height: ms(45),
    paddingHorizontal: ms(10),
  },
  searchIcon: { marginRight: ms(6) },
  searchInput: {
    flex: 1,
    fontSize: ms(13),
    color: COLORS.TEXT_DARK,
  },
  memberGrid: {
    paddingBottom: ms(10),
  },
  memberItem: {
    flex: 1 / 4,
    alignItems: 'center',
    marginVertical: ms(8),
  },
  memberAvatar: {
    width: ms(60),
    height: ms(60),
    borderRadius: ms(30),
    marginBottom: ms(6),
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GREY,
  },
  memberName: {
    fontSize: ms(12),
    color: COLORS.TEXT_DARK,
    textAlign: 'center',
    width: ms(70),
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.GREY,
    fontSize: ms(13),
    marginTop: ms(20),
  },
  leaveButton: {
    marginTop: ms(18),
  },
  leaveGradient: {
    borderRadius: ms(12),
    height: ms(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaveText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: ms(14),
  },
});