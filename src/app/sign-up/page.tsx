'use client';

import SignUpForm from '@/app/_features/auth/components/sign-up-form';
import { Toaster } from 'react-hot-toast';

/**
 * Sign up page component.
 */
export default function SignUp() {
  return (
    <main>
      <SignUpForm />
      <Toaster position="bottom-right" />
    </main>
  );
}
