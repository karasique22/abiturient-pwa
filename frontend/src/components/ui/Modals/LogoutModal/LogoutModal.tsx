'use client';

import ActionModal from '../ActionModal';

interface Props {
  open: boolean;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function LogoutModal(props: Props) {
  return (
    <ActionModal
      open={props.open}
      message={
        <>
          <span>Вы действительно хотите выйти из аккаунта?</span>
          <br />
        </>
      }
      labels={{
        idle: 'Выйти из аккаунта',
        pending: 'Выходим...',
        success: 'Успешно!',
      }}
      variant='primary'
      onConfirm={props.onConfirm}
      onClose={props.onClose}
    />
  );
}
