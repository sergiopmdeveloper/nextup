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
import { useActionState, useState } from 'react';

/**
 * Account details form component.
 */
export default function AccountDetailsForm({ user }: AccountDetailsFormProps) {
  const [state, action, pending] = useActionState(
    updateAccountDetails,
    undefined
  );

  const [name, setName] = useState(user.name);

  return (
    <Card className="mt-4 w-1/2 border shadow-none">
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
