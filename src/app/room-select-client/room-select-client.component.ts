import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-select-client',
  templateUrl: './room-select-client.component.html',
  styleUrls: ['./room-select-client.component.css']
})
export class RoomSelectClientComponent {
  rooms: any[] = [];
  Typerooms: any[] = [];
  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.roomService.getRooms().subscribe((data) => {
      this.rooms = data;
      console.log(this.rooms);


    // Obtener el tipo de habitación para cada habitación 
    this.roomService.getTypeRoom().subscribe((statusData) => {
      this.Typerooms = statusData; // Asigna los tipos de habitaciones a this.rooms
      console.log(this.Typerooms);
    });

    // Obtener foto de habitacion 
    this.rooms.forEach((room)=> {
      this.roomService.getPhotoRoomById(room.TIPO_HABITACION_IDTIPOHABITACION).subscribe((statusData)=>{
        room.foto = statusData.FOTO
      });
    });

    
  
       

   
     });
     
  }

}
