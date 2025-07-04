// components/ui/Modals/ApplyModal/ApplyModal.tsx
'use client';

import { useRouter } from 'next/navigation';
import ActionModal from '../ActionModal';

interface Props {
  open: boolean;
  title: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
  needAuth: boolean;
}

export default function ApplyModal({
  open,
  title,
  onConfirm,
  onClose,
  needAuth,
}: Props) {
  const router = useRouter();

  /* -------- Гость -------- */
  if (needAuth) {
    return (
      <ActionModal
        open={open}
        variant='secondary'
        message={
          <>
            <span>Чтобы подтвердить запись, войдите или зарегистрируйтесь</span>
            <br />
            <span className='font-header-medium'>{title}</span>
          </>
        }
        labels={{
          idle: 'Перейти ко входу',
          pending: 'Подождите…',
          success: 'Готово!',
        }}
        onConfirm={async () => router.push('/auth/login')}
        onClose={onClose}
        successDelay={0}
      />
    );
  }

  return (
    <ActionModal
      open={open}
      variant='primary'
      message={
        <>
          Вы хотите записаться:
          <br />
          <span className='font-header-medium'>{title}</span>
        </>
      }
      labels={{
        idle: 'Подтвердить запись',
        pending: 'Записываем…',
        success: 'Готово!',
      }}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}
