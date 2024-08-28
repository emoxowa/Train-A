import { AbstractControl, ValidationErrors } from '@angular/forms';

const MIN_LENGTH_PASSWORD = 8;

export const PasswordValidators = () => {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordLength = control.value.replace(/\s+/g, '').length;
    return passwordLength < MIN_LENGTH_PASSWORD ? { validPassword: true } : null;
  };
};
