import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-service-insert',
  templateUrl: './service-insert.component.html',
  styleUrls: ['./service-insert.component.css']
})
export class ServiceInsertComponent {
  formulario: FormGroup;
  typeService: any[] = [];
  nuevoservicio: any = {
    NOMBRE_PRODUCTO: '',
    VALOR: null,
    TIPO_SERVICIO_IDTIPOSERVICIO: null,
  }
  constructor(
    private serviceService: ServiceService,
    private router: Router,
    public fb: FormBuilder,
    private alertsService: AlertsService,
    private location: PlatformLocation,
    ) {
    this.formulario = this.fb.group({
      NOMBRE_PRODUCTO: ['', [Validators.required, Validators.maxLength(30)]],
      VALOR: [null, [Validators.required, Validators.maxLength(10)]],
      TIPO_SERVICIO_IDTIPOSERVICIO: [null, [Validators.required, Validators.maxLength(30)]],
    });

    history.pushState(null, '', location.href);
      this.location.onPopState(() => {
        window.location.href = ('http://localhost:4200/insertar-servicio'); //Navigate to another location when the browser back is clicked.
        history.pushState(null, '', location.href);
      });
  }
  ngOnInit(): void {
    this.serviceService.getTypeService().subscribe((data) => {
      this.typeService = data;
      console.log(this.typeService)
    });

  }

  crearNuevaSerivicio(): void {
    let confirmedMessage = '¡Registro exitoso!';
    this.alertsService.alertConfirmed(confirmedMessage).then(() => {
      this.serviceService.postService(this.formulario.value).subscribe((data) => {
        this.router.navigate(['/lista-servicios']);
      });
    });
  }

}
