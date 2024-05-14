import { AbstractControl } from '@angular/forms';

export function confirmedValidator(
  controlName: string,
  matchingControlName: string
) {
  return (abstractControl: AbstractControl) => {
    const control = abstractControl.get(controlName);
    const matchingControl = abstractControl.get(matchingControlName);

    if (
      matchingControl!.errors &&
      !matchingControl!.errors?.['confirmedValidator']
    ) {
      return null;
    }

    if (control!.value !== matchingControl!.value) {
      const error = { confirmedValidator: 'Passwords do not match.' };
      matchingControl!.setErrors(error);
      return error;
    } else {
      matchingControl!.setErrors(null);
      return null;
    }
  };
}
