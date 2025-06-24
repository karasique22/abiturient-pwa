'use client';

import { useState } from 'react';
import { useApplications } from '@/hooks/useApplications';
import ApplicationCard from '@/components/ui/ApplicationCard/ApplicationCard';
import CancelModal from '@/components/ui/Modals/CancelModal/CancelModal';
import styles from './ApplicationsClient.module.css';

export default function ApplicationsClient({
  type,
  role,
}: {
  type: 'events' | 'programs';
  role: 'student' | 'moderator';
}) {
  const {
    applications,
    cancelApplication,
    changeApplicationStatus,
    isLoading,
  } = useApplications(type, role);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const handleCancel = (id: string, title: string) => {
    setSelectedApp({ id, title });
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedApp) return;
    await cancelApplication(selectedApp.id, role);
  };

  const handleChangeStatus = async (
    id: string,
    status: 'NEW' | 'APPROVED' | 'CANCELLED'
  ) => {
    await changeApplicationStatus(id, status);
  };

  return (
    <>
      <div
        className={`${styles.applicationsContainer} container background-container`}
      >
        {applications.map((app) => (
          <ApplicationCard
            key={app.id}
            application={app}
            role={role}
            onCancel={handleCancel}
            onStatusChange={handleChangeStatus}
          />
        ))}
        {applications.length === 0 && !isLoading && (
          <div>Пока здесь пусто =(</div>
        )}
      </div>

      {modalOpen && (
        <CancelModal
          open={modalOpen}
          title={selectedApp?.title ?? ''}
          onConfirm={handleConfirm}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
