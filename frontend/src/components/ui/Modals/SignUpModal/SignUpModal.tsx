'use client';

import ActionModal from '../ActionModal';

interface Props {
  open: boolean;
  title: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function SignUpModal(props: Props) {
  return (
    <ActionModal
      open={props.open}
      message={
        <>
          Вы хотите записаться:
          <br />
          <span className='font-body-normal-bold'>{props.title}</span>
        </>
      }
      labels={{
        idle: 'Подтвердить запись',
        pending: 'Записываем…',
        success: 'Готово!',
      }}
      variant='primary'
      onConfirm={props.onConfirm}
      onClose={props.onClose}
    />
  );
}
