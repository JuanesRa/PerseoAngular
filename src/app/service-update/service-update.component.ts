import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-update',
  templateUrl: './service-update.component.html',
  styleUrls: ['./service-update.component.css']
})
export class ServiceUpdateComponent implements OnInit {
  formulario: FormGroup;
  typeService: any[] = [];
  servicioId!: number;

  constructor( private router: Router, private route: ActivatedRoute, private serviceService: ServiceService, public fb: FormBuilder) {
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
    // Obtener los valores del formulario
    const valoresFormulario = this.formulario.value;

    // Enviar actualización al servicio
    this.serviceService.putService(this.servicioId, valoresFormulario).subscribe(() => {
      this.router.navigate(['/lista-servicios']);
    });
  }
}
