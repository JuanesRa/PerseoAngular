import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { RoomService } from '../services/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  constructor(private ReservationService: ReservationService,private RoomService:RoomService, private route: ActivatedRoute, private router: Router, public fb: FormBuilder) {
    this.formulario = this.fb.group({
      HABITACION_NROHABITACION  : [null, Validators.required],
      RESERVA_IDRESERVA : [null, [Validators.required, Validators.maxLength(30)]],
    });
   }

  ngOnInit(): void {
    // Obtener el ID del servicio de los parámetros de la ruta
    this.reservationId = +this.route.snapshot.params['id'];

    // Obtener los habitaciones
    this.RoomService.getRooms().subscribe((data) => {
      this.habitaciones = data;
      console.log(this.habitaciones)
    });

    // Obtener datos del inventario
    this.ReservationService.getReservationXRoomById(this.reservationId).subscribe((roomxres) => {
      // Establecer los valores del formulario con los datos del servicio
      this.formulario.patchValue({
        HABITACION_NROHABITACION: roomxres.HABITACION_NROHABITACION,
        RESERVA_IDRESERVA: roomxres.RESERVA_IDRESERVA,

      })
      // Asignar el valor de RESERVA_IDRESERVA  a la variable nroReserva
      this.nroReserva = roomxres.RESERVA_IDRESERVA ;
    });
  }

  actualizarRoomXReservation(): void {
    // Obtener los valores del formulario
    const valoresFormulario = this.formulario.value;

    // Enviar actualización al huesped x reserva
    this.ReservationService.putReservationXRoom(this.reservationId, valoresFormulario).subscribe(() => {
      this.router.navigate(['/lista-habitacion-reserva',this.nroReserva]);
    });
  }

}
