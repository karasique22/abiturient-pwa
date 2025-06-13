import { motion } from 'framer-motion';
import styles from './Toast.module.css';

interface Props {
  msg: string;
  onClose: () => void;
}
export default function Toast({ msg, onClose }: Props) {
  return (
    <motion.span
      className={styles.errorToast}
      onClick={onClose}
      initial={{ opacity: 0, y: -2 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -2 }}
      transition={{ duration: 0.25 }}
    >
      {msg}
    </motion.span>
  );
}
