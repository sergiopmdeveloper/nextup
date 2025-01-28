import {
  EMAIL_VALIDATOR,
  NAME_VALIDATOR,
  PASSWORD_VALIDATOR,
} from '@/app/_features/auth/validators';
import { z } from 'zod';

export const signInFormSchema = z.object({
  email: EMAIL_VALIDATOR,
  password: PASSWORD_VALIDATOR,
});

export const signUpFormSchema = z.object({
  name: NAME_VALIDATOR,
  email: EMAIL_VALIDATOR,
  password: PASSWORD_VALIDATOR,
});
