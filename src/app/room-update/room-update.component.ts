import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrls: ['./room-update.component.css']
})
export class RoomUpdateComponent {

  
  Statusrooms: any[] = [];
  Typerooms: any[] = [];
  habitacion: any = {};
  habitacionOriginal: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit(): void {
    this.roomService.getStatusRoom().subscribe((data) => {
      this.Statusrooms = data;
     });

    this.roomService.getTypeRoom().subscribe((data) => {
      this.Typerooms = data;
     });
  

    this.route.params.subscribe(params => {
      const roomId = +params['id'];
      this.roomService.getRoomById(roomId).subscribe((room) => {
        this.habitacion = room;
      });

    
    })
    
  }

  actualizarHabitacion(): void {
    const roomId = this.habitacion.NROHABITACION;
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