import {
  PROTECTED_PATHS,
  PUBLIC_PATHS,
  SESSION_ID_COOKIE,
} from '@/app/_features/auth/constants';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * App middleware.
 * @param {NextRequest} request - The request object.
 * @returns {Promise<Response | void>} The response object in case it exists.
 */
export async function middleware(
  request: NextRequest
): Promise<Response | void> {
  const currentPath = request.nextUrl.pathname;
  const sessionIdCookie = request.cookies.get(SESSION_ID_COOKIE.name);

  const authorizedResponse = NextResponse.redirect(
    new URL('/account', request.url)
  );

  const unauthorizedResponse = NextResponse.redirect(
    new URL('/sign-in?status=unauthorized', request.url)
  );

  const expiredSessionResponse = NextResponse.redirect(
    new URL('/sign-in?status=expired', request.url)
  );

  if (PUBLIC_PATHS.includes(currentPath)) {
    if (sessionIdCookie) {
      return authorizedResponse;
    }
  }

  if (PROTECTED_PATHS.includes(currentPath)) {
    if (!sessionIdCookie) {
      return unauthorizedResponse;
    }

    const verifySessionResponse = await fetch(
      `${request.nextUrl.origin}/api/verify-session`,
      {
        method: 'GET',
        headers: {
          Cookie: `${SESSION_ID_COOKIE.name}=${sessionIdCookie.value}`,
        },
      }
    );

    const sessionIdCookieNotProvided = verifySessionResponse.status === 400;
    const sessionNotFound = verifySessionResponse.status === 404;
    const sessionExpired = verifySessionResponse.status === 410;
    const sessionInvalid = verifySessionResponse.status === 500;

    if (sessionIdCookieNotProvided) {
      return unauthorizedResponse;
    }

    if (sessionNotFound) {
      unauthorizedResponse.cookies.delete(SESSION_ID_COOKIE.name);
      return unauthorizedResponse;
    }

    if (sessionExpired) {
      expiredSessionResponse.cookies.delete(SESSION_ID_COOKIE.name);
      return expiredSessionResponse;
    }

    if (sessionInvalid) {
      unauthorizedResponse.cookies.delete(SESSION_ID_COOKIE.name);
      return unauthorizedResponse;
    }
  }
}
