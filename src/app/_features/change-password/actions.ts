'use server';

import OtpEmail from '@/app/_features/base/components/otp-email';
import { changePasswordFormSchema } from '@/app/_features/change-password/schemas';
import { ChangePasswordFormState } from '@/app/_features/change-password/types';
import argon2 from 'argon2';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await resend.emails.send({
      from: 'Logo <onboarding@resend.dev>',
      to: [formData.get('userEmail') as string],
      subject: 'Logo - Confirm password change',
      react: OtpEmail({ otp }),
    });

    return {
      passwordsValidated: true,
    };
  }
}
