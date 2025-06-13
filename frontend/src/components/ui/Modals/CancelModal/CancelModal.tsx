'use client';

import ActionModal from '../ActionModal';

interface Props {
  open: boolean;
  title: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function CancelModal(props: Props) {
  return (
    <ActionModal
      open={props.open}
      message={
        <>
          Вы действительно хотите отменить запись?
          <br />
          <span className='font-body-normal-bold'>{props.title}</span>
        </>
      }
      labels={{
        idle: 'Отменить запись',
        pending: 'Отменяем…',
        success: 'Запись отменена!',
      }}
      variant='primary'
      onConfirm={props.onConfirm}
      onClose={props.onClose}
    />
  );
}
