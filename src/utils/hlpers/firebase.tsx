import firestore from '@react-native-firebase/firestore';

export const checkConnection = async () => {
  try {
    console.log('🔥 Checking Firebase connection...');

    // Test Firestore connection
    const docRef = await firestore().collection('testConnection').add({
      time: new Date().toISOString(),
      status: 'ok',
    });

    console.log('✅ Firestore write success:', docRef.id);
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
  }
};
