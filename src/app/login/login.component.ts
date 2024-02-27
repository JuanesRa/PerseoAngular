import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';

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


  
  constructor(private authService: AuthService, private router: Router, private UserDataService:UserDataService ) { }

  iniciarSesion(): void {

    this.authService.login(this.usuario).subscribe((data) => {
      console.log('Iniciar Sesion:', data);
      this.UserDataService.userData = data.user; 
      if (data.user.TIPO_PERSONA_IDTIPOPERSONA == 1) {
      alert('Bienvenido Administrador');
      }
      else if (data.user.TIPO_PERSONA_IDTIPOPERSONA == 2){
        alert('Bienvenido Recepcionista');
      }

      else if (data.user.TIPO_PERSONA_IDTIPOPERSONA == 3){
        alert('Bienvenido CLiente');   
      }
      this.router.navigate(['/inicio'])

    });
  }


}
