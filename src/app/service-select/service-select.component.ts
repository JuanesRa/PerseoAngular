import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-service-select',
  templateUrl: './service-select.component.html',
  styleUrls: ['./service-select.component.css']
})
export class ServiceSelectComponent {

  servicios: any[] =[];
  constructor(private serviceService: ServiceService, private router: Router) { }
  ngOnInit(): void {
    this.serviceService.getServices().subscribe((data) => {
      this.servicios = data;
      console.log(this.servicios)

     // Obtener el tipo de habitación para cada habitación
     this.servicios.forEach((servicio) => {
      this.serviceService.getTypeServiceById(servicio.TIPO_SERVICIO_IDTIPOSERVICIO).subscribe((statusData)=>{
        servicio.tipoServicio = statusData.TIPO_SERVICIO
      });
      });

     });
  }

  redireccionarActualizar(serviceId: number): void {
    this.router.navigate(['/actualizar-servicio', serviceId]);
  }

  eliminarServicio(serviceId: number): void {
    if (confirm('¿Está seguro de eliminar el producto? ')) {
      this.serviceService.deleteService(serviceId).subscribe(() => {
        window.location.reload()
      })
   }
}
}
