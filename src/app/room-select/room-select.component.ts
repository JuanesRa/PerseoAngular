import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { HomeComponent } from '../home/home.component';

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
    })
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
