import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css']
})
export class UserSelectComponent implements OnInit {

  users: any[] = [];
  roles: any[] = [];
  tipodocumentos: any[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // Obtener usuarios, roles y tipos de documento
    forkJoin([
      this.userService.getUsers(),
      this.userService.getTipoUsuarios(),
      this.userService.getTipoDocumento()
    ]).subscribe(([usersData, rolesData, tipodocumentosData]) => {
      this.users = usersData;
      this.roles = rolesData;
      this.tipodocumentos = tipodocumentosData;

      // Asignar roles y tipos de documento a los usuarios
      this.users.forEach((user) => {
        const role = this.roles.find(role => role.IDTIPOPERSONA === user.TIPO_PERSONA_IDTIPOPERSONA);
        user.rol = role ? role.TIPO_PERSONA : "Rol no disponible";

        const tipodoc = this.tipodocumentos.find(tipodoc => tipodoc.IDTIPODOCUMENTO === user.TIPO_DOCUMENTO_IDTIPODOCUMENTO);
        user.tipodocumento = tipodoc ? tipodoc.TIPO_DOCUMENTO : "Documento no disponible";
      });
    });
  }

  redireccionarActualizar(nroDocumento: number): void {
    this.router.navigate(['/actualizar-usuario', nroDocumento]);
  }

  eliminarUsuario(nroDocumento: number): void {
    if (confirm('¿Estás seguro de querer eliminar este usuario?')) {
      this.userService.deleteUser(nroDocumento).subscribe(() => {
        window.location.reload();
      });
    }
  }
}
