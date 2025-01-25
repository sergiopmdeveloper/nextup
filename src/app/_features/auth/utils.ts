import UserRepository from '@/app/_data/user';
import { signOut } from '@/app/_features/auth/actions';
import { KEY, SESSION_ID_COOKIE } from '@/app/_features/auth/constants';
import { type User } from '@prisma/client';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

/**
 * Generates a token.
 * @returns {Promise<string>} The signed token.
 */
export async function generateToken(): Promise<string> {
  return new SignJWT()
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(KEY);
}

/**
 * Gets the user associated with the active session.
 * @returns {Promise<User>} The user.
 */
export async function getSessionUser(): Promise<User> {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get(SESSION_ID_COOKIE.name);

  const user = await UserRepository.findBySession(sessionId?.value as string);

  if (!user) {
    await signOut();
    throw new Error('User not found for active session');
  }

  return user;
}
