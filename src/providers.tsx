'use client';

import { HeroUIProvider } from '@heroui/react';

/**
 * Providers component.
 * @param {ProvidersProps} props - The props of the component.
 * @param {React.ReactNode} props.children - The children to render.
 */
export function Providers({ children }: ProvidersProps) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}

/**
 * Providers component props.
 */
type ProvidersProps = { children: React.ReactNode };

// TODO: The ProvidersProps type must be read-only.
