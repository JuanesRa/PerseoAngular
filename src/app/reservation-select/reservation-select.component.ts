import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { UserService } from '../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-reservation-select',
  templateUrl: './reservation-select.component.html',
  styleUrls: ['./reservation-select.component.css']
})
export class ReservationSelectComponent implements OnInit {
  reservas: any[] = [];
  @ViewChild(MatPaginator) paginatorR!: MatPaginator;
  constructor(
    private router: Router,
    private reservationService: ReservationService,
    private userService: UserService,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.reservationService.getReservas().subscribe((data) => {
      this.reservas = data;
      console.log(this.reservas);
      // Filtra reservas por estado "Cxonfirmada"
      this.reservas = data.filter((reserva: any) => reserva.ESTADO_RESERVA === 2);
      this.getEstadoReserva();
      this.getUsuario(); 
      if (this.paginatorR) {
        this.paginatorR.pageSize = 10;
        this.paginatorR.hidePageSize = true; // Oculta la selección de tamaño de página
      }
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
    this.alertsService.eliminarReserva(reservaId);
  }
}

