import axios from 'axios';
import { showToast } from '.';
const API_BASE_URL = 'https://testlaravel.golivecrm.co/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// ✅ Generic POST function with toast
export const postRequest = async <T,>(
  endpoint: string,
  data: any,
  headers: Record<string, string> = {},
): Promise<T> => {
  console.log("🚀 ~ postRequest ~ data:", data);
  console.log("🚀 ~ postRequest ~ endpoint:", endpoint);

  try {
    const response = await api.post(endpoint, data, { headers });
    console.log("🚀 ~ postRequest ~ response:", response);

    // ✅ Success toast
    showToast({
      message: response?.data?.message || 'Request successful!',
      isError: false,
    });

    return response.data;
  } catch (error: any) {
    console.log("🚀 ~ postRequest ~ error:", error);
    console.error('POST Request Error:', error?.response || error);

    // ✅ Error toast
    showToast({
      message: error?.response?.data?.message || 'Something went wrong!',
      isError: true,
    });

    throw error?.response?.data || error;
  }
};

export default api;