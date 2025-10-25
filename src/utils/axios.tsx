// import axios from 'axios';
// import { showToast } from '.';
// const API_BASE_URL = 'https://testlaravel.golivecrm.co/api/';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // ✅ Generic POST function with toast
// export const postRequest = async <T,>(
//   endpoint: string,
//   data: any,
//   headers: Record<string, string> = {},
// ): Promise<T> => {
//   console.log('🚀 ~ postRequest ~ data:', data);
//   console.log('🚀 ~ postRequest ~ endpoint:', endpoint);

//   try {
//     const response = await api.post(endpoint, data, { headers });
//     console.log('🚀 ~ postRequest ~ response:', response);

//     // ✅ Success toast
//     showToast({
//       message: response?.data?.message || 'Request successful!',
//       isError: false,
//     });

//     return response.data;
//   } catch (error: any) {
//     console.log('🐾 Validation Errors:', error?.response?.data?.errors);
//     console.log('🚀 ~ postRequest ~ error:', error);
//     console.error('POST Request Error:', error?.response || error);

//     // ✅ Error toast
//     showToast({
//       message: error?.response?.data?.message || 'Something went wrong!',
//       isError: true,
//     });

//     throw error?.response?.data || error;
//   }
// };

// export const getRequest = async <T,>(
//   endpoint: string,
//   headers: Record<string, string> = {},
// ): Promise<T> => {
//   console.log('🚀 ~ getRequest ~ endpoint:', endpoint);

//   try {
//     const response = await api.get(endpoint, { headers });
//     console.log('🚀 ~ getRequest ~ response:', response);

//     showToast({
//       message: response?.data?.message || 'Request successful!',
//       isError: false,
//     });

//     return response.data;
//   } catch (error: any) {
//     console.error('❌ GET Request Error:', error?.response || error);

//     showToast({
//       message: error?.response?.data?.message || 'Something went wrong!',
//       isError: true,
//     });

//     throw error?.response?.data || error;
//   }
// };

// export default api;

import axios from 'axios';
import { showToast, getItem } from '.';
import { VARIABLES } from 'constants/common';

const API_BASE_URL = 'https://testlaravel.golivecrm.co/api/';

// ✅ Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Interceptor to attach token automatically
api.interceptors.request.use(
  async config => {
    const token = await getItem(VARIABLES.USER_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🛡️ Token attached:', token);
    } else {
      console.log('⚠️ No token found, proceeding without Authorization header');
    }
    return config;
  },
  error => Promise.reject(error),
);

// ✅ Generic POST function with toast
export const postRequest = async <T,>(
  endpoint: string,
  data: any,
  headers: Record<string, string> = {},
): Promise<T> => {
  console.log('🚀 ~ postRequest ~ data:', data);
  console.log('🚀 ~ postRequest ~ endpoint:', endpoint);

  try {
    const response = await api.post(endpoint, data, { headers });
    console.log('🚀 ~ postRequest ~ response:', response);

    // showToast({
    //   message: response?.data?.message || 'Request successful!',
    //   isError: false,
    // });

    return response.data;
  } catch (error: any) {
    console.log('🐾 Validation Errors:', error?.response?.data?.errors);
    console.error('❌ POST Request Error:', error?.response || error);

    showToast({
      message: error?.response?.data?.message || 'Something went wrong!',
      isError: true,
    });

    throw error?.response?.data || error;
  }
};

// ✅ Generic GET function with toast
export const getRequest = async <T,>(
  endpoint: string,
  headers: Record<string, string> = {},
): Promise<T> => {
  console.log('🚀 ~ getRequest ~ endpoint:', endpoint);

  try {
    const response = await api.get(endpoint, { headers });
    console.log('🚀 ~ getRequest ~ response:', response);

    showToast({
      message: response?.data?.message || 'Request successful!',
      isError: false,
    });

    return response.data;
  } catch (error: any) {
    console.error('❌ GET Request Error:', error?.response || error);

    showToast({
      message: error?.response?.data?.message || 'Something went wrong!',
      isError: true,
    });

    throw error?.response?.data || error;
  }
};

export default api;
