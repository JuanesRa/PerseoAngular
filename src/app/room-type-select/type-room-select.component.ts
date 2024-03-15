import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { MatPaginator } from '@angular/material/paginator'; // Importa MatPaginator

@Component({
  selector: 'app-type-room-select',
  templateUrl: './type-room-select.component.html',
  styleUrls: ['./type-room-select.component.css']
})
export class TypeRoomSelectComponent implements OnInit {
  Typerooms: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Obtén una referencia al paginador

  constructor(private roomService: RoomService, private router: Router) { }

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

  eliminarTipoHabitacion(TyperoomId: number): void {
    if (confirm('¿Está seguro de eliminar el tipo de habitación?')) {
      this.roomService.deleteTypeRoom(TyperoomId).subscribe(() => {
        window.location.reload();
      });
    }
  }
}
