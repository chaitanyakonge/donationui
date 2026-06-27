'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DonationsList from '@/features/donations/DonationsList';
import DonationForm from '@/components/forms/DonationForm';
import { cn } from '@/utils';

const tabs = [
  { id: 'new', name: 'Make New Donation', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  )},
  { id: 'recent', name: 'View Recent Donations', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )},
];

export default function DonationsPage() {
  const [activeTab, setActiveTab] = useState('new');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  <span className={cn(
                    activeTab === tab.id ? 'text-orange-500' : 'text-gray-400'
                  )}>
                    {tab.icon}
                  </span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'new' && <DonationForm />}

        {activeTab === 'recent' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Donation Overview</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Track and manage all donations received by the trust
                  </p>
                </div>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">₹0</div>
                    <div className="text-xs text-gray-500">Total Collected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-xs text-gray-500">Total Donations</div>
                  </div>
                </div>
              </div>
            </div>
            
            <DonationsList />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}