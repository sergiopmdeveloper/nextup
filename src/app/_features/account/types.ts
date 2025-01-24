export type AccountDetailsFormState =
  | {
      errors?: {
        name?: string[];
      };
    }
  | undefined;
