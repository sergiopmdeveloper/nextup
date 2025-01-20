import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

/**
 * Displays toast message based on the status query param.
 */
export function useStatus(): void {
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get('status');

    if (status === 'unauthorized') {
      toast.error('Sign in to access your account');
    }

    if (status === 'expired') {
      toast.error('Session expired');
    }

    window.history.replaceState({}, '', window.location.pathname);
  }, [searchParams]);
}
