import { type ActionType } from '@/app/_features/base/types';
import { startTransition, type FormEvent } from 'react';

/**
 * Handles the execution of an action from the submit event of a form.
 * @param {FormEvent<HTMLFormElement>} e - The form event.
 * @param {ActionType} action - The action to be executed.
 */
export function handleActionSubmit(
  e: FormEvent<HTMLFormElement>,
  action: ActionType
): void {
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement);

  startTransition(() => {
    action(formData);
  });
}
