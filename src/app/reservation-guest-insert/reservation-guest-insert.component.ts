import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { GuestService } from '../services/guest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-reservation-guest-insert',
  templateUrl: './reservation-guest-insert.component.html',
  styleUrls: ['./reservation-guest-insert.component.css']
})
export class ReservationGuestInsertComponent {
  formulario: FormGroup;
  reservationId!: number;
  huespedes: any[] = [];

  constructor(private ReservationService: ReservationService,private GuestService:GuestService, private route: ActivatedRoute, private router: Router, public fb: FormBuilder) {
    this.formulario = this.fb.group({
      HUESPED_IDHUESPED : [null, Validators.required],
      RESERVA_IDRESERVA : [null, [Validators.required, Validators.maxLength(30)]],
    });
   }

  ngOnInit(): void {
    // Obtener el ID del servicio de los parámetros de la ruta
    this.reservationId =+this.route.snapshot.params['id'];

    // Establecer el valor de HUESPED_IDHUESPED en el formulario
    this.formulario.patchValue({
      RESERVA_IDRESERVA: this.reservationId
    });

    // Obtener los huespedes
    this.GuestService.getGuests().subscribe((data) => {
      this.huespedes = data;
      console.log(this.huespedes)
    });
  }

  crearNuevoGuestXReservation(): void {
    this.ReservationService.postReservationXGuest(this.formulario.value).subscribe((data) => {
      this.router.navigate(['/lista-huesped-reserva', this.reservationId]);
    });
  }


}
