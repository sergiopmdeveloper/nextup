import {
  Body,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

/**
 * OTP email component.
 */
export default function OtpEmail({ otp, process }: OtpEmailProps) {
  return (
    <Tailwind>
      <Html>
        <Head />

        <Body className="font-sans">
          <Section>
            <Text className="text-2xl">Your verification code</Text>
            <Text className="text-lg font-bold">{otp}</Text>
            <Text>Please use this code to complete the {process} process</Text>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  );
}

/**
 * OTP email component props.
 */
type OtpEmailProps = Readonly<{
  otp: string;
  process: string;
}>;
