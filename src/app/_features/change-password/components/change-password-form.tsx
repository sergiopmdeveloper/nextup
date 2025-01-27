'use client';

import { handleActionSubmit } from '@/app/_features/base/utils';
import { changePassword } from '@/app/_features/change-password/actions';
import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { InputOtp } from '@heroui/input-otp';
import { type User } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';

/**
 * Change password form component.
 * @param {ChangePasswordFormProps} props - The props of the component.
 * @param {User} props.user - The active user.
 */
export default function ChangePasswordForm({ user }: ChangePasswordFormProps) {
  const [state, action, pending] = useActionState(changePassword, undefined);
  const [confirmChange, setConfirmChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (state?.otpId) {
      setConfirmChange(true);
    }
  }, [state]);

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
              <input
                id="userEmail"
                name="userEmail"
                defaultValue={user.email}
                hidden
              />

              <input
                id="realActualPassword"
                name="realActualPassword"
                defaultValue={user.password}
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
                isDisabled={confirmChange}
                isRequired
              />

              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                label="New password"
                value={newPassword}
                onValueChange={setNewPassword}
                isInvalid={!!state?.errors?.newPassword}
                errorMessage={state?.errors?.newPassword?.[0]}
                isDisabled={confirmChange}
                isRequired
              />

              <Divider />

              {confirmChange && (
                <div>
                  <input
                    id="confirmedNewPassword"
                    name="confirmedNewPassword"
                    defaultValue={newPassword}
                    hidden
                  />

                  <input
                    id="otpId"
                    name="otpId"
                    defaultValue={state?.otpId}
                    hidden
                  />

                  <p className="text-xs">A code has been sent to your email</p>

                  <InputOtp
                    id="otp"
                    name="otp"
                    length={6}
                    isInvalid={!!state?.errors?.otp}
                    errorMessage={
                      <p className="font-normal text-danger-500">
                        {state?.errors?.otp?.[0]}
                      </p>
                    }
                  />
                </div>
              )}
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
              {!confirmChange ? 'Send' : 'Confirm'}
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
