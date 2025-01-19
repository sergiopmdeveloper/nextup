import { KEY } from '@/app/_features/auth/constants';
import { SignJWT } from 'jose';

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
