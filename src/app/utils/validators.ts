import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
class Validator {
  validateName(control: AbstractControl): { [key: string]: any } | null {
    const regrex = /^[A-Za-z]{5,29}$/;
    if (
      control.value &&
      (!regrex.test(control.value) ||
        control.value.length < 5 ||
        control.value.length > 29)
    ) {
      return { nameInvalid: true };
    }
    return null;
  }

  validateUserName(control: AbstractControl): { [key: string]: any } | null {
    const regrex = /^[A-Za-z0-9]{5,29}$/;
    if (
      control.value &&
      (!regrex.test(control.value) ||
        control.value.length < 5 ||
        control.value.length > 29)
    ) {
      return { userNameInvalid: true };
    }
    return null;
  }

  validatePassword(control: AbstractControl): { [key: string]: any } | null {
    const regrex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,20}$/;
    if (
      control.value &&
      (!regrex.test(control.value) ||
        control.value.length < 8 ||
        control.value.length > 20)
    ) {
      return { passwordInvalid: true };
    }
    return null;
  }
}

export { Validator };
