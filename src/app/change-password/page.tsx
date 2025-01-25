import { signOut } from '@/app/_features/auth/actions';
import { getActiveUser } from '@/app/_features/auth/utils';
import ChangePasswordForm from '@/app/_features/change-password/components/change-password-form';

/**
 * Change password page component.
 */
export default async function ChangePassword() {
  const user = await getActiveUser();

  if (!user) {
    await signOut();
    throw new Error('User not found for the active session');
  }

  return (
    <main>
      <ChangePasswordForm user={user} />
    </main>
  );
}
