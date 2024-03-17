import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { RoomService } from '../services/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-reservation-room-insert',
  templateUrl: './reservation-room-insert.component.html',
  styleUrls: ['./reservation-room-insert.component.css']
})
export class ReservationRoomInsertComponent {
  formulario: FormGroup;
  formularioActualizar: FormGroup;
  reservationId!: number;
  habitaciones: any[] = [];
  estados: any[] = [];
  // Variable para almacenar el ID del estado "Disponible"
  estadoDisponibleId: number = 0;
  // Variable para almacenar el ID del estado ID del estado "Ocupado"
  estadoOcupadoId: number = 0;

  constructor(
    private ReservationService: ReservationService,
    private RoomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    private alertsService: AlertsService
  ) {
    // Inicialización de los formularios
    this.formulario = this.fb.group({
      HABITACION_NROHABITACION: [null, Validators.required],
      RESERVA_IDRESERVA: [null, [Validators.required, Validators.maxLength(30)]],
    });

    this.formularioActualizar = this.fb.group({
      ESTADO_HABITACION_IDESTADOHABITACION: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    // Obtener el ID de la reserva desde los parámetros de la ruta
    this.reservationId = +this.route.snapshot.params['id'];

    // Establecer el valor de RESERVA_IDRESERVA en el formulario
    this.formulario.patchValue({
      RESERVA_IDRESERVA: this.reservationId
    });

    // Obtener las habitaciones y los estados de las habitaciones
    this.RoomService.getRooms().subscribe((data) => {
      this.RoomService.getStatusRoom().subscribe((statusData) => {
        // Asignar los estados obtenidos
        this.estados = statusData;

        // Obtener los IDs de los estados "Disponible" y "Ocupado"
        this.estadoDisponibleId = this.getEstadoDisponibleId();
        this.estadoOcupadoId = this.getEstadoOcupadoId();

        // Filtrar las habitaciones disponibles
        this.habitaciones = data.filter((item: any) => item.ESTADO_HABITACION_IDESTADOHABITACION == this.estadoDisponibleId);
      });
    });
  }

  // Método para crear una nueva habitación por reserva
  crearNuevoHabitacionXReserva(): void {
    // Obtener la habitación seleccionada en el formulario
    const habitacionSeleccionada = this.formulario.value.HABITACION_NROHABITACION;
    const habitacion = this.habitaciones.find(hab => hab.NROHABITACION === habitacionSeleccionada);
    if (habitacion) {
      let confirmedMessage = '¡Se añadió exitosamente!';
      this.alertsService.alertConfirmed(confirmedMessage).then(() => {
        // Crear la reserva para la habitación seleccionada
        this.ReservationService.postReservationXRoom(this.formulario.value).subscribe(() => {
          // Actualizar el estado de la habitación a "Ocupado"
          this.ActualizarEstadoHabitacion(habitacion);
          this.router.navigate(['/lista-habitacion-reserva', this.reservationId]);
        });
      });
    } else {
      this.alertsService.alertDenied('No se ha seleccionado ninguna habitación.');
    }
  }

  // Método para actualizar el estado de la habitación a "Ocupado"
  ActualizarEstadoHabitacion(habitacion: any): void {
    const estadoId = this.estadoOcupadoId;
    this.RoomService.patchRoom(habitacion.NROHABITACION, { ESTADO_HABITACION_IDESTADOHABITACION: estadoId }).subscribe(() => {
    });
  }

  // Método para obtener el ID del estado "Disponible"
  getEstadoDisponibleId(): number {
    const estadoDisponible = this.estados.find((estado) => estado.TIPO_ESTADO == 'Disponible');
    return estadoDisponible ? estadoDisponible.IDESTADOHABITACION : 0;
  }

  // Método para obtener el ID del estado "Ocupado"
  getEstadoOcupadoId(): number {
    const estadoOcupado = this.estados.find((estado) => estado.TIPO_ESTADO == 'Ocupado');
    return estadoOcupado ? estadoOcupado.IDESTADOHABITACION : 0;
  }
}
