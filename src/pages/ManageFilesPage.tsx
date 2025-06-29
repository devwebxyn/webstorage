// src/pages/ManageFilesPage.tsx
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { UploadForm } from '../components/manage/UploadForm';
import { CreatePanel } from '../components/manage/CreatePanel';

export default function ManageFilesPage() {
    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                {/* Kolom kiri untuk Upload */}
                <div className="lg:col-span-2">
                    <UploadForm />
                </div>
                {/* Kolom kanan untuk Create */}
                <div className="lg:col-span-1">
                    <CreatePanel />
                </div>
            </div>
        </DashboardLayout>
    );
}