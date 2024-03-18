import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { GuestService } from '../services/guest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-guest-update',
  templateUrl: './guest-update.component.html',
  styleUrls: ['./guest-update.component.css']
})
export class GuestUpdateComponent implements OnInit {
  formulario: FormGroup;
  huespedId!: number;

  constructor(
    private guestService: GuestService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private alertsService: AlertsService) {
    this.formulario = this.fb.group({
      NRODOCUMENTO: [''],
      NOMBRE: [''],
      APELLIDO: [''],
      EMAIL: [''],
      TELEFONO: [''],
    });

  }

  ngOnInit(): void {
    // Obtener el ID del servicio de los parámetros de la ruta
    this.huespedId = this.route.snapshot.params['id'];

    // Obtener datos del huesped por su documento
    this.guestService.getGuestById(this.huespedId).subscribe((huesped) => {
      // Establecer los valores del formulario con los datos del huesped
      this.formulario.patchValue({
        NRODOCUMENTO: huesped.NRODOCUMENTO,
        NOMBRE: huesped.NOMBRE,
        APELLIDO: huesped.APELLIDO,
        EMAIL: huesped.EMAIL,
        TELEFONO: huesped.TELEFONO,
      });
    });

  }

  actualizarHuesped(): void {
    // Obtén los valores del formulario
    const valoresFormulario = this.formulario.value;

    // Comparar campos modificados y enviar actualización si hay cambios
    const huespedId = +this.route.snapshot.params['id']; // Obtener ID de los parámetros de ruta
    this.guestService.getGuestById(huespedId).subscribe((huespedOriginal) => {
      const camposModificados = Object.keys(valoresFormulario).filter(
        key => valoresFormulario[key] !== huespedOriginal[key]
      );

      if (camposModificados.length > 0) {
        this.alertsService.actualizarHuesped(huespedId, valoresFormulario);
      } else {
        this.alertsService.alertDenied('No se han realizado cambios.');
      }
    });
  }
}
