import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrls: ['./room-update.component.css']
})
export class RoomUpdateComponent {

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

  habitacion: any = {};
  habitacionOriginal: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const roomId = +params['id'];
      this.roomService.getRoomById(roomId).subscribe((room) => {
        this.habitacion = room;
      });
    });
  }

  actualizarHabitacion(): void {
    const roomId = this.habitacion.num_habitacion;
    const camposModificados = Object.keys(this.habitacion).filter(
      key => this.habitacion[key] !== this.habitacionOriginal[key]
    );

    if (camposModificados.length > 0) {
      this.roomService.putRoom(roomId, this.habitacion).subscribe(() => {
        this.router.navigate(['/lista-habitaciones']);
      });
    } else {
      console.log('No se han realizado cambios');
    }
  }
}