import { NAME_VALIDATOR } from '@/app/_features/auth/validators';
import { z } from 'zod';

export const accountDetailsFormSchema = z.object({
  name: NAME_VALIDATOR,
});
