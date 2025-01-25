'use client';

import { handleActionSubmit } from '@/app/_features/base/utils';
import { changePassword } from '@/app/_features/change-password/actions';
import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { type User } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import { useActionState } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Change password form component.
 * @param {ChangePasswordFormProps} props - The props of the component.
 * @param {User} props.user - The active user.
 */
export default function ChangePasswordForm({ user }: ChangePasswordFormProps) {
  const processId = uuidv4();

  const [state, action, pending] = useActionState(changePassword, undefined);

  return (
    <section className="flex h-[calc(100vh-4rem)] w-full items-center justify-center">
      <div className="relative w-[450px]">
        <Card className="w-full">
          <CardHeader>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-content1-foreground">
                Change password
              </h1>

              <p className="text-sm text-content4-foreground">
                Modify your password
              </p>
            </div>
          </CardHeader>

          <Divider />

          <CardBody>
            <Form
              className="space-y-2"
              id="change-password-form"
              onSubmit={(e) => handleActionSubmit(e, action)}
            >
              <input id="userId" name="userId" defaultValue={user.id} hidden />

              <input
                id="processId"
                name="processId"
                defaultValue={processId}
                hidden
              />

              <Input
                id="actualPassword"
                name="actualPassword"
                type="password"
                autoComplete="current-password"
                label="Actual password"
                isInvalid={!!state?.errors?.actualPassword}
                errorMessage={state?.errors?.actualPassword?.[0]}
                isRequired
              />

              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                label="New password"
                isInvalid={!!state?.errors?.newPassword}
                errorMessage={state?.errors?.newPassword?.[0]}
                isRequired
              />
            </Form>
          </CardBody>

          <Divider />

          <CardFooter>
            <Button
              className="w-full"
              type="submit"
              form="change-password-form"
              color="primary"
              isLoading={pending}
            >
              {!pending && <ArrowRight />}
              Send
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

/**
 * Change password form component props.
 */
type ChangePasswordFormProps = {
  user: User;
};
