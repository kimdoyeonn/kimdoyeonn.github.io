import type { Metadata } from 'next';
import './globals.css';
import SectionContainer from '@/components/SectionContainer';
import ThemeProvider from '@/components/theme-provider';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <meta
        name='google-site-verification'
        content='wEgVvz1kfH0geF4rEaLrinoMZ_Sq8cNBAW-6o-y0jPg'
      />
      <meta
        name='google-adsense-account'
        content='ca-pub-1953618852448098'
      ></meta>
      <body className={cn('antialiased')}>
        <ThemeProvider>
          <SectionContainer>{children}</SectionContainer>
        </ThemeProvider>
      </body>
    </html>
  );
}
