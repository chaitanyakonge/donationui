import DashboardLayout from '@/components/layout/DashboardLayout';
import ReportsDashboard from '@/features/reports/ReportsDashboard';

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <ReportsDashboard />
    </DashboardLayout>
  );
}