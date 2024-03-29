import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { UserService } from '../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { AlertsService } from '../services/alerts.service';
import { PlatformLocation } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { RoomService } from '../services/room.service';
@Component({
  selector: 'app-reservation-select',
  templateUrl: './reservation-select.component.html',
  styleUrls: ['./reservation-select.component.css']
})
export class ReservationSelectComponent implements OnInit {
  reservas: any[] = [];
  isAdmin: boolean = false;
  isRecepcionista: boolean = false;
  isCliente: boolean = false;
  estadoDisponibleId: number = 0;
  estados: any[] = [];
  estadoCancelarReservaId: number = 0;
  @ViewChild(MatPaginator) paginatorR!: MatPaginator;
  constructor(
    private router: Router,
    private reservationService: ReservationService,
    private userService: UserService,
    private alertsService: AlertsService,
    private location: PlatformLocation,
    private authService: AuthService,
    private roomService: RoomService,
  ) {
    history.pushState(null, '', location.href);
    this.location.onPopState(() => {
      window.location.href = ('http://localhost:4200/lista-reservas'); //Navigate to another location when the browser back is clicked.
      history.pushState(null, '', location.href);
    });
  }

  ngOnInit(): void {
    this.reservationService.getReservas().subscribe((data) => {
      this.reservas = data;
      console.log(this.reservas);
      this.getEstadoReserva();
      this.getUsuario();
      if (this.paginatorR) {
        this.paginatorR.pageSize = 10;
        this.paginatorR.hidePageSize = true; // Oculta la selección de tamaño de página
      }

      this.roomService.getStatusRoom().subscribe((statusData) => {
        // Asignar los estados obtenidos
        this.estados = statusData;
        this.estadoDisponibleId = this.getEstadoDisponibleId();
        console.log(this.estados);
      });
      this.obtenerIdEstadoReservaCancelada();
      
    const user = this.authService.getAuthId();
    const rol = this.authService.getRolId();
    if (rol === '1') {
      this.isAdmin = true;
    } else if (rol === '2') {
      this.isRecepcionista = true;
    } else if (rol === '3') {
      this.isCliente = true;
    }
    });
    
  }

  obtenerIdEstadoReservaCancelada(): void {
    this.reservationService.getStatusReservation().subscribe((data) => {
      const estadoCancelada = data.find((item: any) => item.ESTADO_RESERVA == "Cancelada");
      if (estadoCancelada) {
        this.estadoCancelarReservaId = estadoCancelada.IDESTADORESERVA;
      }
    });}
  

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


  cancelarReserva(reservaId : number  ): void {
    this.alertsService.cancelarReserva(reservaId, {'ESTADO_RESERVA' : this.estadoCancelarReservaId}, this.estadoDisponibleId );
  
}
getEstadoDisponibleId(): number {
  const estadoDisponible = this.estados.find((estado) => estado.TIPO_ESTADO == 'Disponible');
  return estadoDisponible ? estadoDisponible.IDESTADOHABITACION : 0;
}
}

