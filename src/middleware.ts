import {
  AUTH_PATHS,
  PROTECTED_PATHS,
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

  if (AUTH_PATHS.includes(currentPath)) {
    if (sessionIdCookie) {
      return NextResponse.redirect(new URL('/account', request.url));
    }
  }

  if (PROTECTED_PATHS.includes(currentPath)) {
    if (!sessionIdCookie) {
      return NextResponse.redirect(
        new URL('/sign-in?status=unauthorized', request.url)
      );
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

    if (sessionIdCookieNotProvided) {
      return NextResponse.redirect(
        new URL('/sign-in?status=unauthorized', request.url)
      );
    }

    if (sessionNotFound) {
      const response = NextResponse.redirect(
        new URL('/sign-in?status=unauthorized', request.url)
      );

      response.cookies.delete(SESSION_ID_COOKIE.name);

      return response;
    }

    if (sessionExpired) {
      const response = NextResponse.redirect(
        new URL('/sign-in?status=expired', request.url)
      );

      response.cookies.delete(SESSION_ID_COOKIE.name);

      return response;
    }
  }
}

// TODO: Reuse code in relation to generated responses.

/**
 * TODO: The session expiry error will change and we will have to consider that there will be an unexpected error as well.
 * /src/app/api/verify-session/route.ts.
 */
