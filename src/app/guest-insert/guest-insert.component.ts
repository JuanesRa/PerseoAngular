import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuestService } from '../services/guest.service';
import { AlertsService } from '../services/alerts.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-guest-insert',
  templateUrl: './guest-insert.component.html',
  styleUrls: ['./guest-insert.component.css']
})
export class GuestInsertComponent {
  formulario: FormGroup;
  huespedes: any[] = [];

  constructor(
    private guestService: GuestService,
    private router: Router,
    public fb: FormBuilder,
    private alertsService: AlertsService,
    private location: PlatformLocation,
  ) {
    this.formulario = this.fb.group({
      NRODOCUMENTO: ['',],
      NOMBRE: ['',],
      APELLIDO: ['',],
      EMAIL: ['',],
      TELEFONO: ['',],
    });

    history.pushState(null, '', location.href);
      this.location.onPopState(() => {
        window.location.href = ('http://localhost:4200/insertar-huesped'); //Navigate to another location when the browser back is clicked.
        history.pushState(null, '', location.href);
      });
  }

  crearNuevoHuesped(): void {
    this.guestService.postGuest(this.formulario.value).subscribe(
      (data) => {
        let confirmedMessage = '¡Registro exitoso!';
        this.alertsService.alertConfirmed(confirmedMessage).then(() => {
          console.log('Húesped creado:', data);
          this.router.navigate(['/lista-huespedes']);
        });
      },
      (error) => {
        if (error.status === 400) {
          const errorMessage = error.error && error.error.EMAIL && error.error.EMAIL.length > 0 ? error.error.EMAIL[0] : "Error desconocido";
          if (errorMessage === "huesped with this EMAIL already exists.") {
            this.alertsService.alertDenied("Correo ya registrado. Intente con otro.");
          } else if (errorMessage === "user with this NRODOCUMENTO already exists.") {
            this.alertsService.alertDenied("Documento ya registrado. Intente con otro.");
          } else {
            this.alertsService.alertDenied("Documento ya registrado. Intente con otro.");
          }
        } else {
          this.alertsService.alertDenied("Error desconocido. Intente de nuevo más tarde.");
        }
      }
    );
  }

}
