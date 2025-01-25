import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { v4 as uuidv4 } from 'uuid';

/**
 * Change password form component.
 */
export default function ChangePasswordForm() {
  const processId = uuidv4();

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
            <Form className="space-y-2" id="change-email-form">
              <input
                id="processId"
                name="processId"
                defaultValue={processId}
                hidden
              />

              <Input
                id="actual-password"
                name="actual-password"
                type="password"
                autoComplete="current-password"
                label="Actual password"
                isRequired
              />

              <Input
                id="new-password"
                name="new-password"
                type="password"
                label="New password"
                isRequired
              />
            </Form>
          </CardBody>

          <Divider />

          <CardFooter>
            <Button
              className="w-full"
              type="submit"
              form="sign-in-form"
              color="primary"
            >
              Send
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
