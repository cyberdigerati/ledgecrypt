import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LedgeCrypt - Intelligence Signal Feed',
  description:
    'Real-time intelligence monitoring for AI, blockchain, compliance, and emerging technologies',
  keywords: [
    'AI',
    'blockchain',
    'crypto',
    'compliance',
    'intelligence',
    'signals',
  ],
  authors: [{ name: 'LedgeCrypt' }],
  openGraph: {
    title: 'LedgeCrypt Signal Feed',
    description: 'Real-time intelligence monitoring platform',
    url: 'https://ledgecrypt.com',
    siteName: 'LedgeCrypt',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LedgeCrypt Signal Feed',
    description: 'Real-time intelligence monitoring platform',
    creator: '@LedgeCrypt',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
