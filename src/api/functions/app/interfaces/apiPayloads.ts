// interfaces/apiPayloads.ts
export interface ExperiencePayload {
  id?: number;
  title: string;
  organization: string;
  start_year: number;
  end_year?: number;
  is_current: boolean;
  description?: string;
}

export interface SkillPayload {
  id?: number;
  list_skill_id: number;
  proficiency: number;
}

export interface CertificationPayload {
  id?: number;
  list_certification_id: number;
  institution: string;
  year?: string;
  credential_id?: string;
  credential_url?: string;
}

export interface EducationPayload {
  id?: number;
  degree_id: number;
  institution: string;
  year: number;
  honor?: string;
}

export interface LicensePayload {
  id?: number;
  title: string;
  license_number: string;
  issued_at: string;
  expires_at: string;
  status: 'Valid' | 'Invalid';
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface EditProfilePayload {
  name: string;
  email: string;
  phone: string;
  location?: {
    name: string;
    lat: number;
    long: number;
  };
  zip_code?: number;
  title?: string;
  description?: string;
}
