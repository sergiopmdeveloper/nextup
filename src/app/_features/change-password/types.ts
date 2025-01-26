export type ChangePasswordFormState =
  | {
      errors?: {
        actualPassword?: string[];
        newPassword?: string[];
      };
      passwordsValidated?: boolean;
    }
  | undefined;
