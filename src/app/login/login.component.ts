import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../validators/password_validator';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formulario: FormGroup;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    public fb: FormBuilder,
    private alertsService: AlertsService
  ) {
    this.formulario = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator()]],
    });
  }

  iniciarSesion(): void {
    if (this.formulario.valid) {
      this.authService.login(this.formulario.value).subscribe((data) => {
        let confirmedMessage = '¡Inicio de sesión exitoso!';
        //console.log('Inicio de sesión exitoso:', data);
        this.alertsService.alertConfirmed(confirmedMessage).then(() => {
          const token = data.token;
          const userId = data.user.NRODOCUMENTO;
          const rolId = data.user.TIPO_PERSONA_IDTIPOPERSONA;
          this.authService.saveAuthToken(token, userId, rolId);
          this.router.navigate(['/inicio']);
        });
      });
    }
  }
}
