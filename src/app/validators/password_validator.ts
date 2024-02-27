import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      const minLength = 8; // Mínimo de caracteres permitidos
  
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumbers = /\d/.test(value);
      const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const hasMinLength = value.length >= minLength; // Verificar la longitud mínima
  
      const valid = hasUpperCase && hasLowerCase && hasNumbers && hasSpecialCharacters && hasMinLength;
  
      return valid ? null : { 'invalidPassword': true };
    };
  }