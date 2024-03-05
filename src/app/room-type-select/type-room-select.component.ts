import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-type-room-select',
  templateUrl: './type-room-select.component.html',
  styleUrls: ['./type-room-select.component.css']
})
export class TypeRoomSelectComponent {
  rooms: any[] = [];
  Typerooms: any[] = [];
  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.roomService.getTypeRoom().subscribe((data) => {
      this.Typerooms = data;
      console.log(this.Typerooms);
  
      
   
     });
     
    }
    redireccionarActualizar(TyperoomId: number): void {
      this.router.navigate(['/actualizar-tipohabitaciones', TyperoomId]);
    }

    eliminarTipoHabitacion(TyperoomId: number): void {
      if (confirm('¿Está seguro de eliminar el tipo de habitación?')) {
        this.roomService.deleteTypeRoom(TyperoomId).subscribe(() => {
          window.location.reload()
        })
      }
  }
    
}


