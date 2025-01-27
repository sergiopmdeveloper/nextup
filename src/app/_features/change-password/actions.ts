'use server';

import OtpRepository from '@/app/_data/otp';
import UserRepository from '@/app/_data/user';
import { signOut } from '@/app/_features/auth/actions';
import OtpEmail from '@/app/_features/base/components/otp-email';
import { changePasswordFormSchema } from '@/app/_features/change-password/schemas';
import { ChangePasswordFormState } from '@/app/_features/change-password/types';
import argon2 from 'argon2';
import { redirect } from 'next/navigation';
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
  const userEmail = formData.get('userEmail') as string;

  if (!formData.get('otpId')) {
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

    const user = await UserRepository.findByEmail(userEmail);

    if (!user) {
      await signOut();
      return;
    }

    const otpValue = Math.floor(100000 + Math.random() * 900000).toString();

    const otp = await OtpRepository.create(
      user.id,
      'change-password',
      otpValue
    );

    await resend.emails.send({
      from: 'Logo <onboarding@resend.dev>',
      to: [userEmail],
      subject: 'Logo - Confirm password change',
      react: OtpEmail({ otp: otpValue }),
    });

    return {
      otpId: otp.id,
    };
  }

  const existingOtpId = formData.get('otpId') as string;

  const existingOtp = await OtpRepository.findById(existingOtpId);

  if (!existingOtp) {
    redirect('/account');
  }

  const inputOtpValue = formData.get('otp') as string;

  if (existingOtp.value !== inputOtpValue) {
    return {
      errors: {
        otp: ['Invalid code.'],
      },
    };
  }

  return {};
}
