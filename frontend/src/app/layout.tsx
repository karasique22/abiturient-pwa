import type { Metadata } from 'next';
import Image from 'next/image';

import './normalize.css';
import './globals.css';
import localfont from 'next/font/local';
import styles from './layout.module.css';

import Navbar from '@/components/layout/Navbar/Navbar';
import { Providers } from './providers';

const acrom = localfont({
  src: '../fonts/Acrom.ttf',
  variable: '--font-acrom',
});

const acromMedium = localfont({
  src: '../fonts/Acrom-Medium.ttf',
  variable: '--font-acrom-medium',
});

const acromBold = localfont({
  src: '../fonts/Acrom-Bold.ttf',
  variable: '--font-acrom-bold',
});

export const metadata: Metadata = {
  title: 'Абитуриент',
  description: 'Портал для абитуриентов ДО Косыгина',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='ru'
      className={
        acrom.variable +
        ' ' +
        acromMedium.variable +
        ' ' +
        acromBold.variable +
        ' ' +
        'antialised'
      }
    >
      <body>
        <Providers>
          <header className={`${styles.header} container`}>
            <Image
              className={styles.logo}
              src='/logo.svg'
              alt=''
              width={39}
              height={24}
            />
          </header>

          <main>{children}</main>

          {/* ФУТЕР — только на мобилке */}
          <footer className={styles.mobileFooter}>
            <Navbar />
          </footer>

          {/* ДЕСКТОПНАЯ НАВИГАЦИЯ — только на ПК */}
          <aside></aside>
        </Providers>
      </body>
    </html>
  );
}
