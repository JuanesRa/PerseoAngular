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
        this.authService.saveAuthToken(token)
        this.UserDataService.userData = data.user;
        if (data.user.TIPO_PERSONA_IDTIPOPERSONA == 1) {
          alert('Bienvenido Administrador');
        }
        else if (data.user.TIPO_PERSONA_IDTIPOPERSONA == 2) {
          alert('Bienvenido Recepcionista');
        }

        else if (data.user.TIPO_PERSONA_IDTIPOPERSONA == 3) {
          alert('Bienvenido CLiente');
        }
        this.router.navigate(['/inicio'])
      })
    }
  }


}
