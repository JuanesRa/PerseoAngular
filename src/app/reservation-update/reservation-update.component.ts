import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-reservation-update',
  templateUrl: './reservation-update.component.html',
  styleUrls: ['./reservation-update.component.css']
})
export class ReservationUpdateComponent {

  formulario: FormGroup;
  reservaId!: number;
  fechaMinimaIn: string = '';
  fechaMinimaOut: string = '';
  estadosReserva:  any =  [];

  constructor(
    private reservationService: ReservationService,
    private alertsService: AlertsService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private location: PlatformLocation,
    ) {
    this.formulario = this.fb.group({
      FECHA_RESERVACION: ['', [Validators.required]],
      FECHA_ENTRADA: ['', [Validators.required]],
      HORA_ENTRADA: [null, [Validators.required]],
      FECHA_SALIDA: ['', [Validators.required]],
      HORA_SALIDA: [null, [Validators.required]],
      PRECIO_CALCULADO: [0, [Validators.required]],
      CANTIDAD_ADULTOS: [null, [Validators.required]],
      CANTIDAD_NINOS: [null, [Validators.required]],
      ESTADO_RESERVA: [2],
      PERSONA_NRODOCUMENTO: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.reservationService.getStatusReservation().subscribe((data) => {
      this.estadosReserva = data;
    })
    this.reservaId = +this.route.snapshot.params['id'];

    this.reservationService.getReservaById(this.reservaId).subscribe((reserva) => {
      this.formulario.patchValue({
        FECHA_RESERVACION: reserva.FECHA_RESERVACION,
        FECHA_ENTRADA: reserva.FECHA_ENTRADA,
        HORA_ENTRADA: reserva.HORA_ENTRADA,
        FECHA_SALIDA: reserva.FECHA_SALIDA,
        HORA_SALIDA: reserva.HORA_SALIDA,
        PRECIO_CALCULADO: reserva.PRECIO_CALCULADO,
        CANTIDAD_ADULTOS: reserva.CANTIDAD_ADULTOS,
        CANTIDAD_NINOS: reserva.CANTIDAD_NINOS,
        ESTADO_RESERVA: reserva.ESTADO_RESERVA,
        PERSONA_NRODOCUMENTO: reserva.PERSONA_NRODOCUMENTO,
      })
    });
    // Inicialización de la fecha mínima
    const today = new Date();
    this.fechaMinimaIn = today.toISOString().split('T')[0];

    // Suscripción al cambio de fecha de entrada para actualizar la fecha mínima de salida
    if (this.formulario) {
      this.formulario.get('FECHA_ENTRADA')?.valueChanges.subscribe((fechaEntrada: string) => {
        if (fechaEntrada) {
          const minDate = new Date(fechaEntrada);
          minDate.setDate(minDate.getDate() + 1); // Sumar un día
          this.fechaMinimaOut = minDate.toISOString().split('T')[0];

          // Obtener la fecha de salida actual
          const fechaSalidaActual = this.formulario.get('FECHA_SALIDA')?.value;

          // Verificar si la fecha de salida actual es anterior a la nueva fecha mínima de salida
          if (fechaSalidaActual) {
            const minDateOut = new Date(this.fechaMinimaOut);
            const fechaSalida = new Date(fechaSalidaActual);
            if (fechaSalida < minDateOut) {
              // Actualizar la fecha de salida para que sea al menos un día después de la nueva fecha de entrada
              const nuevaFechaSalida = new Date(minDateOut);
              nuevaFechaSalida.setDate(nuevaFechaSalida.getDate());
              this.formulario.get('FECHA_SALIDA')?.patchValue(nuevaFechaSalida.toISOString().split('T')[0]);
            }
          }
        }
      });
    };

    history.pushState(null, '', location.href);
      this.location.onPopState(() => {
        window.location.href = ('http://localhost:4200/actualizar-reserva/' + this.reservaId); //Navigate to another location when the browser back is clicked.
        history.pushState(null, '', location.href);
      });
  }

  actualizarReserva(): void {
    // Obtén los valores del formulario
    const valoresFormulario = this.formulario.value;
    // Comparar campos modificados y enviar actualización si hay cambios
    const reservaId = +this.route.snapshot.params['id']; // Obtener ID de los parámetros de ruta
    this.reservationService.getReservaById(reservaId).subscribe((reservaOriginal) => {
      const camposModificados = Object.keys(valoresFormulario).filter(
        key => valoresFormulario[key] !== reservaOriginal[key]
      );

      if (camposModificados.length > 0) {
        this.alertsService.actualizarReserva(reservaId, valoresFormulario);
      } else {
        this.alertsService.alertDenied('No se han realizado cambios.');
      }
    });
  }
}
