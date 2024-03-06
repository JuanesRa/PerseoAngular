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
  isLoggedIn: boolean = this.authService.isLoggedIn();


  constructor(private authService: AuthService, private userDataService: UserDataService, private router: Router) { }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      const rol = this.authService.getRolId();
      console.log('Datos del usuario:', rol);
      if (rol === '1') {
        this.isAdmin = true;
      } else if (rol === '2') {
        this.isRecepcionista = true;
      } else if (rol === '3') {
        this.isCliente = true;
      }
    }
  }
  


  CerrarSesion(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        alert('Sesión cerrada exitosamente')
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      },
    }
    );
  }
}
