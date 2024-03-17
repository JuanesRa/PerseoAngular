import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { MatPaginator } from '@angular/material/paginator'; // Importa MatPaginator
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-statusroom-select',
  templateUrl: './statusroom-select.component.html',
  styleUrls: ['./statusroom-select.component.css']
})
export class StatusroomSelectComponent implements OnInit {
  Statusrooms: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Obtén una referencia al paginador

  constructor(
    private roomService: RoomService, 
    private router: Router,
    private alertsService:AlertsService) { }

  ngOnInit(): void {
    this.roomService.getStatusRoom().subscribe((data) => {
      this.Statusrooms = data;
      console.log(this.Statusrooms);
      // Configura el paginador después de recibir los datos
      if (this.paginator) {
        this.paginator.pageSize = 10;
        this.paginator.hidePageSize = true; // Oculta la selección de tamaño de página
      }
    });
  }

  redireccionarActualizar(StatusroomId: number): void {
    this.router.navigate(['/actualizar-estado', StatusroomId]);
  }

  eliminarEstadoHabitacion(StatusRoomId: number): void {
   this.alertsService.eliminarHabitacionEstado(StatusRoomId);
  }
}
