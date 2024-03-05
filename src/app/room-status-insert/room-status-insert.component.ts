import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';


@Component({
  selector: 'app-room-status-insert',
  templateUrl: './room-status-insert.component.html',
  styleUrls: ['./room-status-insert.component.css']
})
export class RoomStatusInsertComponent {
  nuevoEstadoHabitacion: any = {
    TIPO_ESTADO : '',
    DESCRIPCION : '',

  };
  constructor(private roomService: RoomService, private router: Router) { }
  crearNuevoEstadoHabitacion(): void {
    this.roomService.postStatusRoom(this.nuevoEstadoHabitacion).subscribe((data) => {
      this.router.navigate(['/lista-estadohabitaciones'])
    })
}

}
