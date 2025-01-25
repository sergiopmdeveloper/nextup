import { z } from 'zod';

export const changePasswordFormSchema = z.object({
  actualPassword: z
    .string()
    .min(1, 'Password field is required.')
    .min(6, 'Password must be at least 6 characters.'),
  newPassword: z
    .string()
    .min(1, 'Password field is required.')
    .min(6, 'Password must be at least 6 characters.'),
});
