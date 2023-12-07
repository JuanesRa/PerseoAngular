import { Component } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-reservation-insert',
  templateUrl: './reservation-insert.component.html',
  styleUrls: ['./reservation-insert.component.css']
})
export class ReservationInsertComponent {

  reservas: any[] = [];
  nuevaReserva: any = {
    id: '',
    fecha_entrada: '',
    fecha_salida: '',
    precio_calculado: '',
    cantidad_adultos: '',
    cantidad_ninos: '',
    numero_documento: ''
  }

  constructor(private reservationService: ReservationService, private router: Router) { }

  crearNuevaReserva(): void {
    this.reservationService.postReservas(this.nuevaReserva).subscribe((data) => {
      this.router.navigate(["/lista-reservas"])
    })

  }



}
