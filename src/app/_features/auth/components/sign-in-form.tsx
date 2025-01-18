'use client';

import { signIn } from '@/app/_features/auth/actions';
import { handleActionSubmit } from '@/app/_features/base/utils';
import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Divider } from '@heroui/divider';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Link } from '@heroui/link';
import { ArrowRight } from 'lucide-react';
import { useActionState } from 'react';

/**
 * Sign in form component.
 */
export default function SignInForm() {
  const [state, action, pending] = useActionState(signIn, undefined);

  return (
    <section className="flex h-screen w-full items-center justify-center">
      <div className="relative">
        <Card className="w-[450px]">
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
            <Form
              className="space-y-2"
              id="sign-in-form"
              onSubmit={(e) => handleActionSubmit(e, action)}
            >
              <Input
                id="email"
                name="email"
                autoComplete="email"
                label="Email"
                isInvalid={!!state?.errors?.email}
                errorMessage={state?.errors?.email?.[0]}
              />

              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                label="Password"
                isInvalid={!!state?.errors?.password}
                errorMessage={state?.errors?.password?.[0]}
              />
            </Form>

            <div className="mt-3 flex flex-wrap gap-1.5">
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
            <Button
              className="w-full"
              type="submit"
              form="sign-in-form"
              color="primary"
              isLoading={pending}
            >
              {!pending && <ArrowRight />}
              Send
            </Button>
          </CardFooter>
        </Card>

        {state?.invalidCredentials && (
          <Chip className="absolute -top-10 right-0" color="danger">
            Invalid email or password
          </Chip>
        )}
      </div>
    </section>
  );
}
