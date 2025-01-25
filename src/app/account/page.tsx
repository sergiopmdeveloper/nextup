import UserRepository from '@/app/_data/user';
import AccountDetailsForm from '@/app/_features/account/components/account-details-form';
import ChangeEmailPasswordBlock from '@/app/_features/account/components/change-email-password-block';
import { signOut } from '@/app/_features/auth/actions';
import { SESSION_ID_COOKIE } from '@/app/_features/auth/constants';
import Section from '@/app/_features/base/components/section';
import { cookies } from 'next/headers';
import { Toaster } from 'react-hot-toast';

/**
 * Account page component.
 */
export default async function Account() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get(SESSION_ID_COOKIE.name);

  const user = await UserRepository.findBySession(sessionId?.value as string);

  if (!user) {
    await signOut();
    return;
  }

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
