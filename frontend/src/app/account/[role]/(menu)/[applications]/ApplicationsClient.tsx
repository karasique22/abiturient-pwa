'use client';

import { useApplications } from '@/hooks/useApplications';
import { useCancelApplication } from '@/hooks/useCancelApplication';
import ApplicationCard from '@/components/ui/ApplicationCard/ApplicationCard';
import styles from './ApplicationsClient.module.css';

export default function ApplicationsClient({
  type,
}: {
  type: 'events' | 'programs';
}) {
  const { applications, mutate } = useApplications(type);
  const { cancel, loading, error } = useCancelApplication();

  const handleCancel = async (id: string) => {
    await cancel(id);
    await mutate();
  };

  return (
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
    </div>
  );
}
