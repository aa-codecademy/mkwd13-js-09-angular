import { ValidationErrors, AbstractControl } from '@angular/forms';

/**
 * minLengthIngrediant : {
 *  message: 'Ingredient must have 2 characters'
 * }
 */
export const ingrediantValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const value: string = control.value.trim();

  if (!value) {
    return {
      required: {
        message: 'Ingrediant must not be empty.',
      },
    };
  }

  if (value.length < 2) {
    return {
      minLength: {
        message: 'Ingredient must be at least 2 characters long.',
      },
    };
  }

  return null;
};
