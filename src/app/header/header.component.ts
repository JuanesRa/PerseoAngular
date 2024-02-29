import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
  isRecepcionista: boolean = false;
  isCliente: boolean = false;
  isUndefined: boolean = false;


  constructor(private authService: AuthService, private userDataService: UserDataService, private router: Router) { }

  ngOnInit(): void {
    const userData = this.userDataService.userData;
    console.log('Datos del usuario:', userData);
    if (userData === undefined) {
      this.isUndefined = true;
    } else {
      // Verificar el tipo de persona y establecer las variables correspondientes
      if (userData.TIPO_PERSONA_IDTIPOPERSONA === 1) {
        this.isAdmin = true;
      } else if (userData.TIPO_PERSONA_IDTIPOPERSONA === 2) {
        this.isRecepcionista = true;
      } else if (userData.TIPO_PERSONA_IDTIPOPERSONA === 3) {
        this.isCliente = true;
      }
    }
  }


  CerrarSesion(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Sesión cerrada exitosamente');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      },
    }
    );
  }
}
