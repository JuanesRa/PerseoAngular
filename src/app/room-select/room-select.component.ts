import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-select',
  templateUrl: './room-select.component.html',
  styleUrls: ['./room-select.component.css']
})
export class RoomSelectComponent implements OnInit {


  rooms: any[] = [];

  constructor(private roomService: RoomService, private router: Router) { }

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
      this.roomService.getTypeRoomById(room.TIPO_HABITACION_IDTIPOHABITACION).subscribe((statusData)=>{
      room.tipoHabitacion = statusData.TIPO_HABITACION
      });
      });

     });
  }

  redireccionarActualizar(roomId: number): void {
    this.router.navigate(['/actualizar-habitacion', roomId]);
  }



  eliminarHabitacion(roomId: number): void {
    if (confirm('¿Está seguro de eliminar la habitación?')) {
      this.roomService.deleteRoom(roomId).subscribe(() => {
        window.location.reload()
      })
    }
}
}