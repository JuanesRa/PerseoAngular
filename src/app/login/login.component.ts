import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../validators/password_validator';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router, private UserDataService: UserDataService, public fb: FormBuilder) {
    this.formulario = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator()]],
    })
  }

  iniciarSesion(): void {
    if (this.formulario.valid) {
      this.authService.login(this.formulario.value).subscribe((data) => {
        console.log('Inicio de sesión exitoso:', data);
        alert('Inicio de sesión exitoso');
        const token = data.token; // Aquí obtenemos el token del objeto data
        const userId = data.user.NRODOCUMENTO;
        const rolId = data.user.TIPO_PERSONA_IDTIPOPERSONA;
        this.authService.saveAuthToken(token, userId, rolId)
        this.router.navigate(['/inicio'])
      })
    }
  }

  togglePasswordVisibility(passwordField: HTMLInputElement): void {
    this.showPassword = !this.showPassword;
    passwordField.type = this.showPassword ? 'text' : 'password';
  } 


}
