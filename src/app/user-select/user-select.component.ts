import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css']
})
export class UserSelectComponent implements OnInit {

  users: any[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  redireccionarActualizar(userId: number): void {
    this.router.navigate(['/actualizar-usuario', userId]);
  }

  eliminarUsuario(userId: number):void {
    if (confirm('¿Estás seguro de querer eliminar este usuario?')){
      this.userService.deleteUser(userId).subscribe(() => {
        this.router.navigate(['/lista-usuarios'])
      })
    }
  }
}
