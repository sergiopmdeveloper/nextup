import AccountDetailsForm from '@/app/_features/account/components/account-details-form';
import ChangeEmailPasswordBlock from '@/app/_features/account/components/change-email-password-block';
import { getSessionUser } from '@/app/_features/auth/utils';
import Section from '@/app/_features/base/components/section';
import { Toaster } from 'react-hot-toast';

/**
 * Account page component.
 */
export default async function Account() {
  const user = await getSessionUser();

  return (
    <Section>
      <h1 className="text-3xl">Account</h1>

      <div className="mt-4 flex flex-col gap-6 sm:flex-row">
        <AccountDetailsForm user={user} />
        <ChangeEmailPasswordBlock />
      </div>

      <Toaster position="bottom-right" />
    </Section>
  );
}
