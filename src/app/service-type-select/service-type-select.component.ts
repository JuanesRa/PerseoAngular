import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-service-type-select',
  templateUrl: './service-type-select.component.html',
  styleUrls: ['./service-type-select.component.css']
})
export class ServiceTypeSelectComponent {
  servicios: any[] =[];
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  constructor(private serviceService: ServiceService, private router: Router) { }

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
  eliminarTipoServicio(roomId: number): void {
    if (confirm('¿Está seguro de eliminar el tipo servicio ')) {
      this.serviceService.deleteTypeService(roomId).subscribe(() => {
        window.location.reload()
      })
    }
}
}
