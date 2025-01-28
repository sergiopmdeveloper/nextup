import AccountDetailsForm from '@/app/_features/account/components/account-details-form';
import ChangeCredentials from '@/app/_features/account/components/change-credentials';
import { signOut } from '@/app/_features/auth/actions';
import { getActiveUser } from '@/app/_features/auth/utils';
import Section from '@/app/_features/base/components/section';
import { Toaster } from 'react-hot-toast';

/**
 * Account page component.
 */
export default async function Account() {
  const user = await getActiveUser();

  if (!user) {
    await signOut();
  }

  return (
    <Section>
      <h1 className="text-3xl">Account</h1>

      <div className="mt-4 flex flex-col gap-6 sm:flex-row">
        <AccountDetailsForm user={user!} />
        <ChangeCredentials />
      </div>

      <Toaster position="bottom-right" />
    </Section>
  );
}
