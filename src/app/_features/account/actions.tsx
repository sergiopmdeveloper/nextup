import { accountDetailsFormSchema } from '@/app/_features/account/schemas';
import { type AccountDetailsFormState } from '@/app/_features/account/types';

/**
 * Updates the account details of a user.
 * @param {AccountDetailsFormState} _ - The current form state.
 * @param {FormData} formData - The form data.
 * @returns {Promise<AccountDetailsFormState>} The new form state.
 */
export async function updateAccountDetails(
  _: AccountDetailsFormState,
  formData: FormData
): Promise<AccountDetailsFormState> {
  const validatedFields = accountDetailsFormSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return {};
}
