import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { MatPaginator } from '@angular/material/paginator'; // Importa MatPaginator
import { AlertsService } from '../services/alerts.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-type-room-select',
  templateUrl: './type-room-select.component.html',
  styleUrls: ['./type-room-select.component.css']
})
export class TypeRoomSelectComponent implements OnInit {
  Typerooms: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Obtén una referencia al paginador

  constructor(
    private roomService: RoomService,
    private router: Router,
    private alertsService: AlertsService,
    private location: PlatformLocation,
    ) {
      history.pushState(null, '', location.href);
      this.location.onPopState(() => {
        window.location.href = ('http://localhost:4200/lista-tipohabitaciones'); //Navigate to another location when the browser back is clicked.
        history.pushState(null, '', location.href);
      });
    }

  ngOnInit(): void {
    this.roomService.getTypeRoom().subscribe((data) => {
      this.Typerooms = data;
      // Configura el paginador después de recibir los datos
      if (this.paginator) {
        this.paginator.pageSize = 10;
        this.paginator.hidePageSize = true; // Oculta la selección de tamaño de página
      }
    });
  }

  redireccionarActualizar(TyperoomId: number): void {
    this.router.navigate(['/actualizar-tipohabitaciones', TyperoomId]);
  }

  eliminarTipoHabitacion(TypeRoomId: number): void {
    this.alertsService.eliminarHabitacionTipo(TypeRoomId);
  }
}
