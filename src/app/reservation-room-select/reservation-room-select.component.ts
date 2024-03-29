import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { RoomService } from '../services/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-reservation-room-select',
  templateUrl: './reservation-room-select.component.html',
  styleUrls: ['./reservation-room-select.component.css']
})
export class ReservationRoomSelectComponent implements OnInit {
  roomxreservation: any[] = [];
  reservationId!: number;
  estados: any[] = [];
  estadoDisponibleId: number = 0;
  estadoOcupadoId: number = 0;
  nroHab: number = 0;
  formularioActualizar: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ReservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private RoomService: RoomService,
    private alertsService: AlertsService
  ) {
    this.formularioActualizar = this.fb.group({
      ESTADO_HABITACION_IDESTADOHABITACION: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.RoomService.getStatusRoom().subscribe((statusData) => {
      // Asignar los estados obtenidos
      this.estados = statusData

      // Obtener los IDs de los estados "Disponible" y "Ocupado"
      this.estadoDisponibleId = this.getEstadoDisponibleId();
      this.estadoOcupadoId = this.getEstadoOcupadoId();
    });

    this.reservationId = +this.route.snapshot.params['id'];

    this.ReservationService.getReservationXRoom().subscribe((data) => {
      this.roomxreservation = data.filter((item: any) => item.RESERVA_IDRESERVA == this.reservationId);

      this.roomxreservation.forEach((RoomXReservation) => {
        this.RoomService.getRoomById(RoomXReservation.HABITACION_NROHABITACION).subscribe((statusData) => {
          RoomXReservation.NroHabitacion = statusData.NROHABITACION;
          RoomXReservation.IDTIPOHABITACION = statusData.TIPO_HABITACION_IDTIPOHABITACION;
          this.RoomService.getTypeRoomById(RoomXReservation.IDTIPOHABITACION).subscribe((statusData) => {
            RoomXReservation.tipo = statusData.TIPO_HABITACION;
            RoomXReservation.precio = statusData.PRECIOXNOCHE;
          });
        });
      });

      // Configurar el paginador después de recibir los datos
      if (this.paginator) {
        this.paginator.pageSize = 10;
        this.paginator.hidePageSize = true; // Oculta la selección de tamaño de página
      }
    });
  }

  redireccionarActualizar(roomxreserId: number): void {
    this.router.navigate(['/actualizar-habitacion-reserva', roomxreserId]);
  }

  async eliminarHabitacionxReserva(roomXreserId: number): Promise<void> {
    try {
      await this.alertsService.eliminarHabitacionReserva(roomXreserId);
      const data = await this.ReservationService.getReservationXRoomById(roomXreserId).toPromise();
      this.nroHab = data.HABITACION_NROHABITACION;
      await this.ActualizarEstadoHabitacion(this.nroHab);
    } catch (error) {
      console.error('Error al eliminar habitación por reserva:', error);
      // Manejar el error aquí si es necesario
    }
  }
  

  ActualizarEstadoHabitacion(nroHabitacion: number): void {
    const estadoId = this.estadoDisponibleId;
    this.RoomService.patchRoom(nroHabitacion, { ESTADO_HABITACION_IDESTADOHABITACION: estadoId }).subscribe(() => {
      //console.log('Estado de la habitación actualizado correctamente.');
    }, error => {
      console.error('Error al actualizar el estado de la habitación:', error);
    });
  }


  getEstadoDisponibleId(): number {
    const estadoDisponible = this.estados.find((estado) => estado.TIPO_ESTADO == 'Disponible');
    return estadoDisponible ? estadoDisponible.IDESTADOHABITACION : 0;
  }

  getEstadoOcupadoId(): number {
    const estadoOcupado = this.estados.find((estado) => estado.TIPO_ESTADO == 'Ocupado');
    return estadoOcupado ? estadoOcupado.IDESTADOHABITACION : 0;
  }
}
