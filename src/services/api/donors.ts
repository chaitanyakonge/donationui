import { apiClient } from './client';
import { API_ENDPOINTS } from '@/constants';
import { ApiResponse, Donor } from '@/types';

interface Acknowledgement {
  success: boolean;
  message: string;
}

interface GetDonorResponse {
  donorId?: string;
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  email?: string;
  panNumber?: string;
  address?: string;
  createdAt?: number;
  acknowledgement?: Acknowledgement;
}

interface GetDonorsResponse {
  donors?: GetDonorResponse[];
  acknowledgement?: Acknowledgement;
}

export interface DonorListItem extends Donor {
  donorId: string;
  createdAt?: string;
}

export class DonorService {
  static async getAllDonors(): Promise<ApiResponse<GetDonorsResponse>> {
    return apiClient.post<GetDonorsResponse>(API_ENDPOINTS.DONORS.GET_ALL);
  }

  static async getDonorById(donorId: string): Promise<ApiResponse<GetDonorResponse>> {
    return apiClient.post<GetDonorResponse>(API_ENDPOINTS.DONORS.GET_BY_ID, {
      donorId,
    });
  }

  static async searchDonors(
    mobile?: string,
    name?: string
  ): Promise<ApiResponse<GetDonorsResponse>> {
    return apiClient.post<GetDonorsResponse>(API_ENDPOINTS.DONORS.SEARCH, {
      mobile,
      name,
    });
  }

  static mapToListItem(donor: GetDonorResponse): DonorListItem {
    return {
      donorId: donor.donorId || '',
      id: donor.donorId,
      firstName: donor.firstName || '',
      lastName: donor.lastName || '',
      contactNumber: donor.contactNumber || '',
      email: donor.email || '',
      panNumber: donor.panNumber || '',
      address: donor.address || '',
      createdAt: donor.createdAt ? new Date(donor.createdAt * 1000).toISOString() : undefined,
    };
  }
}

export default DonorService;
