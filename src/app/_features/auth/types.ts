export type SignInFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      invalidCredentials?: boolean;
    }
  | undefined;

export type SignUpFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      invalidCredentials?: boolean;
    }
  | undefined;
