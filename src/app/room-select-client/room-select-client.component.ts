import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-select-client',
  templateUrl: './room-select-client.component.html',
  styleUrls: ['./room-select-client.component.css']
})
export class RoomSelectClientComponent implements OnInit {
  rooms: any[] = [];
  Typerooms: any[] = [];

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    // Obtener todas las habitaciones
    this.roomService.getRooms().subscribe((data) => {
      this.rooms = data;
      console.log(this.rooms);

      // Obtener el tipo de habitación para cada habitación
      this.roomService.getTypeRoom().subscribe((statusData) => {
        this.Typerooms = statusData; // Asigna los tipos de habitaciones a this.Typerooms
        console.log(this.Typerooms);
      });

      // Obtener el estado para cada habitación
        this.rooms.forEach((room) => {
          this.roomService.getStatusRoomById(room.ESTADO_HABITACION_IDESTADOHABITACION).subscribe((statusData) => {
            room.tipoEstado = statusData.TIPO_ESTADO;
          });
       });

      // Obtener foto de habitacion para cada habitación
      this.rooms.forEach((room)=> {
        this.roomService.getTypeRoomById(room.TIPO_HABITACION_IDTIPOHABITACION).subscribe((statusData)=>{
          room.foto = statusData.FOTO; // Asigna la foto al objeto de la habitación
          room.tipo = statusData.TIPO_HABITACION
          room.precio = statusData.PRECIOXNOCHE
          room.descripcion = statusData.DESCRIPCION
          room.cap_adultos = statusData.CANTIDAD_ADULTOS
          room.cap_ninos = statusData.CANTIDAD_NINOS

        });
      });

    })
  }
  redireccionarReservar(room: any): void {
    this.router.navigate(['/insertar-reserva', room.NROHABITACION], { state: { habitacion: room } });
  }



}
