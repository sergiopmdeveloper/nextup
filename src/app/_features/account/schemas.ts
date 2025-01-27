import { z } from 'zod';

export const accountDetailsFormSchema = z.object({
  name: z
    .string()
    .regex(/^[A-Za-z][A-Za-z\s'-]*[A-Za-z]$|^$/, 'Name format is invalid.')
    .optional(),
});

// TODO: /src/app/_features/auth/schemas.ts.
