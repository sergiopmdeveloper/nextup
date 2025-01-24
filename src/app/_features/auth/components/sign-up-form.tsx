'use client';

import { signUp } from '@/app/_features/auth/actions';
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
 * Sign up form component.
 */
export default function SignUpForm() {
  const [state, action, pending] = useActionState(signUp, undefined);

  return (
    <section className="flex h-[calc(100vh-4rem)] w-full items-center justify-center">
      <div className="relative w-[450px]">
        <Card className="w-full">
          <CardHeader>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-content1-foreground">
                Sign up
              </h1>

              <p className="text-sm text-content4-foreground">
                Create a new account
              </p>
            </div>
          </CardHeader>

          <Divider />

          <CardBody>
            <Form
              className="space-y-2"
              id="sign-up-form"
              onSubmit={(e) => handleActionSubmit(e, action)}
            >
              <Input
                id="name"
                name="name"
                autoComplete="given-name"
                label="Name"
                isInvalid={!!state?.errors?.name}
                errorMessage={state?.errors?.name?.[0]}
              />

              <Input
                id="email"
                name="email"
                autoComplete="email"
                label="Email"
                isRequired
                isInvalid={!!state?.errors?.email}
                errorMessage={state?.errors?.email?.[0]}
              />

              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                label="Password"
                isRequired
                isInvalid={!!state?.errors?.password}
                errorMessage={state?.errors?.password?.[0]}
              />
            </Form>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <p className="text-sm text-content4-foreground">
                Do you already have an account?
              </p>

              <Link href="/sign-in" underline="always" size="sm">
                Sign in
              </Link>
            </div>
          </CardBody>

          <Divider />

          <CardFooter>
            <Button
              className="w-full"
              type="submit"
              form="sign-up-form"
              color="primary"
              isLoading={pending}
            >
              {!pending && <ArrowRight />}
              Send
            </Button>
          </CardFooter>
        </Card>

        {state?.emailAlreadyInUse && (
          <Chip className="absolute -top-10 right-0" color="danger">
            Email already in use
          </Chip>
        )}
      </div>
    </section>
  );
}
