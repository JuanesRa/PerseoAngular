import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservation-update',
  templateUrl: './reservation-update.component.html',
  styleUrls: ['./reservation-update.component.css']
})
export class ReservationUpdateComponent implements OnInit {

  reserva: any = {};
  reservaOriginal: any = {};

  constructor(private reservationService: ReservationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const reservaId = +params['id'];
      this.reservationService.getReservaById(reservaId).subscribe(booking => {
        this.reserva = booking;
      });
    });
  }

  actualizarReserva(): void {
    const reservaId = this.reserva.id;
    const camposModificados = Object.keys(this.reserva).filter(
      key => this.reserva[key] !== this.reservaOriginal[key]
    );

    if (camposModificados.length > 0) {
      this.reservationService.putReserva(reservaId, this.reserva).subscribe(() => {
        this.router.navigate(['/lista-reservas']);
      });
    } else {
      console.log('No se han realizado cambios');
    }
  }
}
