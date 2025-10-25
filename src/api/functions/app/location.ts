import { API_ROUTES } from 'api/routes';
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
    // 🔹 Make POST request with Authorization header
    const response = await postRequest<AddLocationResponse>(API_ROUTES.ADD_LOCATION, data);
    return response;
  } catch (error: any) {
    console.error('❌ addUserLocation Error:', error);
    return null;
  }
};
