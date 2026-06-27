import { apiClient } from './client';
import { API_ENDPOINTS } from '@/constants';
import { DonationRequest, DonationResponse, Donation, ApiResponse } from '@/types';

export class DonationService {
  static async processUnifiedDonation(
    donationData: DonationRequest
  ): Promise<ApiResponse<DonationResponse>> {
    return apiClient.post<DonationResponse>(
      API_ENDPOINTS.DONATIONS.PROCESS_UNIFIED,
      donationData
    );
  }

  static async getDonationById(transactionId: string): Promise<ApiResponse<Donation>> {
    return apiClient.post<Donation>(API_ENDPOINTS.DONATIONS.GET_BY_ID, {
      transactionId
    });
  }

  static async getDonationHistory(donorId: string): Promise<ApiResponse<Donation[]>> {
    return apiClient.post<Donation[]>(API_ENDPOINTS.DONATIONS.GET_HISTORY, {
      donorId
    });
  }

  static async getAllDonations(): Promise<ApiResponse<any>> {
    // Get donations for the last 30 days
    const endEpoch = Math.floor(Date.now() / 1000);
    const startEpoch = endEpoch - (30 * 24 * 60 * 60); // 30 days ago
    
    return apiClient.post<any>(API_ENDPOINTS.DONATIONS.GET_IN_RANGE, {
      startEpoch,
      endEpoch
    });
  }

  static async getDonationsInRange(startEpoch: number, endEpoch: number): Promise<ApiResponse<any>> {
    return apiClient.post<any>(API_ENDPOINTS.DONATIONS.GET_IN_RANGE, {
      startEpoch,
      endEpoch
    });
  }

  static async calculateTotalDonations(startEpoch: number, endEpoch: number): Promise<ApiResponse<any>> {
    return apiClient.post<any>(API_ENDPOINTS.DONATIONS.CALCULATE_TOTAL, {
      startEpoch,
      endEpoch
    });
  }

  static async getDonationsByPaymentMode(startEpoch: number, endEpoch: number, paymentMode: string): Promise<ApiResponse<any>> {
    return apiClient.post<any>(API_ENDPOINTS.DONATIONS.GET_BY_PAYMENT_MODE, {
      startEpoch,
      endEpoch,
      paymentMode
    });
  }

  static async updateTransactionStatus(transactionId: string, status: string, utr?: string): Promise<ApiResponse<any>> {
    return apiClient.post<any>(API_ENDPOINTS.DONATIONS.UPDATE_STATUS, {
      transactionId,
      status,
      utr,
    });
  }
}

export default DonationService;