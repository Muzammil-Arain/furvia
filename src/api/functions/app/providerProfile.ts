import { postRequest } from 'utils/index';
import {
  ExperiencePayload,
  SkillPayload,
  CertificationPayload,
  EducationPayload,
  LicensePayload,
  ApiResponse,
} from './interfaces/apiPayloads';
import { API_ROUTES } from 'api/routes';

export const saveExperience = async (data: ExperiencePayload): Promise<ApiResponse | null> => {
  try {
    const response = await postRequest<ApiResponse>(API_ROUTES.SAVED_EXPERIENCES, data);
    return response;
  } catch (error: any) {
    console.error('❌ saveExperience Error:', error);
    return null;
  }
};

export const saveSkill = async (data: SkillPayload): Promise<ApiResponse | null> => {
  try {
    const response = await postRequest<ApiResponse>(API_ROUTES.SAVED_SKILLS, data);
    return response;
  } catch (error: any) {
    console.error('❌ saveSkill Error:', error);
    return null;
  }
};

export const saveCertification = async (
  data: CertificationPayload,
): Promise<ApiResponse | null> => {
  try {
    const response = await postRequest<ApiResponse>(API_ROUTES.SAVED_CERTIFICATION, data);
    return response;
  } catch (error: any) {
    console.error('❌ saveCertification Error:', error);
    return null;
  }
};

export const saveEducation = async (data: EducationPayload): Promise<ApiResponse | null> => {
  try {
    const response = await postRequest<ApiResponse>(API_ROUTES.SAVED_EDUCTION, data);
    return response;
  } catch (error: any) {
    console.error('❌ saveEducation Error:', error);
    return null;
  }
};

export const saveLicense = async (data: LicensePayload): Promise<ApiResponse | null> => {
  try {
    const response = await postRequest<ApiResponse>(API_ROUTES.SAVED_LICENSES, data);
    return response;
  } catch (error: any) {
    console.error('❌ saveLicense Error:', error);
    return null;
  }
};
