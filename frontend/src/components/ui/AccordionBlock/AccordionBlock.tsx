'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/app/details/Details.module.css';
import ToggleListIcon from '@/components/icons/ToggleListIcon';

export default function AccordionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.listBlock}>
      <button
        className={`${styles.listSpan} font-body-normal-bold`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        type='button'
      >
        <p>{title}</p>
        <motion.div
          className={styles.toggleIcon}
          animate={{ rotate: open ? -180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ToggleListIcon />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
