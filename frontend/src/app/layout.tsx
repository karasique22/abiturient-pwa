import type { Metadata } from 'next';
import localfont from 'next/font/local';
import Image from 'next/image';

import './styles/normalize.css';
import './styles/globals.css';
import styles from './layout.module.css';

import Navbar from '@/components/layout/Navbar/Navbar';
import { Providers } from './providers';
import Link from 'next/link';

const acrom = localfont({
  src: [
    { path: '../fonts/Acrom-Thin.ttf', weight: '100' },
    { path: '../fonts/Acrom-Light.ttf', weight: '300' },
    { path: '../fonts/Acrom.ttf', weight: '400' },
    { path: '../fonts/Acrom-Medium.ttf', weight: '500' },
    { path: '../fonts/Acrom-Bold.ttf', weight: '700' },
    { path: '../fonts/Acrom-ExtraBold.ttf', weight: '800' },
  ],
  variable: '--font-acrom',
  display: 'swap',
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
    <html lang='ru' className={`${acrom.variable} antialised`}>
      <body>
        <Providers>
          <header className={`${styles.header} container`}>
            <Link href='/'>
              <Image
                className={styles.logo}
                src='/logo.svg'
                alt=''
                width={39}
                height={24}
              />
            </Link>
          </header>

          <main className={styles.appContainer}>{children}</main>

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
