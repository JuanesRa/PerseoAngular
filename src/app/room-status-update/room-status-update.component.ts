import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';


@Component({
  selector: 'app-room-status-update',
  templateUrl: './room-status-update.component.html',
  styleUrls: ['./room-status-update.component.css']
})
export class RoomStatusUpdateComponent {
  estadoHabitacion: any = {};
  estadoHabitacionOriginal: any = {};

constructor(private router: Router, private route: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = +params['id'];
      this.roomService.getStatusRoomById(userId).subscribe((Statusroom) => {
        this.estadoHabitacion = Statusroom;
      });
    });
  }

  actualizarEstadoHabitacion(): void {
    // Comparar campos modificados y enviar actualización si hay cambios
    const estadoId = this.estadoHabitacion.IDESTADOHABITACION;
    const camposModificados = Object.keys(this.estadoHabitacion).filter(
      key => this.estadoHabitacion[key] !== this.estadoHabitacionOriginal[key]
    );

    if (camposModificados.length > 0) {
      // Enviar actualización al servicio
      this.roomService.putStatusRoom(estadoId ,this.estadoHabitacion).subscribe(() => {
        this.router.navigate(['/lista-estadohabitaciones'])
      });
    } else {
      alert('No se han realizado cambios');
    }
  }
}


