import { API_ROUTES } from 'api/routes';
import { VARIABLES } from 'constants/common';
import { getItem, postRequest } from 'utils/index';
import { showToast } from 'utils/toast';
import moment from 'moment';

export const addPet = async (payload: {
  name: string;
  type?: string;
  breed: string;
  gender?: string;
  genderCastration?: string;
  dob?: string | Date;
  selectedMedia?: {
    uri: string;
    type?: string;
    fileName?: string;
  }[];
}): Promise<any> => {
  try {
    const token = await getItem(VARIABLES.USER_TOKEN);
    console.log('🚀 ~ addPet ~ token:', token);

    if (!token) {
      showToast({ message: 'User not authenticated. Please login again.', isError: true });
      return null;
    }

    const formData = new FormData();

    formData.append('name', payload.name?.trim() || '');
    if (payload.type) formData.append('type', payload.type);
    if (payload.breed) formData.append('breed', payload.breed);
    if (payload.gender) formData.append('gender', payload.gender);
    if (payload.genderCastration) formData.append('gender_castration', payload.genderCastration);

    // ✅ Format dob properly
    if (payload.dob) {
      const formattedDob = moment('2024-09-12').format('YYYY-MM-DD');
      formData.append('dob', formattedDob);
    }

    // ✅ Add media
    if (payload.selectedMedia?.[0]?.uri) {
      const file = payload.selectedMedia[0];
      formData.append('photo', {
        uri: file.uri,
        type: file.type || 'image/jpeg',
        name: file.fileName || 'photo.jpg',
      } as any);
    }

    // ✅ Safe console log (React Native doesn’t allow iterating FormData)
    console.log('🐾 addPet → Payload fields:');
    for (const key in payload) {
      if (key !== 'selectedMedia') console.log(`${key}:`, (payload as any)[key]);
    }

    const response = await postRequest(API_ROUTES.ADD_PET, formData, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    });

    return response;
  } catch (error: any) {
    console.error('🐾 addPet error:', error);
    showToast({
      message: error?.response?.data?.message || 'Failed to add pet!',
      isError: true,
    });
    throw error;
  }
};