import AccountDetailsForm from '@/app/_features/account/components/account-details-form';
import Section from '@/app/_features/base/components/section';

/**
 * Account page component.
 */
export default function Account() {
  return (
    <Section>
      <h1 className="text-3xl">Account</h1>
      <AccountDetailsForm />
    </Section>
  );
}
