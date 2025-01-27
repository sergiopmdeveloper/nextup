export type ChangePasswordFormState =
  | {
      errors?: {
        actualPassword?: string[];
        newPassword?: string[];
        otp?: string[];
      };
      otpId?: string;
    }
  | undefined;
