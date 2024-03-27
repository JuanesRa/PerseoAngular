import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { MatPaginator } from '@angular/material/paginator';
import { AlertsService } from '../services/alerts.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-service-type-select',
  templateUrl: './service-type-select.component.html',
  styleUrls: ['./service-type-select.component.css']
})
export class ServiceTypeSelectComponent {
  servicios: any[] =[];
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  constructor(
    private serviceService: ServiceService, 
    private router: Router,
    private alertsService:AlertsService,
    private location: PlatformLocation,
    ) {
      history.pushState(null, '', location.href)
      this.location.onPopState(() => {
      window.location.href = 'http://localhost:4200/lista-tiposervicios'; //Navigate to another location when the browser back is clicked.
      history.pushState(null, '', location.href)
    });
    }

  ngOnInit(): void {
    this.serviceService.getTypeService().subscribe((data) => {
      this.servicios = data;
      //console.log(this.servicios)
      // Configura el paginador después de recibir los datos
      if (this.paginator) {
        this.paginator.pageSize = 10;
        this.paginator.hidePageSize = true; // Oculta la selección de tamaño de página
    }
     });
  }
  redireccionarActualizar(serviceID: number): void {
    this.router.navigate(['/actualizar-tiposervicio', serviceID]);
  }
  eliminarTipoServicio(TypeServiceId: number): void {
   this.alertsService.eliminarTipoServicio(TypeServiceId);
  }
}
