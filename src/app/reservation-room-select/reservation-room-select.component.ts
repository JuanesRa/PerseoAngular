import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { RoomService } from '../services/room.service';



@Component({
  selector: 'app-reservation-room-select',
  templateUrl: './reservation-room-select.component.html',
  styleUrls: ['./reservation-room-select.component.css']
})
export class ReservationRoomSelectComponent {
  roomxreservation: any[] = [];
  reservationId!: number;

  constructor(private ReservationService: ReservationService, private route: ActivatedRoute, private router: Router, private RoomService:RoomService) { }

  ngOnInit(): void {
    // Obtener el ID de la Reserva
    this.reservationId = +this.route.snapshot.params['id'];

    this.ReservationService.getReservationXRoom().subscribe((data) => {
      // Filtrar los registros según el valor de RESERVA_IDRESERVA
      this.roomxreservation = data.filter((item: any) => item.RESERVA_IDRESERVA  == this.reservationId);

    this.roomxreservation.forEach((RoomXReservation) => {
      // Traer habitaciones
      this.RoomService.getRoomById(RoomXReservation.HABITACION_NROHABITACION).subscribe((statusData) => {
        RoomXReservation.NroHabitacion = statusData.NROHABITACION;
        RoomXReservation.IDTIPOHABITACION = statusData.TIPO_HABITACION_IDTIPOHABITACION ;
        // Traer Tipo Habitación
        this.RoomService.getTypeRoomById(RoomXReservation.IDTIPOHABITACION).subscribe((statusData) => {
          RoomXReservation.tipo  = statusData.TIPO_HABITACION;
          RoomXReservation.precio  = statusData.PRECIOXNOCHE;
          console.log(this.roomxreservation)

        });
      });
    });
    });
  }

  redireccionarActualizar(roomxreserId: number): void {
    this.router.navigate(['/actualizar-habitacion-reserva', roomxreserId]);
  }

  eliminarHabitacionxReserva(guestxreserId: number): void {
    if (confirm('¿Está seguro de eliminar la Habitación?')) {
      this.ReservationService.deleteReservationXRoom(guestxreserId).subscribe(() => {
        window.location.reload();
      });
    }
  }
}
