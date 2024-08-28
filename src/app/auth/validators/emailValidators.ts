import { AbstractControl, ValidationErrors } from '@angular/forms';

export const EmailValidators = () => {
  const pattern = /^[\w\d_]+@[\w\d_]+.\w{2,7}$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = pattern.test(control.value);
    return isValid ? null : { validEmail: true };
  };
};
