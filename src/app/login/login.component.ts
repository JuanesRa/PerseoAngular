import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: any = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  iniciarSesion(): void {

    this.authService.login(this.usuario).subscribe((data) => {
      console.log('Inicio de sesión exitoso:', data);
      alert('Inicio de sesión exitoso');
      this.router.navigate(['/insertar-reserva'])
    });
  }


}
