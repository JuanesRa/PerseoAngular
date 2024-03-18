import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { RoomService } from '../services/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-reservation-room-update',
  templateUrl: './reservation-room-update.component.html',
  styleUrls: ['./reservation-room-update.component.css']
})
export class ReservationRoomUpdateComponent {
  formulario: FormGroup;
  reservationId!: number;
  nroReserva!: number;
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
    private alertsService: AlertsService,
    public fb: FormBuilder) {
    this.formulario = this.fb.group({
      HABITACION_NROHABITACION: [null, Validators.required],
      RESERVA_IDRESERVA: [null, [Validators.required, Validators.maxLength(30)]],
    });
  }

  ngOnInit(): void {
    // Obtener el ID del servicio de los parámetros de la ruta
    this.reservationId = +this.route.snapshot.params['id'];
  
    // Obtener datos del inventario
    this.ReservationService.getReservationXRoomById(this.reservationId).subscribe((roomxres) => {
      // Establecer los valores del formulario con los datos del servicio
      this.formulario.patchValue({
        HABITACION_NROHABITACION: roomxres.HABITACION_NROHABITACION,
        RESERVA_IDRESERVA: roomxres.RESERVA_IDRESERVA,
      });
  
      // Asignar el valor de RESERVA_IDRESERVA  a la variable nroReserva
      this.nroReserva = roomxres.RESERVA_IDRESERVA;
  
      // Obtener las habitaciones disponibles y sus estados
      this.RoomService.getRooms().subscribe((data) => {
        this.RoomService.getStatusRoom().subscribe((statusData) => {
          // Filtrar las habitaciones disponibles
          this.habitaciones = data.filter((item: any) => {
            // Buscar el estado de la habitación actual
            const estadoHabitacion = statusData.find((estado: any) => estado.IDESTADOHABITACION === item.ESTADO_HABITACION_IDESTADOHABITACION);
            // Retornar true si el estado es "Disponible", de lo contrario, false
            return estadoHabitacion && estadoHabitacion.TIPO_ESTADO === 'Disponible';
          });
        });
      });
    });
  }
  
  actualizarRoomXReservation(): void {
    // Obtén los valores del formulario
    const valoresFormulario = this.formulario.value;

    // Comparar campos modificados y enviar actualización si hay cambios
    const roomXreserId = +this.route.snapshot.params['id']; // Obtener ID de los parámetros de ruta
    this.ReservationService.getReservationXRoomById(roomXreserId).subscribe((habitacionReservaOriginal) => {
      const camposModificados = Object.keys(valoresFormulario).filter(
        key => valoresFormulario[key] !== habitacionReservaOriginal[key]
      );

      if (camposModificados.length > 0) {
        this.alertsService.actualizarHabitacionReserva(roomXreserId, valoresFormulario, this.nroReserva);
      } else {
        this.alertsService.alertDenied('No se han realizado cambios.');
      }
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
