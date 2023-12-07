import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-user-insert',
  templateUrl: './user-insert.component.html',
  styleUrls: ['./user-insert.component.css']
})
export class UserInsertComponent {

  tiposUsuario = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Empleado' },
    { id: 3, nombre: 'Cliente' },
    { id: 4, nombre: 'Burrito Sabanero' },
    { id: 5, nombre: 'Mesero' },
  ];

  tiposDocumento = [
    { id: 1, nombre: 'Cédula de ciudadanía' },
    { id: 3, nombre: 'Cédula de extranjería' },
    { id: 2, nombre: 'Pasaporte' },
  ];

  users: any[] = [];
  nuevoUsuario: any = {
    numero_documento: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    id_tipoDocumento: null,
    id_tipoPersona: null
  };

  constructor(private userService: UserService) { }

  crearNuevoUsuario(): void {
    this.userService.postUser(this.nuevoUsuario).subscribe((data) => {
      console.log('Usuario creado:', data);
      // Aquí puedes actualizar la lista de usuarios o realizar otras acciones después de crear el usuario
    });
  }

}
