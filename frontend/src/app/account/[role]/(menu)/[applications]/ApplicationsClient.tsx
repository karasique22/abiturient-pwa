'use client';

import { useFetch } from '@/hooks/useFetch';
import ApplicationCard from '@/components/ui/ApplicationCard/ApplicationCard';
import { ApplicationApi } from '@/types';
import Loader from '@/components/Loader/Loader';
import styles from './ApplicationsClient.module.css';

export default function ApplicationsClient({
  type,
}: {
  type: 'event' | 'program';
}) {
  const { data, loading, error } = useFetch<ApplicationApi[]>(
    `/applications/my-${type}s`
  );

  if (loading) return <Loader />;
  if (error) return <div>Ошибка</div>;
  if (!data?.length) return <div>Нет заявок</div>;

  return (
    <div
      className={`${styles.applicationsContainer} container background-container`}
    >
      {data.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  );
}
