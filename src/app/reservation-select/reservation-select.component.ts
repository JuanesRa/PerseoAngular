import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-reservation-select',
  templateUrl: './reservation-select.component.html',
  styleUrls: ['./reservation-select.component.css']
})
export class ReservationSelectComponent implements OnInit {

  reservas: any[] = [];

  constructor(private router: Router, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getReservas().subscribe((data) => {
      this.reservas = data;
    })
  }

  redireccionarActualizar(reservaId: number): void {
    this.router.navigate(['/actualizar-reserva', reservaId]);
  }

  eliminarReserva(reservaId: number): void {
    if (confirm('¿Está seguro de eliminar la reserva?')) {
      this.reservationService.deleteReserva(reservaId).subscribe(() => {
        this.router.navigate(['/lista-reservaciones']);
      })
    }
  }


}
