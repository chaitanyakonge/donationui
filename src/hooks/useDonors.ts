'use client';

import { useState } from 'react';
import { DonorService, DonorListItem } from '@/services/api/donors';

export const useDonors = () => {
  const [donors, setDonors] = useState<DonorListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchDonors = async (query: string, type: 'name' | 'mobile') => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const mobile = type === 'mobile' ? query : undefined;
      const name = type === 'name' ? query : undefined;
      const response = await DonorService.searchDonors(mobile, name);

      if (response.success && response.data) {
        const donorItems = (response.data.donors || []).map(DonorService.mapToListItem);
        setDonors(donorItems);
      } else {
        setError(response.error || 'Failed to search donors');
        setDonors([]);
      }
    } catch {
      setError('An unexpected error occurred');
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setDonors([]);
    setHasSearched(false);
    setError(null);
  };

  return {
    donors,
    loading,
    error,
    hasSearched,
    searchDonors,
    clearResults,
  };
};
