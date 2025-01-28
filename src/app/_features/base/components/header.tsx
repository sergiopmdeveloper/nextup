'use client';

import { signOut } from '@/app/_features/auth/actions';
import { PROTECTED_PATHS } from '@/app/_features/auth/constants';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/navbar';
import { usePathname } from 'next/navigation';

/**
 * Header component.
 */
export default function Header() {
  const pathname = usePathname();

  const isProtectedPath = PROTECTED_PATHS.includes(pathname);

  /**
   * Public links component.
   */
  const PublicLinks = () => (
    <>
      <NavbarItem>
        <Link color="foreground">Public links</Link>
      </NavbarItem>
    </>
  );

  /**
   * Private links component.
   */
  const PrivateLinks = () => (
    <>
      <NavbarItem>
        <Link color="foreground">Private links</Link>
      </NavbarItem>
    </>
  );

  /**
   * Auth buttons component.
   */
  const AuthButtons = () => (
    <>
      <NavbarItem className="hidden md:block">
        <Button as={Link} href="/sign-up" variant="flat" color="secondary">
          Sign up
        </Button>
      </NavbarItem>

      <NavbarItem>
        <Button as={Link} href="/sign-in" variant="flat" color="primary">
          Sign in
        </Button>
      </NavbarItem>
    </>
  );

  /**
   * Sign out button component.
   */
  const SignOutButton = () => (
    <NavbarItem>
      <form action={signOut}>
        <Button type="submit" variant="flat" color="danger">
          Sign out
        </Button>
      </form>
    </NavbarItem>
  );

  /**
   * Mobile menu component.
   */
  const MobileMenuLinks = () => (
    <>
      <NavbarMenuItem>
        <Link className="w-full" color="foreground" size="lg">
          {isProtectedPath ? 'Private links' : 'Public links'}
        </Link>
      </NavbarMenuItem>

      {!isProtectedPath && (
        <NavbarMenuItem>
          <Link className="w-full" href="/sign-up" color="secondary" size="lg">
            Sign up
          </Link>
        </NavbarMenuItem>
      )}
    </>
  );

  return (
    <Navbar maxWidth="2xl">
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />

        <NavbarBrand>
          <Link className="text-2xl font-bold" href="/" color="foreground">
            Logo
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {isProtectedPath ? <PrivateLinks /> : <PublicLinks />}
      </NavbarContent>

      <NavbarContent justify="end">
        {isProtectedPath ? <SignOutButton /> : <AuthButtons />}
      </NavbarContent>

      <NavbarMenu className="overflow-y-hidden">
        <MobileMenuLinks />
      </NavbarMenu>
    </Navbar>
  );
}
