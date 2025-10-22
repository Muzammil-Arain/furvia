import { API_ROUTES } from 'api/routes';
import { showToast } from 'utils/toast';
import { getItem } from 'utils/storage'; // adjust path to your storage util
import { VARIABLES } from 'constants/common';
import { postRequest } from 'utils/index';

interface LocationPayload {
  location: {
    name: string;
    lat: number;
    long: number;
  };
  zip_code: string | number;
}

interface AddLocationResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const addUserLocation = async (
  data: LocationPayload,
): Promise<AddLocationResponse | null> => {
  try {
    // 🔹 Get token
    const token = await getItem(VARIABLES.USER_TOKEN);
    if (!token) {
      showToast({ message: 'User not authenticated. Please login again.', isError: true });
      return null;
    }

    // 🔹 Make POST request with Authorization header
    const response = await postRequest<AddLocationResponse>(API_ROUTES.ADD_LOCATION, data, {
      Authorization: `Bearer ${token}`,
    });

    return response;
  } catch (error: any) {
    console.error('❌ addUserLocation Error:', error);
    return null;
  }
};
