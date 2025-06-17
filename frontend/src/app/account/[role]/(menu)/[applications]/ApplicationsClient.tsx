'use client';

import { useState } from 'react';
import { useApplications } from '@/hooks/useApplications';
import { useCancelApplication } from '@/hooks/useCancelApplication';
import ApplicationCard from '@/components/ui/ApplicationCard/ApplicationCard';
import CancelModal from '@/components/ui/Modals/CancelModal/CancelModal';
import Loader from '@/components/Loader/Loader';
import styles from './ApplicationsClient.module.css';

export default function ApplicationsClient({
  type,
}: {
  type: 'events' | 'programs';
}) {
  const { applications, mutate, isLoading } = useApplications(type);
  const { cancel } = useCancelApplication();

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
    await cancel(selectedApp.id);
    await mutate();
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
        {isLoading && <Loader />}
      </div>

      <CancelModal
        open={modalOpen}
        title={selectedApp?.title ?? ''}
        onConfirm={handleConfirm}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
