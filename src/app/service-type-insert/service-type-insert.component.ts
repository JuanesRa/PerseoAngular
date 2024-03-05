import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-type-insert',
  templateUrl: './service-type-insert.component.html',
  styleUrls: ['./service-type-insert.component.css']
})
export class ServiceTypeInsertComponent {

  formulario: FormGroup;
  
  constructor(private serviceService: ServiceService, private router: Router, public fb: FormBuilder) {
    this.formulario = this.fb.group({
      TIPO_SERVICIO : ['', [Validators.required, Validators.maxLength(30)]],
    })
  }

  crearTipoServicio(): void {
    if (this.formulario.valid) {
      this.serviceService.postTypeService(this.formulario.value).subscribe((data) => {
        console.log('Servicio creado')
        this.router.navigate(['/lista-tiposervicios'])
      })
    }
  }
}

