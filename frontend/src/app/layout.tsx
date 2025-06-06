import type { Metadata } from 'next';
import localfont from 'next/font/local';
import Image from 'next/image';

// TODO: алиасы
import './styles/normalize.css';
import './styles/globals.css';
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

const acromRegular = localfont({
  src: '../fonts/Acrom-Regular.ttf',
  variable: '--font-acrom-regular',
});

const acromExtraBold = localfont({
  src: '../fonts/Acrom-ExtraBold.ttf',
  variable: '--font-acrom-extra-bold',
});

const acromLight = localfont({
  src: '../fonts/Acrom-Light.ttf',
  variable: '--font-acrom-light',
});

const acromThin = localfont({
  src: '../fonts/Acrom-Thin.ttf',
  variable: '--font-acrom-thin',
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
      className={`${acrom.variable} ${acromMedium.variable} ${acromBold.variable} ${acromMedium.variable} ${acromExtraBold.variable} ${acromLight.variable} ${acromThin.variable} ${acromRegular.variable} antialised`}
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
