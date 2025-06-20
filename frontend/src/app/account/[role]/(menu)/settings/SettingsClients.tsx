'use client';

import { useState } from 'react';

import LogoutModal from '@/components/ui/Modals/LogoutModal/LogoutModal';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './SettingsClient.module.css';
import Loader from '@/components/Loader/Loader';

export default function SettingsClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, loading } = useCurrentUser();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    setModalOpen(false);
    await logout();
    router.push('/account');
  };

  return (
    <>
      {loading && !user && <Loader />}
      {user && (
        <div className='container'>
          <div className={styles.blocks}>
            <div className={`${styles.block} ${styles.verticalBlock}`}>
              <span className='font-body-medium'>ФИО</span>
              {user.fullName && <div>{user.fullName}</div>}
            </div>
            <div className={`${styles.block} ${styles.verticalBlock}`}>
              <span className='font-body-medium'>Электронная почта</span>
              {user.email && <div>{user.email}</div>}
            </div>
            <div className={`${styles.block} ${styles.verticalBlock}`}>
              <span className='font-body-medium'>Пароль</span>
              <div className={styles.horizontalBlock}>
                <div>•••••••••••</div>
                <div>а</div>
              </div>
            </div>
            <div className={styles.block}>
              <span className='font-body-medium'>Уведомления</span>
            </div>
            <div className={styles.block} onClick={() => setModalOpen(true)}>
              <span className='font-body-medium'>Выйти</span>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <LogoutModal
          open={modalOpen}
          onConfirm={handleLogout}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
