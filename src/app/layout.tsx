import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dog Breeder Dashboard',
  description: 'A comprehensive dashboard for dog breeders',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}