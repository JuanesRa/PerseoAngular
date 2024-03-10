import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { RoomService } from '../services/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation-room-insert',
  templateUrl: './reservation-room-insert.component.html',
  styleUrls: ['./reservation-room-insert.component.css']
})
export class ReservationRoomInsertComponent {
  formulario: FormGroup;
  reservationId!: number;
  habitaciones: any[] = [];

  constructor(private ReservationService: ReservationService,private RoomService:RoomService, private route: ActivatedRoute, private router: Router, public fb: FormBuilder) {
    this.formulario = this.fb.group({
      HABITACION_NROHABITACION  : [null, Validators.required],
      RESERVA_IDRESERVA : [null, [Validators.required, Validators.maxLength(30)]],
    });
   }

  ngOnInit(): void {
    // Obtener el ID del servicio de los parámetros de la ruta
    this.reservationId =+this.route.snapshot.params['id'];

    // Establecer el valor de RESERVA_IDRESERVA en el formulario
    this.formulario.patchValue({
      RESERVA_IDRESERVA: this.reservationId
    });

    // Obtener los habitaciones
    this.RoomService.getRooms().subscribe((data) => {
      this.habitaciones = data;
      console.log(this.habitaciones)
    });
  }

  crearNuevoHabitacionXReserva(): void {
    this.ReservationService.postReservationXRoom(this.formulario.value).subscribe((data) => {
      this.router.navigate(['/lista-habitacion-reserva', this.reservationId]);
    });
  }

}
