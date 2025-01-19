'use server';

import SessionRepository from '@/app/_data/session';
import UserRepository from '@/app/_data/user';
import { signInFormSchema } from '@/app/_features/auth/schemas';
import { type SignInFormState } from '@/app/_features/auth/types';
import { generateToken } from '@/app/_features/auth/utils';
import argon2 from 'argon2';

/**
 * Signs the user in.
 * @param {SignInFormState} _ - The current form state.
 * @param {FormData} formData - The form data.
 * @returns {Promise<SignInFormState>} The new form state.
 */
export async function signIn(
  _: SignInFormState,
  formData: FormData
): Promise<SignInFormState> {
  const validatedFields = signInFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const user = await UserRepository.findByEmail(email);

  if (!user || !(await argon2.verify(user.password, password))) {
    return {
      invalidCredentials: true,
    };
  }

  const token = await generateToken();

  await SessionRepository.create(user.id, token);

  return {};
}
