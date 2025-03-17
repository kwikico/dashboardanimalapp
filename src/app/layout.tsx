import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dog Breeder Dashboard',
  description: 'A comprehensive dashboard for dog breeders',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=5.0',
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Dog Breeder',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}