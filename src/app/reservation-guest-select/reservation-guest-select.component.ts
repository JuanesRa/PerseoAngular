import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { GuestService } from '../services/guest.service';
import { MatPaginator } from '@angular/material/paginator';
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-reservation-guest-select',
  templateUrl: './reservation-guest-select.component.html',
  styleUrls: ['./reservation-guest-select.component.css']
})
export class ReservationGuestSelectComponent implements OnInit {
  guestxreservation: any[] = [];
  reservationId!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ReservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router,
    private GuestService: GuestService,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    // Obtener el ID de la Reserva
    this.reservationId = +this.route.snapshot.params['id'];

    this.ReservationService.getReservationXGuest().subscribe((data) => {
      this.guestxreservation = data.filter((item: any) => item.RESERVA_IDRESERVA == this.reservationId);

      // Configurar el paginador después de recibir los datos
      if (this.paginator) {
        this.paginator.pageSize = 10;
        this.paginator.hidePageSize = true; // Oculta la selección de tamaño de página
      }

      this.guestxreservation.forEach((husxre) => {
        this.GuestService.getGuestById(husxre.HUESPED_IDHUESPED).subscribe((statusData) => {
          husxre.NroDocumento = statusData.NRODOCUMENTO;
          husxre.Nombre = statusData.NOMBRE;
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
    this.alertsService.eliminarHuespedReserva(guestxreserId);
  }
}
