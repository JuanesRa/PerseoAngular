import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-service-type-update',
  templateUrl: './service-type-update.component.html',
  styleUrls: ['./service-type-update.component.css']
})
export class ServiceTypeUpdateComponent implements OnInit {
  formulario: FormGroup;
  tiposervicioId: number = 0;

  constructor(
    private alertsService: AlertsService,
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    public fb: FormBuilder,
    private location: PlatformLocation,
  ) {
    this.formulario = this.fb.group({
      TIPO_SERVICIO: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const tiposervicioId = +params['id'];
      this.tiposervicioId = +params['id'];
      this.serviceService.getTypeServiceById(tiposervicioId).subscribe((tipoServicio) => {
        // Establece los valores del formulario con los datos del tipo de servicio
        this.formulario.patchValue({
          TIPO_SERVICIO: tipoServicio.TIPO_SERVICIO
        });
      });
    });

    history.pushState(null, '', location.href);
      this.location.onPopState(() => {
        window.location.href = ('http://localhost:4200/actualizar-tiposervicio/' + this.tiposervicioId); //Navigate to another location when the browser back is clicked.
        history.pushState(null, '', location.href);
      });
  }

  actualizarTipoServicio(): void {
    // Obtén los valores del formulario
    const valoresFormulario = this.formulario.value;

    // Comparar campos modificados y enviar actualización si hay cambios
    const tiposervicioId = +this.route.snapshot.params['id']; // Obtener ID de los parámetros de ruta
    this.serviceService.getTypeServiceById(tiposervicioId).subscribe((tipoServicioOriginal) => {
      const camposModificados = Object.keys(valoresFormulario).filter(
        key => valoresFormulario[key] !== tipoServicioOriginal[key]
      );

      if (camposModificados.length > 0) {
        // Enviar actualización al servicio
        this.alertsService.actualizarTipoServicio(tiposervicioId, valoresFormulario);
      } else {
        this.alertsService.alertDenied('No se han realizado cambios.');
      }
    });
  }
}
