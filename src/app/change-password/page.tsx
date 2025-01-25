import { getSessionUser } from '@/app/_features/auth/utils';
import ChangePasswordForm from '@/app/_features/change-password/components/change-password-form';

/**
 * Change password page component.
 */
export default async function ChangePassword() {
  const user = await getSessionUser();

  return (
    <main>
      <ChangePasswordForm user={user} />
    </main>
  );
}
