import type { Metadata } from 'next';
import localfont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';
import PwaRegister from '@/components/PwaRegister';

import './styles/normalize.css';
import './styles/globals.css';
import styles from './layout.module.css';

import Navbar from '@/components/layout/Navbar/Navbar';
import { Providers } from './providers';

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
  manifest: '/manifest.json',
  themeColor: '#000000',
  viewport: { width: 'device-width', initialScale: 1 },
  icons: {
    icon: '/icons/icon-192x192.png',
    shortcut: '/icons/icon-192x192.png',
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    title: 'Абитуриент',
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'Абитуриент',
    description: 'Портал для абитуриентов ДО Косыгина',
    url: 'https://abiturient-do.vercel.app/',
    siteName: 'Абитуриент',
    type: 'website',
    locale: 'ru_RU',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Абитуриент',
    description: 'Портал для абитуриентов ДО Косыгина',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ru' className={`${acrom.variable} antialised`}>
      <body>
        <Providers>
          <PwaRegister />
          <header className={`${styles.header} container`}>
            <Link href='/'>
              <Image
                className={styles.logo}
                src='/logo.svg'
                alt='Логотип Абитуриент'
                width={39}
                height={24}
              />
            </Link>
          </header>

          <main className={styles.appContainer}>{children}</main>

          <footer className={styles.mobileFooter}>
            <Navbar />
          </footer>
        </Providers>
      </body>
    </html>
  );
}
