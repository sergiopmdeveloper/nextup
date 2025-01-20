import Header from '@/app/_features/base/components/header';
import '@/globals.css';
import { Providers } from '@/providers';
import type { Metadata } from 'next';

/**
 * Default metadata.
 */
export const metadata: Metadata = {
  title: 'nextup',
  description: 'A fully charged Next.js template to kickstart your projects ⚡',
};

/**
 * Root layout component.
 * @param {RootLayoutProps} props - The props of the component.
 * @param {React.ReactNode} props.children - The children to render.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

/**
 * Root layout component props.
 */
type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;
