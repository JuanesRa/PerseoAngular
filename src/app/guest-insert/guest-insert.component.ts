import { Component } from '@angular/core';
import { GuestService } from '../services/guest.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-guest-insert',
  templateUrl: './guest-insert.component.html',
  styleUrls: ['./guest-insert.component.css']
})
export class GuestInsertComponent {

  huespedes: any[] = [];
  nuevoHuesped: any = {
    numero_documento : '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  }
  
  constructor(private guestService: GuestService, private router: Router) {}

  crearNuevoHuesped(): void {
    this.guestService.postGuest(this.nuevoHuesped).subscribe((data) => {
      this.router.navigate(['/lista-huespedes'])
    })
  }

}
