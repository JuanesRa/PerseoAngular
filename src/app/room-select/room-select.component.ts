import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { AlertsService } from '../services/alerts.service';
import { MatPaginator } from '@angular/material/paginator'; // Importa MatPaginator

@Component({
  selector: 'app-room-select',
  templateUrl: './room-select.component.html',
  styleUrls: ['./room-select.component.css']
})
export class RoomSelectComponent implements OnInit {
  rooms: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Obtén una referencia al paginador

  constructor(private roomService: RoomService, private router: Router, private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.roomService.getRooms().subscribe((data) => {
      this.rooms = data;

      // Obtener el tipo de estado para cada habitación
      this.rooms.forEach((room) => {
        this.roomService.getStatusRoomById(room.ESTADO_HABITACION_IDESTADOHABITACION).subscribe((statusData) => {
          room.tipoEstado = statusData.TIPO_ESTADO;
        });
      });

      // Obtener el tipo de habitación para cada habitación
      this.rooms.forEach((room) => {
        this.roomService.getTypeRoomById(room.TIPO_HABITACION_IDTIPOHABITACION).subscribe((statusData) => {
          room.tipoHabitacion = statusData.TIPO_HABITACION;
        });
      });

      // Configura el paginador después de recibir los datos
      if (this.paginator) {
        this.paginator.pageSize = 10;
        this.paginator.hidePageSize = true; // Oculta la selección de tamaño de página
      }
    });
  }

  redireccionarActualizar(roomId: number): void {
    this.router.navigate(['/actualizar-habitacion', roomId]);
  }

  eliminarHabitacion(roomId: number): void {
    this.alertsService.eliminarHabitacion(roomId);
  }
}
