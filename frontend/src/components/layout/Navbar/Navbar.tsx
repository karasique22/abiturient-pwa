'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

import { getNavItems, UserRole } from './navItems';

type Props = {};

const Navbar = (props: Props) => {
  const [role, setRole] = useState<UserRole>(null);

  useEffect(() => {
    // Получаем роль из localStorage (фейк)
    const savedRole = localStorage.getItem('role') as UserRole | null;
    setRole(savedRole);
  }, []);

  // Генерируем навигацию под роль пользователя
  const navItems = getNavItems(role);

  return (
    <nav className={styles.navBar}>
      {navItems.map(({ id, label, Icon, href }) => (
        <Link
          key={id}
          href={href}
          className={`${styles.navItem} font-body-small`}
        >
          <Icon />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
