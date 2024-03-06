import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-service-type-select',
  templateUrl: './service-type-select.component.html',
  styleUrls: ['./service-type-select.component.css']
})
export class ServiceTypeSelectComponent {
  servicios: any[] =[];
  constructor(private serviceService: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.serviceService.getTypeService().subscribe((data) => {
      this.servicios = data;
      console.log(this.servicios)
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
