import { Icon, Typography } from 'components/common';
import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { COLORS } from 'utils/colors';

interface Props {
  visible: boolean;
  onClose: () => void;
  onCameraPress: () => void;
  onGalleryPress: () => void;
}

export const CameraGalleryPicker: React.FC<Props> = ({
  visible,
  onClose,
  onCameraPress,
  onGalleryPress,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Upload Photo</Text>

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={onCameraPress}
            >
              <Icon componentName="Feather" iconName="camera" size={28} color={COLORS.PRIMARY} />
              <Typography style={styles.optionText}>Camera</Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={onGalleryPress}
            >
              <Icon componentName="Feather" iconName="image" size={28} color={COLORS.PRIMARY} />
              <Typography style={styles.optionText}>Gallery</Typography>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Typography style={styles.cancelText}>Cancel</Typography>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.BLACK,
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    alignItems: 'center',
  },
  optionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  cancelBtn: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
});