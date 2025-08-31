import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View, Text } from 'react-native';
import { ms } from 'react-native-size-matters';
import { lightTheme } from '../../theme';

type LoaderProps = {
  visible?: boolean;
  message?: string;
  size?: 'small' | 'large';
  inline?: boolean;
};

const Loader: React.FC<LoaderProps> = ({
  visible = false,
  message,
  size = 'large',
  inline = false,
}) => {
  if (inline) {
    return (
      <View style={styles.inline}>
        <ActivityIndicator size={size} color={lightTheme.colors.primary} />
        {message ? <Text style={styles.inlineText}>{message}</Text> : null}
      </View>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ActivityIndicator size={size}  />
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  card: {
    width: ms(140),
    minHeight: ms(120),
    backgroundColor: '#fff',
    borderRadius: ms(16),
    padding: ms(20),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: ms(4) },
    shadowRadius: ms(6),
  },
  message: {
    marginTop: ms(12),
    fontSize: ms(15),
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(8),
  },
  inlineText: {
    fontSize: ms(14),
    color: '#555',
  },
});

export default Loader;
