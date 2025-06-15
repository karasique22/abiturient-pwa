'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AccordionBlock.module.css';
import ToggleListIcon from '@/components/icons/ToggleListIcon';

interface Props {
  title: string;
  children: React.ReactNode;

  variant?: 'default' | 'faq';
}

export default function AccordionBlock({
  title,
  children,
  variant = 'default',
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`${styles.block} ${styles[variant]} ${
        open ? styles.open : ''
      }`}
    >
      <button
        type='button'
        aria-expanded={open}
        className={styles.head}
        onClick={() => setOpen((v) => !v)}
      >
        <p className='font-body-medium'>{title}</p>
        <motion.span
          className={styles.icon}
          animate={{ rotate: open ? -180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ToggleListIcon />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={styles.body}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
