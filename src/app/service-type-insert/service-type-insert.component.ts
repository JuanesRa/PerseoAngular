import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-service-type-insert',
  templateUrl: './service-type-insert.component.html',
  styleUrls: ['./service-type-insert.component.css']
})
export class ServiceTypeInsertComponent {

  formulario: FormGroup;

  constructor(
    private serviceService: ServiceService,
    private router: Router,
    public fb: FormBuilder,
    private alertsService: AlertsService) {
    this.formulario = this.fb.group({
      TIPO_SERVICIO: ['', [Validators.required, Validators.maxLength(30)]],
    })
  }

  crearTipoServicio(): void {
    if (this.formulario.valid) {
      this.serviceService.postTypeService(this.formulario.value).subscribe(
        (data) => {
          let confirmedMessage = '¡Registro exitoso!';
          this.alertsService.alertConfirmed(confirmedMessage).then(() => {
            //console.log('habitacion creado:', data);
            this.router.navigate(['/lista-tiposervicios']);
          });
        },
        (error) => {
          if (error.status === 400) {
            const errorMessage = error.error && error.error.EMAIL && error.error.EMAIL.length > 0 ? error.error.EMAIL[0] : "Error desconocido";
            if (errorMessage === "la habitacin with this NROHABITACION already exists.") {
              this.alertsService.alertDenied("El tipo de servicio ya existe. Cambie el nombre e inténtelo nuevamente.");
            } else if (errorMessage === "user with this NRODOCUMENTO already exists.") {
              this.alertsService.alertDenied("El tipo de servicio ya existe. Cambie el nombre e inténtelo nuevamente.");
            } else {
              this.alertsService.alertDenied("El tipo de servicio ya existe. Cambie el nombre e inténtelo nuevamente.");
            }
          } else {
            this.alertsService.alertDenied("Error desconocido. Intente de nuevo más tarde.");
          }
        }
      );
    }
  }
}

