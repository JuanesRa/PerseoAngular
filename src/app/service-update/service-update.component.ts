import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-service-update',
  templateUrl: './service-update.component.html',
  styleUrls: ['./service-update.component.css']
})
export class ServiceUpdateComponent implements OnInit {
  formulario: FormGroup;
  typeService: any[] = [];
  servicioId!: number;

  constructor(
    private alertsService: AlertsService,
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    public fb: FormBuilder) {
    this.formulario = this.fb.group({
      NOMBRE_PRODUCTO: ['', [Validators.required, Validators.maxLength(30)]],
      VALOR: [null, [Validators.required, Validators.maxLength(30)]],
      TIPO_SERVICIO_IDTIPOSERVICIO: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Obtener el ID del servicio de los parámetros de la ruta
    this.servicioId = +this.route.snapshot.params['id'];

    // Obtener tipos de servicio
    this.serviceService.getTypeService().subscribe((data) => {
      this.typeService = data;
    });

    // Obtener datos del servicio por su ID
    this.serviceService.getServiceById(this.servicioId).subscribe((servicio) => {
      // Establecer los valores del formulario con los datos del servicio
      this.formulario.patchValue({
        NOMBRE_PRODUCTO: servicio.NOMBRE_PRODUCTO,
        VALOR: servicio.VALOR,
        TIPO_SERVICIO_IDTIPOSERVICIO: servicio.TIPO_SERVICIO_IDTIPOSERVICIO
      });
    });
  }

  actualizarServicio(): void {
    // Obtén los valores del formulario
    const valoresFormulario = this.formulario.value;

    // Comparar campos modificados y enviar actualización si hay cambios
    const serviceId = +this.route.snapshot.params['id']; // Obtener ID de los parámetros de ruta
    this.serviceService.getServiceById(serviceId).subscribe((servicioOriginal) => {
      const camposModificados = Object.keys(valoresFormulario).filter(
        key => valoresFormulario[key] !== servicioOriginal[key]
      );

      if (camposModificados.length > 0) {
        this.alertsService.actualizarServicio(serviceId, valoresFormulario);
      } else {
        this.alertsService.alertDenied('No se han realizado cambios.');
      }
    });
  }
}
