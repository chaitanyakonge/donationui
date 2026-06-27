'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui';
import { useDonors } from '@/hooks';
import { formatDate, formatPhoneNumber, formatCurrency } from '@/utils';
import { DonationService } from '@/services/api';

interface DonationRecord {
  transactionId?: string;
  amount?: number;
  paymentMode?: string;
  status?: string;
  transactionEpoch?: number;
  eventDescription?: string;
}

interface DonorHistoryState {
  donorId: string;
  donorName: string;
  donations: DonationRecord[];
  loading: boolean;
  error: string | null;
}

const DonorsList: React.FC = () => {
  const router = useRouter();
  const { donors, loading, error, hasSearched, searchDonors, clearResults } = useDonors();

  const [searchType, setSearchType] = useState<'name' | 'mobile'>('name');
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<DonorHistoryState | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    searchDonors(trimmed, searchType);
    setHistory(null);
  };

  const handleClear = () => {
    setQuery('');
    clearResults();
    setHistory(null);
  };

  const handleViewDonations = async (donorId: string, donorName: string) => {
    if (history?.donorId === donorId) {
      setHistory(null);
      return;
    }
    setHistory({ donorId, donorName, donations: [], loading: true, error: null });
    try {
      const response = await DonationService.getDonationHistory(donorId);
      const raw: any = response.data;
      const donations: DonationRecord[] = (raw?.donations ?? []).map((d: any) => ({
        transactionId: d.transactionId,
        amount: d.amount,
        paymentMode: d.paymentMode,
        status: d.status,
        transactionEpoch: d.transactionEpoch,
        eventDescription: d.eventDescription,
      }));
      donations.sort((a, b) => (b.transactionEpoch ?? 0) - (a.transactionEpoch ?? 0));
      setHistory({ donorId, donorName, donations, loading: false, error: null });
    } catch {
      setHistory({ donorId, donorName, donations: [], loading: false, error: 'Failed to load donation history' });
    }
  };

  const statusColors: Record<string, string> = {
    SUCCESS: 'bg-green-100 text-green-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    FAILED: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      {/* Add Donor */}
      <Card title="Add Donor" subtitle="Register a new donor by recording their first donation">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Donors are registered when a donation is processed. Click below to record a new donation and register the donor.
          </p>
          <button
            type="button"
            onClick={() => router.push('/donations')}
            className="ml-6 flex-shrink-0 bg-orange-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
          >
            + New Donation
          </button>
        </div>
      </Card>

      {/* Search Donor */}
      <Card title="Search Donor" subtitle="Find a donor by name or mobile number">
        <form onSubmit={handleSearch} className="flex gap-3 mb-6">
          <select
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value as 'name' | 'mobile');
              handleClear();
            }}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="name">Name</option>
            <option value="mobile">Mobile Number</option>
          </select>

          <input
            type={searchType === 'mobile' ? 'tel' : 'text'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchType === 'name' ? 'Enter donor name...' : 'Enter mobile number...'}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>

          {hasSearched && (
            <button
              type="button"
              onClick={handleClear}
              className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          )}
        </form>

        {/* Results */}
        {error && (
          <div className="text-center py-6">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {hasSearched && !loading && !error && donors.length === 0 && (
          <div className="text-center py-6">
            <p className="text-gray-500 text-sm">No donors found matching your search.</p>
          </div>
        )}

        {donors.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donors.map((donor) => (
                  <React.Fragment key={donor.donorId}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {donor.firstName} {donor.lastName}
                        </div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">{donor.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{donor.email || '—'}</div>
                        <div className="text-sm text-gray-500">{formatPhoneNumber(donor.contactNumber)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-gray-900">{donor.panNumber || '—'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {donor.createdAt ? formatDate(donor.createdAt) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleViewDonations(donor.donorId, `${donor.firstName} ${donor.lastName}`)}
                          className="text-orange-600 hover:text-orange-800 text-sm font-medium transition-colors"
                        >
                          {history?.donorId === donor.donorId ? 'Hide Donations' : 'View Donations'}
                        </button>
                      </td>
                    </tr>

                    {/* Inline donation history row */}
                    {history?.donorId === donor.donorId && (
                      <tr>
                        <td colSpan={5} className="bg-orange-50 px-6 py-4">
                          <div className="text-sm font-semibold text-gray-800 mb-3">
                            Donation History — {history.donorName}
                          </div>

                          {history.loading && (
                            <p className="text-sm text-gray-500">Loading...</p>
                          )}

                          {history.error && (
                            <p className="text-sm text-red-600">{history.error}</p>
                          )}

                          {!history.loading && !history.error && history.donations.length === 0 && (
                            <p className="text-sm text-gray-500">No donations found for this donor.</p>
                          )}

                          {!history.loading && history.donations.length > 0 && (
                            <table className="min-w-full divide-y divide-gray-200 rounded-md overflow-hidden">
                              <thead className="bg-orange-100">
                                <tr>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Transaction ID</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Payment Mode</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Event</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-100">
                                {history.donations.map((d, i) => (
                                  <tr key={d.transactionId ?? i} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 text-xs font-mono text-gray-600 truncate max-w-[120px]">
                                      {d.transactionId ?? '—'}
                                    </td>
                                    <td className="px-4 py-2 text-sm font-medium text-gray-900">
                                      {d.amount != null ? formatCurrency(d.amount) : '—'}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{d.paymentMode ?? '—'}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700 max-w-xs truncate">{d.eventDescription ?? '—'}</td>
                                    <td className="px-4 py-2">
                                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[d.status ?? ''] ?? 'bg-gray-100 text-gray-800'}`}>
                                        {d.status ?? '—'}
                                      </span>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-500">
                                      {d.transactionEpoch ? formatDate(new Date(d.transactionEpoch * 1000).toISOString()) : '—'}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!hasSearched && !loading && (
          <div className="text-center py-6">
            <p className="text-gray-400 text-sm">Enter a name or mobile number above to search for donors.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DonorsList;
