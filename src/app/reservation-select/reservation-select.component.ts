import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reservation-select',
  templateUrl: './reservation-select.component.html',
  styleUrls: ['./reservation-select.component.css']
})
export class ReservationSelectComponent implements OnInit {
  reservas: any[] = [];

  constructor(
    private router: Router,
    private reservationService: ReservationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getReservas();
  }

  getReservas(): void {
    this.reservationService.getReservas().subscribe((data) => {
      this.reservas = data;
      console.log(this.reservas);

      this.getEstadoReserva();
      this.getUsuario();
    });
  }

  getEstadoReserva(): void {
    this.reservas.forEach((reserva) => {
      this.reservationService.getStatusReservationById(reserva.ESTADO_RESERVA).subscribe((statusData) => {
        reserva.estadoReserva = statusData.ESTADO_RESERVA;
      });
    });
  }

  getUsuario(): void {
    this.reservas.forEach((reserva) => {
      this.userService.getUserById(reserva.PERSONA_NRODOCUMENTO).subscribe((userData) => {
        reserva.usuario = userData.NOMBRE;
      });
    });
  }

  redireccionarActualizar(reservaId: number): void {
    this.router.navigate(['/actualizar-reserva', reservaId]);
  }

  eliminarReserva(reservaId: number): void {
    if (confirm('¿Está seguro de eliminar la reserva?')) {
      this.reservationService.deleteReserva(reservaId).subscribe(() => {
        window.location.reload()
      });
    }
  }
}

