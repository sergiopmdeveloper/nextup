'use server';

import UserRepository from '@/app/_data/user';
import { accountDetailsFormSchema } from '@/app/_features/account/schemas';
import { type AccountDetailsFormState } from '@/app/_features/account/types';
import { revalidatePath } from 'next/cache';

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

  const userId = formData.get('userId') as string;
  const { name } = validatedFields.data;

  await UserRepository.updateName(userId, name);

  revalidatePath('/account');

  return {};
}
