// authService.ts
import { API_ROUTES } from 'api/routes';
import { postRequest } from 'utils/axios';

// ==========================
// Interfaces
// ==========================
interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
  data?: any;
}

// ==========================
// Add Location
// ==========================
export interface AddLocationPayload {
  location: {
    name: string;
    lat: number;
    long: number;
  };
  zip_code: number;
}
export const addLocation = async (payload: AddLocationPayload): Promise<AuthResponse> => {
  return postRequest<AuthResponse>(API_ROUTES.ADD_LOCATION, payload);
};

// ==========================
// Add Pet
// ==========================
export interface AddPetPayload {
  pet_id?: number;
  name: string;
  type: string;
  breed: string;
  gender: string;
  gender_castration: string;
  dob: string;
  photo: object;
}
export const addPet = async (payload: AddPetPayload): Promise<AuthResponse> => {
  return postRequest<AuthResponse>(API_ROUTES.ADD_PET, payload);
};
