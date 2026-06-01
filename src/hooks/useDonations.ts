import { useState, useEffect } from 'react';
import { DonationService } from '@/services/api';
import { Donation, DonationRequest, DonationResponse } from '@/types';

export const useDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDonations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await DonationService.getAllDonations();
      if (response.success && response.data) {
        // Backend returns {donations: [], acknowledgement: {}}
        const donationsData = response.data.donations || [];
        setDonations(donationsData);
      } else {
        setError(response.error || 'Failed to fetch donations');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return {
    donations,
    loading,
    error,
    refetch: fetchDonations,
  };
};

export const useDonationSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<DonationResponse | null>(null);

  const submitDonation = async (donationData: DonationRequest) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await DonationService.processUnifiedDonation(donationData);
      
      if (response.success && response.data) {
        setSuccess(response.data);
        return response.data;
      } else {
        setError(response.error || 'Failed to process donation');
        return null;
      }
    } catch (err) {
      setError('An unexpected error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(null);
    setLoading(false);
  };

  return {
    submitDonation,
    loading,
    error,
    success,
    reset,
  };
};