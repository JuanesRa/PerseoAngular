import { Component } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-room-insert',
  templateUrl: './room-insert.component.html',
  styleUrls: ['./room-insert.component.css']
})
export class RoomInsertComponent {

  rooms: any[] = [];
  Statusrooms: any[] = [];
  Typerooms: any[] = [];
  nuevaHabitacion: any = {
    NROHABITACION : '',
    ESTADO_HABITACION_IDESTADOHABITACION : null,
    TIPO_HABITACION_IDTIPOHABITACION : null
  }

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.roomService.getStatusRoom().subscribe((data) => {
      this.Statusrooms = data;
     });

    this.roomService.getTypeRoom().subscribe((data) => {
      this.Typerooms = data;
     });
  }


  crearNuevaHabitacion(): void {
    this.roomService.postRoom(this.nuevaHabitacion).subscribe((data) => {
      this.router.navigate(['/lista-habitaciones']);
    });
  }

}
