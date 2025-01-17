import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Input } from '@heroui/input';
import { Link } from '@heroui/link';
import { ArrowRight } from 'lucide-react';

/**
 * Sign in page component.
 */
export default function SignIn() {
  return (
    <main>
      <section className="flex h-screen w-full items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-content1-foreground">
                Sign in
              </h1>

              <p className="text-sm text-content4-foreground">
                Access your account
              </p>
            </div>
          </CardHeader>

          <Divider />

          <CardBody>
            <form className="space-y-2" id="sign-in-form">
              <Input autoComplete="email" label="Email" />

              <Input
                type="password"
                autoComplete="current-password"
                label="Password"
              />
            </form>

            <div className="mt-3 flex gap-1.5">
              <p className="text-sm text-content4-foreground">
                Do you not have an account?
              </p>

              <Link href="/sign-up" underline="always" size="sm">
                Sign up
              </Link>
            </div>
          </CardBody>

          <Divider />

          <CardFooter>
            <Button className="w-full" form="sign-in-form" color="primary">
              Send
              <ArrowRight />
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
