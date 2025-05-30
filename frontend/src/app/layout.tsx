import type { Metadata } from 'next';
import './globals.css';
import './normalize.css';
import localfont from 'next/font/local';
import styles from './layout.module.css';

import Navbar from '@/components/layout/Navbar/Navbar';

const acrom = localfont({
  src: '../fonts/Acrom.ttf',
  variable: '--font-acrom',
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
    <html lang='ru' className={acrom.variable}>
      <body>
        <header className={`${styles.header} container`}>
          <img className={styles.logo} src='logo.svg' alt='' />
        </header>

        <main className={`${acrom.variable} antialiased`}>{children}</main>

        {/* ФУТЕР — только на мобилке */}
        <footer className={styles.mobileFooter}>
          <Navbar />
        </footer>

        {/* ДЕСКТОПНАЯ НАВИГАЦИЯ — только на ПК */}
        <aside></aside>
      </body>
    </html>
  );
}
