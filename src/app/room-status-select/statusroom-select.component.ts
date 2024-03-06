import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-statusroom-select',
  templateUrl: './statusroom-select.component.html',
  styleUrls: ['./statusroom-select.component.css']
})
export class StatusroomSelectComponent {
  Statusrooms: any[] = [];
  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.roomService.getStatusRoom().subscribe((data) => {
      this.Statusrooms = data;
      console.log(this.Statusrooms);
  
  
    });
    }
  
    redireccionarActualizar(StatusroomId: number): void {
      this.router.navigate(['/actualizar-estado', StatusroomId]);
    }

    eliminarEstadoHabitacion(StatusroomId: number): void {
      if (confirm('¿Está seguro de eliminar el estado de la habitación?')) {
        this.roomService.deleteStatusRoom(StatusroomId).subscribe(() => {
          window.location.reload()
        })
      }
  }
  

}
