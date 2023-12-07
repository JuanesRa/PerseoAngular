import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {


  tiposUsuario = [
    { id: 1, nombre : 'Administrador' },
    { id: 2, nombre : 'Empleado' },
    { id: 3, nombre : 'Cliente' },
    { id: 4, nombre : 'Burrito Sabanero' },
    { id: 5, nombre : 'Mesero' },
  ];

  tiposDocumento = [
    { id: 1, nombre: 'Cédula de ciudadanía' },
    { id: 3, nombre: 'Cédula de extranjería' },
    { id: 2, nombre: 'Pasaporte' },
  ];
  
  usuario: any = {};
  usuarioOriginal: any = {};

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = +params['id'];
      this.userService.getUserById(userId).subscribe((user) => {
        this.usuario = user;
      });
    });
  }

  actualizarUsuario(): void {
    // Comparar campos modificados y enviar actualización si hay cambios
    const userId = this.usuario.numero_documento;
    const camposModificados = Object.keys(this.usuario).filter(
      key => this.usuario[key] !== this.usuarioOriginal[key]
    );

    if (camposModificados.length > 0) {
      // Enviar actualización al servicio
      this.userService.putUser(userId ,this.usuario).subscribe(() => {
        this.router.navigate(['/lista-usuarios'])
      });
    } else {
      console.log('No se han realizado cambios');
    }
  }
}