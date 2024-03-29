import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { RoomService } from '../services/room.service';
import { MatPaginator } from '@angular/material/paginator';
import { AlertsService } from '../services/alerts.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-reservation-select-client',
  templateUrl: './reservation-select-client.component.html',
  styleUrls: ['./reservation-select-client.component.css']
})
export class ReservationSelectClientComponent implements OnInit {

  reservas: any[] = [];
  habitaciones: any[] = [];
  roomxreservation: any[] = [];
  usuario: any;
  estadosReserva: any[] = [];
  estadoCancelarReservaId: number = 0;
  estadoDisponibleId: number = 0;
  estados: any[] = [];
  noReservasHechas: boolean = false; // Variable para controlar si no hay reservas
  @ViewChild(MatPaginator) paginatorR!: MatPaginator;

  constructor(
    private reservationService: ReservationService,
    private alertsService: AlertsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private location: PlatformLocation,
  ) {
    history.pushState(null, '', location.href);
    this.location.onPopState(() => {
      window.location.href = ('http://localhost:4200/reservas'); //Navigate to another location when the browser back is clicked.
      history.pushState(null, '', location.href);
    });

   
  }

  ngOnInit(): void {
    this.usuario = this.authService.getAuthId()
    this.reservationService.getReservas().subscribe((data) => {
      this.reservas = data;
      // Filtra reservas por estado "usuario"
      this.reservas = data.filter((reserva: any) => reserva.PERSONA_NRODOCUMENTO === this.usuario);
      if (this.reservas.length === 0){
        this.noReservasHechas = true;
      }
      else{
      this.reservas.forEach((reserva => {
        this.reservationService.getReservationXRoom().subscribe((data) => {
          this.roomxreservation = data.filter((item: any) => item.RESERVA_IDRESERVA == reserva.IDRESERVA);
          reserva.habitacion = this.roomxreservation;
          reserva.habitacion.forEach((habitacion: any) => {
            this.roomService.getRoomById(habitacion.HABITACION_NROHABITACION).subscribe((tipoHabitacion: any) => {
              habitacion.ID_TIPO_HABITACION = tipoHabitacion.TIPO_HABITACION_IDTIPOHABITACION;
              this.getTipoHab(habitacion.ID_TIPO_HABITACION).subscribe((tipoHabitacion: any) => {
                habitacion.TIPO_HABITACION = tipoHabitacion.TIPO_HABITACION;
              })
            });
          });
        })
      }))
      console.log(this.reservas);
      this.getEstadoReserva();
      if (this.paginatorR) {
        this.paginatorR.pageSize = 10;
        this.paginatorR.hidePageSize = true; // Oculta la selección de tamaño de página
      }
    }
    });
    this.obtenerIdEstadoReservaCancelada();

    this.roomService.getStatusRoom().subscribe((statusData) => {
      // Asignar los estados obtenidos
      this.estados = statusData;
      this.estadoDisponibleId = this.getEstadoDisponibleId();
      console.log(this.estados);
    });
  }

  obtenerIdEstadoReservaCancelada(): void {
    this.reservationService.getStatusReservation().subscribe((data) => {
      const estadoCancelada = data.find((item: any) => item.ESTADO_RESERVA == "Cancelada");
      if (estadoCancelada) {
        this.estadoCancelarReservaId = estadoCancelada.IDESTADORESERVA;
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

  getTipoHab(id: any): Observable<any> {
    return this.roomService.getTypeRoomById(id);
  }


  cancelarReserva(reservaId : number  ): void {
      this.alertsService.cancelarReserva(reservaId, {'ESTADO_RESERVA' : this.estadoCancelarReservaId}, this.estadoDisponibleId );
    
  }

  getEstadoDisponibleId(): number {
    const estadoDisponible = this.estados.find((estado) => estado.TIPO_ESTADO == 'Disponible');
    return estadoDisponible ? estadoDisponible.IDESTADOHABITACION : 0;
  }
}
