'use server';

import SessionRepository from '@/app/_data/session';
import UserRepository from '@/app/_data/user';
import { SESSION_ID_COOKIE } from '@/app/_features/auth/constants';
import {
  signInFormSchema,
  signUpFormSchema,
} from '@/app/_features/auth/schemas';
import {
  type SignInFormState,
  type SignUpFormState,
} from '@/app/_features/auth/types';
import { generateToken } from '@/app/_features/auth/utils';
import argon2 from 'argon2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Signs the user in.
 * @param {SignInFormState} _ - The current form state.
 * @param {FormData} formData - The form data.
 * @returns {Promise<SignInFormState>} The new form state or the redirection to the account page.
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

  const session = await SessionRepository.create(
    user.id,
    await generateToken()
  );

  const cookieStore = await cookies();

  cookieStore.set(SESSION_ID_COOKIE.name, session.id, {
    ...SESSION_ID_COOKIE.options,
    expires: new Date(Date.now() + SESSION_ID_COOKIE.duration),
  });

  redirect('/account');
}

/**
 * Creates a new user.
 * @param {SignUpFormState} _ - The current form state.
 * @param {FormData} formData - The form data.
 * @returns {Promise<SignUpFormState>} The new form state or the redirection to the account page.
 */
export async function signUp(
  _: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const validatedFields = signUpFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email } = validatedFields.data;

  const user = await UserRepository.findByEmail(email);

  if (user) {
    return {
      emailAlreadyInUse: true,
    };
  }

  return {};
}

/**
 * Signs the user out.
 */
export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_ID_COOKIE.name);

  redirect('/sign-in');
}
