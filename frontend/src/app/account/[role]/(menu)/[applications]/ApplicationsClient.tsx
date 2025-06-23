'use client';

import { useState } from 'react';
import { useApplications } from '@/hooks/useApplications';
import ApplicationCard from '@/components/ui/ApplicationCard/ApplicationCard';
import CancelModal from '@/components/ui/Modals/CancelModal/CancelModal';
import styles from './ApplicationsClient.module.css';

export default function ApplicationsClient({
  type,
}: {
  type: 'events' | 'programs';
}) {
  const { applications, cancelApplication, isLoading } = useApplications(type);

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
    await cancelApplication(selectedApp.id);
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
            onCancel={handleCancel}
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
