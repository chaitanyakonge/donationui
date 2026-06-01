import DashboardLayout from '@/components/layout/DashboardLayout';
import DonorsList from '@/features/donors/DonorsList';

export default function DonorsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Donor Management</h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage and track all registered donors of the trust
              </p>
            </div>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <div className="text-xs text-gray-500">Total Donors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">₹40,000</div>
                <div className="text-xs text-gray-500">Total Contributed</div>
              </div>
            </div>
          </div>
        </div>
        
        <DonorsList />
      </div>
    </DashboardLayout>
  );
}