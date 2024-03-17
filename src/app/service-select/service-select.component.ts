import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { MatPaginator } from '@angular/material/paginator';
import { AlertsService } from '../services/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-service-select',
  templateUrl: './service-select.component.html',
  styleUrls: ['./service-select.component.css']
})
export class ServiceSelectComponent implements OnInit {

  servicios: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Obtén una referencia al paginador

  constructor(
    private serviceService: ServiceService,
    private router: Router,
    private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.serviceService.getServices().subscribe((data) => {
      this.servicios = data;
      // Configura el paginador después de recibir los datos
      if (this.paginator) {
        this.paginator.pageSize = 10;
        this.paginator.hidePageSize = true;
      }

      // Obtener el tipo de servicio para cada servicio
      this.servicios.forEach((servicio) => {
        this.serviceService.getTypeServiceById(servicio.TIPO_SERVICIO_IDTIPOSERVICIO).subscribe((statusData) => {
          servicio.tipoServicio = statusData.TIPO_SERVICIO;
        });
      });
    });
  }

  redireccionarActualizar(serviceId: number): void {
    this.router.navigate(['/actualizar-servicio', serviceId]);
  }

  eliminarServicio(serviceId: number): void {
    this.alertsService.eliminarServicio(serviceId);
    
  }
  
}
