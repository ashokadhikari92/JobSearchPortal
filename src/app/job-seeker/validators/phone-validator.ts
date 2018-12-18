import { AbstractControl } from '@angular/forms';

export function phoneNumberValidator(control: AbstractControl): { [key: string]: any } | null {
  const valid = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(control.value);
  return valid ? null : { invalidNumber: { valid: false, value: control.value } };
}