import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-insert',
  templateUrl: './user-insert.component.html',
  styleUrls: ['./user-insert.component.css']
})
export class UserInsertComponent {

  tiposUsuario = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Recepcionista' },
    { id: 3, nombre: 'Cliente' }
  ];

  tiposDocumento = [
    { id: 1, nombre: 'Cédula de ciudadanía' },
    { id: 3, nombre: 'Cédula de extranjería' },
    { id: 2, nombre: 'Pasaporte' },
  ];

  users: any[] = [];
  nuevoUsuario: any = {
    NRODOCUMENTO: '',
    NOMBRE: '',
    APELLIDO: '',
    email: '',
    username: '',
    TELEFONO: '',
    password: '',
    TIPO_DOCUMENTO_IDTIPODOCUMENTO: null,
    TIPO_PERSONA_IDTIPOPERSONA: 3,
    ESTADO_USUARIO_IDESTADO: 1,
  };
  constructor(private authService: AuthService, private router: Router) { }

  crearNuevoUsuario(): void {

    this.nuevoUsuario.username = this.nuevoUsuario.email;

    this.authService.signup(this.nuevoUsuario).subscribe((data) => {
      console.log('Usuario creado:', data);
      alert('Registro exitoso');
      this.router.navigate(['/login'])
    });
  }

}
