import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-reservation-guest-select',
  templateUrl: './reservation-guest-select.component.html',
  styleUrls: ['./reservation-guest-select.component.css']
})
export class ReservationGuestSelectComponent {
  guestxreservation: any[] = [];
  reservationId!: number;

  constructor(private ReservationService: ReservationService, private route: ActivatedRoute, private router: Router, private GuestService:GuestService) { }

  ngOnInit(): void {
    // Obtener el ID de la Reserva
    this.reservationId = +this.route.snapshot.params['id'];

    this.ReservationService.getReservationXGuest().subscribe((data) => {
      // Filtrar los registros según el valor de RESERVA_IDRESERVA
      this.guestxreservation = data.filter((item: any) => item.RESERVA_IDRESERVA  == this.reservationId);

    this.guestxreservation.forEach((husxre) => {
      this.GuestService.getGuestById(husxre.HUESPED_IDHUESPED).subscribe((statusData) => {
        husxre.NroDocumento = statusData.NRODOCUMENTO;
        husxre.Nombre = statusData.NOMBRE ;
        husxre.Apellido = statusData.APELLIDO;
        husxre.Telefono = statusData.TELEFONO;
        husxre.Email = statusData.EMAIL;
      });
    });
    });
  }

  redireccionarActualizar(guestxreserId: number): void {
    this.router.navigate(['/actualizar-huesped-reserva', guestxreserId]);
  }

  eliminarHuespedxReserva(guestxreserId: number): void {
    if (confirm('¿Está seguro de eliminar el Húesped?')) {
      this.ReservationService.deleteReservationXGuest(guestxreserId).subscribe(() => {
        window.location.reload();
      });
    }
  }
}
