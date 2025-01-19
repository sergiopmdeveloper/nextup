import {
  AUTH_PATHS,
  PROTECTED_PATHS,
  SESSION_ID_COOKIE,
} from '@/app/_features/auth/constants';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * App middleware.
 * @param {NextRequest} request - The request object.
 * @returns {Promise<Response | void>} The response object or nothing.
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
  }
}
