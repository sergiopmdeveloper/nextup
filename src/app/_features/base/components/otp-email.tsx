/**
 * OTP email component.
 */
export default function OtpEmail({ otp }: OtpEmailProps) {
  return <p>Your code is {otp}</p>;
}

/**
 * OTP email component props.
 */
type OtpEmailProps = Readonly<{
  otp: string;
}>;

// TODO: Use the React Email library to improve the quality of this and future emails.
