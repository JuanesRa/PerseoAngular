import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { GuestService } from '../services/guest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-reservation-guest-update',
  templateUrl: './reservation-guest-update.component.html',
  styleUrls: ['./reservation-guest-update.component.css']
})
export class ReservationGuestUpdateComponent {
  formulario: FormGroup;
  reservationId!: number;
  nroReserva!: number;
  huespedes: any[] = [];

  constructor(
    private ReservationService: ReservationService,
    private GuestService:GuestService, 
    private route: ActivatedRoute, 
    private alertsService: AlertsService, 
    public fb: FormBuilder) {
    this.formulario = this.fb.group({
      HUESPED_IDHUESPED : [null, Validators.required],
      RESERVA_IDRESERVA : [null, [Validators.required, Validators.maxLength(30)]],
    });
   }

  ngOnInit(): void {
    // Obtener el ID del servicio de los parámetros de la ruta
    this.reservationId = +this.route.snapshot.params['id'];

    // Obtener los huespedes
    this.GuestService.getGuests().subscribe((data) => {
      this.huespedes = data;
      console.log(this.huespedes)
    });

    // Obtener datos del inventario
    this.ReservationService.getReservationXGuestById(this.reservationId).subscribe((husxres) => {
      // Establecer los valores del formulario con los datos del servicio
      this.formulario.patchValue({
        HUESPED_IDHUESPED: husxres.HUESPED_IDHUESPED,
        RESERVA_IDRESERVA: husxres.RESERVA_IDRESERVA,

      })
      // Asignar el valor de RESERVA_IDRESERVA  a la variable nroReserva
      this.nroReserva = husxres.RESERVA_IDRESERVA ;
    });
  }

  actualizarGuestXReservation(): void {
    // Obtén los valores del formulario
    const valoresFormulario = this.formulario.value;

    // Comparar campos modificados y enviar actualización si hay cambios
    const guestxreserId = +this.route.snapshot.params['id']; // Obtener ID de los parámetros de ruta
    this.ReservationService.getReservationXGuestById(guestxreserId).subscribe((huespedReservaOriginal) => {
      const camposModificados = Object.keys(valoresFormulario).filter(
        key => valoresFormulario[key] !== huespedReservaOriginal[key]
      );

      if (camposModificados.length > 0) {
        this.alertsService.actualizarHuespedReserva(guestxreserId, valoresFormulario, this.nroReserva);
      } else {
        this.alertsService.alertDenied('No se han realizado cambios.');
      }
    });
  }

}
