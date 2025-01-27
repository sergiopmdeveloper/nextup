import SessionRepository from '@/app/_data/session';
import { KEY, SESSION_ID_COOKIE } from '@/app/_features/auth/constants';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

/**
 * /api/verify-session | GET | Verifies that the session provided is valid.
 * @param {Request} _ - The request object.
 * @returns {Promise<Response>} The response object.
 */
export async function GET(_: Request): Promise<Response> {
  const cookieStore = await cookies();

  const sessionIdCookie = cookieStore.get(SESSION_ID_COOKIE.name);

  if (!sessionIdCookie) {
    return Response.json(
      { detail: 'Session ID cookie not provided.' },
      { status: 400 }
    );
  }

  const session = await SessionRepository.findById(sessionIdCookie.value);

  if (!session) {
    return Response.json(
      { detail: 'Session not found fot the given session ID.' },
      { status: 404 }
    );
  }

  try {
    await jwtVerify(session.token, KEY, { algorithms: ['HS256'] });

    return new Response('Session is valid.', {
      status: 200,
    });
  } catch (error) {
    return Response.json({ detail: 'Session has expired.' }, { status: 410 });
  }
}

// TODO: Specific handling of expiry error.
