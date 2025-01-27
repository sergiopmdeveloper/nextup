import { z } from 'zod';

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email field is required.')
    .email('Email format is invalid.'),
  password: z
    .string()
    .min(1, 'Password field is required.')
    .min(6, 'Password must be at least 6 characters.'),
});

export const signUpFormSchema = z.object({
  name: z
    .string()
    .regex(/^[A-Za-z][A-Za-z\s'-]*[A-Za-z]$|^$/, 'Name format is invalid.')
    .optional(),
  email: z
    .string()
    .min(1, 'Email field is required.')
    .email('Email format is invalid.'),
  password: z
    .string()
    .min(1, 'Password field is required.')
    .min(6, 'Password must be at least 6 characters.'),
});

// TODO: Create validators that can be reused in different schemas.
