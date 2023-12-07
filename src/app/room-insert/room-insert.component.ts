import { Component } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-room-insert',
  templateUrl: './room-insert.component.html',
  styleUrls: ['./room-insert.component.css']
})
export class RoomInsertComponent {

  estadoHabitacion = [
    { id: 1, nombre: 'Disponible' },
    { id: 2, nombre: 'Reservada' },
    { id: 3, nombre: 'En mantenimiento' },
    { id: 27, nombre: 'Ocupada' }
  ]

  tipoHabitacion = [
    { id: 1, nombre: 'Sencilla' },
    { id: 2, nombre: 'Doble' },
    { id: 3, nombre: 'Suite' },
    { id: 9, nombre: 'Familiar' },
    { id: 11, nombre: 'Presidencial' },
  ]


  rooms: any[] = [];
  nuevaHabitacion: any = {
    num_habitacion: '',
    id_estadoHab: null,
    id_tipoHab: null
  }

  constructor(private roomService: RoomService, private router: Router) { }

  crearNuevaHabitacion(): void {
    this.roomService.postRoom(this.nuevaHabitacion).subscribe((data) => {
      this.router.navigate(['/lista-habitaciones']);
    });
  }

}
