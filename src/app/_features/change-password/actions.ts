'use server';

import { changePasswordFormSchema } from '@/app/_features/change-password/schemas';
import { ChangePasswordFormState } from '@/app/_features/change-password/types';
import argon2 from 'argon2';

/**
 * Changes the password of a user.
 * @param {ChangePasswordFormState} _ - The current form state.
 * @param {FormData} formData - The form data.
 * @returns {Promise<ChangePasswordFormState>} The new form state.
 */
export async function changePassword(
  _: ChangePasswordFormState,
  formData: FormData
): Promise<ChangePasswordFormState> {
  if (!formData.get('otp')) {
    const validatedFields = changePasswordFormSchema.safeParse({
      actualPassword: formData.get('actualPassword'),
      newPassword: formData.get('newPassword'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { actualPassword, newPassword } = validatedFields.data;
    const realActualPassword = formData.get('realActualPassword') as string;

    if (!(await argon2.verify(realActualPassword, actualPassword))) {
      return {
        errors: {
          actualPassword: ['Incorrect password.'],
        },
      };
    }

    if (await argon2.verify(realActualPassword, newPassword)) {
      return {
        errors: {
          newPassword: [
            'New password has to be different from the current one.',
          ],
        },
      };
    }

    return {
      passwordsValidated: true,
    };
  }
}
