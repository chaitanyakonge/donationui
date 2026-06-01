import DashboardLayout from '@/components/layout/DashboardLayout';
import HomeDashboard from '@/features/dashboard/HomeDashboard';

export default function Home() {
  return (
    <DashboardLayout>
      <HomeDashboard />
    </DashboardLayout>
  );
}