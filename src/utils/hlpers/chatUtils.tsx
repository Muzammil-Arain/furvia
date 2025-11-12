import firestore from '@react-native-firebase/firestore';

const getChatId = (user1Id: string, user2Id: string) => [user1Id, user2Id].sort().join('_');

export const createOrGetChatRoom = async (user1Id: string, user2Id: string) => {
  try {
    const chatId = getChatId(user1Id, user2Id);
    const chatRef = firestore().collection('chats').doc(chatId);
    const doc = await chatRef.get();

    if (!doc.exists) {
      await chatRef.set({
        members: [user1Id, user2Id],
        lastMessage: null,
        lastUpdated: firestore.FieldValue.serverTimestamp(),
      });
      console.log('✅ Chatroom created successfully 🎉', chatId);
    } else {
      console.log('ℹ️ Chatroom already exists:', chatId);
    }

    return chatId;
  } catch (error) {
    console.error('❌ Error creating chatroom:', error);
    throw error;
  }
};

// export const getUserChats = async (userId: string) => {
//   const snapshot = await firestore()
//     .collection('chats')
//     .where('members', 'array-contains', userId)
//     .orderBy('lastUpdated', 'desc')
//     .get();

//   return snapshot.docs.map(doc => ({
//     chatId: doc.id,
//     ...doc.data(),
//   }));
// };

export const getUserChats = async (userId: string) => {
  try {
    const snapshot = await firestore()
      .collection('chats')
      .where('members', 'array-contains', userId)
      .orderBy('lastUpdated', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      chatId: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching user chats:', error);
    return [];
  }
};

// 🔁 Optional: for real-time updates
export const listenToUserChats = (userId: string, callback: (chats: any[]) => void) => {
  return firestore()
    .collection('chats')
    .where('members', 'array-contains', JSON.stringify(userId))
    .orderBy('lastUpdated', 'desc')
    .onSnapshot(snapshot => {
      if (snapshot?.docs) {
        const chats = snapshot?.docs?.map(doc => ({
          chatId: doc?.id,
          ...doc?.data(),
        }));
        callback(chats);
      }
    });
};
