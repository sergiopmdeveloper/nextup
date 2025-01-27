'use client';

import { updateAccountDetails } from '@/app/_features/account/actions';
import { handleActionSubmit } from '@/app/_features/base/utils';
import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { type User } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

/**
 * Account details form component.
 * @param {AccountDetailsFormProps} props - The props of the component.
 * @param {User} props.user - The active user.
 */
export default function AccountDetailsForm({ user }: AccountDetailsFormProps) {
  const [state, action, pending] = useActionState(
    updateAccountDetails,
    undefined
  );

  const [name, setName] = useState(user.name);

  useEffect(() => {
    if (!state?.errors) {
      toast.success('Account details updated successfully');
    }
  }, [state]);

  return (
    <Card className="border shadow-none sm:w-1/2">
      <CardHeader>
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold text-content1-foreground">
            Account details
          </h1>

          <p className="text-sm text-content4-foreground">
            Update your account details
          </p>
        </div>
      </CardHeader>

      <Divider />

      <CardBody>
        <Form
          className="space-y-2"
          id="account-details-form"
          onSubmit={(e) => handleActionSubmit(e, action)}
        >
          <input id="userId" name="userId" defaultValue={user.id} hidden />

          <Input
            id="name"
            name="name"
            autoComplete="given-name"
            label="Name"
            defaultValue={user.name as string}
            onValueChange={setName}
            isInvalid={!!state?.errors?.name}
            errorMessage={state?.errors?.name?.[0]}
          />
        </Form>
      </CardBody>

      <Divider />

      <CardFooter>
        <Button
          className="w-full"
          type="submit"
          form="account-details-form"
          color="primary"
          isDisabled={name === user.name}
          isLoading={pending}
        >
          {!pending && <ArrowRight />}
          Send
        </Button>
      </CardFooter>
    </Card>
  );
}

/**
 * Account details form component props.
 */
type AccountDetailsFormProps = {
  user: User;
};

// TODO: The AccountDetailsFormProps type must be read-only.
