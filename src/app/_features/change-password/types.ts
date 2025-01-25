export type ChangePasswordFormState =
  | {
      errors?: {
        actualPassword?: string[];
        newPassword?: string[];
      };
      unmatchedPasswords?: boolean;
    }
  | undefined;
