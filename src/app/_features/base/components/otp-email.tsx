/**
 * OTP email component.
 */
export default function OtpEmail({ otp }: OtpEmailProps) {
  return <p>Your code is {otp}</p>;
}

/**
 * OTP email component props.
 */
type OtpEmailProps = {
  otp: string;
};
