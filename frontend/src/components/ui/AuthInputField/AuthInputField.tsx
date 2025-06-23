import { IMaskInput } from 'react-imask';
import { AnimatePresence } from 'framer-motion';
import Toast from '../Toast/Toast';
import styles from './AuthInputField.module.css';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  type?: string;
  mask?: string;
  error?: string;
  onClearError?: () => void;
  disabled?: boolean;
}
export default function AuthInputField({
  value,
  onChange,
  placeholder,
  type = 'text',
  mask,
  error,
  onClearError,
  disabled,
}: Props) {
  const common = {
    className: styles.input,
    placeholder,
    required: true,
    disabled,
    value,
  };

  return (
    <div className={styles.wrap}>
      {mask ? (
        <IMaskInput
          {...common}
          mask={mask}
          overwrite
          onAccept={(v: any) => onChange(String(v))}
        />
      ) : (
        <input
          {...common}
          type={type}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      <AnimatePresence>
        {error && <Toast msg={error} onClose={onClearError!} />}
      </AnimatePresence>
    </div>
  );
}
