import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Link } from '@heroui/link';

/**
 * Change credentials component.
 */
export default function ChangeCredentials() {
  return (
    <Card className="h-fit border shadow-none sm:w-1/2">
      <CardHeader>
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold text-content1-foreground">
            Email and password
          </h1>

          <p className="text-sm text-content4-foreground">
            Modify sensitive information
          </p>
        </div>
      </CardHeader>

      <Divider />

      <CardBody className="gap-3">
        <Button as={Link} variant="flat">
          Change email
        </Button>

        <Button as={Link} href="/change-password" variant="flat">
          Change password
        </Button>
      </CardBody>
    </Card>
  );
}

// TODO: Rename ChangeEmailPasswordBlock component to something better.
