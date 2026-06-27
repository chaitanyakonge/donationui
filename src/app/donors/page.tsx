import DashboardLayout from '@/components/layout/DashboardLayout';
import DonorsList from '@/features/donors/DonorsList';

export default function DonorsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">Donor Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Add new donors or search existing donors by name or mobile number.
          </p>
        </div>

        <DonorsList />
      </div>
    </DashboardLayout>
  );
}
