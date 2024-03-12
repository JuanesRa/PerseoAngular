import { Component } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-room-insert',
  templateUrl: './room-insert.component.html',
  styleUrls: ['./room-insert.component.css']
})
export class RoomInsertComponent {
  formulario: FormGroup;
  rooms: any[] = [];
  Statusrooms: any[] = [];
  Typerooms: any[] = [];


  constructor(private roomService: RoomService, private router: Router, public fb: FormBuilder) {
    this.formulario = this.fb.group({
      NROHABITACION : ['', [Validators.required, Validators.maxLength(4)]],
      ESTADO_HABITACION_IDESTADOHABITACION : [null, [Validators.required, Validators.maxLength(3)]],
      TIPO_HABITACION_IDTIPOHABITACION : [null, [Validators.required, Validators.maxLength(3)]],
    })
   }

  ngOnInit(): void {
    this.roomService.getStatusRoom().subscribe((data) => {
      this.Statusrooms = data;
     });

    this.roomService.getTypeRoom().subscribe((data) => {
      this.Typerooms = data;
     });
  }


  crearNuevaHabitacion(): void {
    this.roomService.postRoom(this.formulario.value).subscribe((data) => {
      this.router.navigate(['/lista-habitaciones']);
    });
  }

  validateInput(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
    if (!allowedKeys.includes(event.key) && !/\d/.test(event.key)) {
      event.preventDefault();
    }
  }
}
