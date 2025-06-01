'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useAuth } from '@/contexts/AuthContext';

import { getNavItems } from './navItems';

type Props = {};

const Navbar = (props: Props) => {
  const { role } = useAuth();
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
