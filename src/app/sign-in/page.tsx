'use client';

import SignInForm from '@/app/_features/auth/components/sign-in-form';
import { useStatus } from '@/app/_features/auth/hooks';
import { Toaster } from 'react-hot-toast';

/**
 * Sign in page component.
 */
export default function SignIn() {
  useStatus();

  return (
    <main>
      <SignInForm />
      <Toaster position="bottom-right" />
    </main>
  );
}
