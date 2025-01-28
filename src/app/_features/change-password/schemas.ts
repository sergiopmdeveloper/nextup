import { PASSWORD_VALIDATOR } from '@/app/_features/auth/validators';
import { z } from 'zod';

export const changePasswordFormSchema = z.object({
  actualPassword: PASSWORD_VALIDATOR,
  newPassword: PASSWORD_VALIDATOR,
});
