// components/ui/Modals/SignUpModal/SignUpModal.tsx
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

export default function SignUpModal({
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
            Чтобы подтвердить запись, войдите или зарегистрируйтесь
            <br />
            <span className='font-body-normal-bold'>{title}</span>
          </>
        }
        labels={{
          idle: 'Перейти к входу',
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
          <span className='font-body-normal-bold'>{title}</span>
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
