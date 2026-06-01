'use client';

import { useEffect, useMemo, useState } from 'react';
import { DonorService, DonorListItem } from '@/services/api/donors';

type DonorStats = {
  totalDonors: number;
};

export const useDonors = () => {
  const [donors, setDonors] = useState<DonorListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDonors = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await DonorService.getAllDonors();

      if (response.success && response.data) {
        const donorItems = (response.data.donors || []).map(DonorService.mapToListItem);
        setDonors(donorItems);
      } else {
        setError(response.error || 'Failed to fetch donors');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const stats: DonorStats = useMemo(
    () => ({
      totalDonors: donors.length,
    }),
    [donors.length]
  );

  return {
    donors,
    loading,
    error,
    refetch: fetchDonors,
    stats,
  };
};
