import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-room-status-insert',
  templateUrl: './room-status-insert.component.html',
  styleUrls: ['./room-status-insert.component.css']
})
export class RoomStatusInsertComponent {
  formulario: FormGroup;

  constructor(
    private roomService: RoomService,
    private router: Router,
    public fb: FormBuilder,
    private alertsService: AlertsService) {
    this.formulario = this.fb.group({
      TIPO_ESTADO: ['', [Validators.required, Validators.maxLength(4)]],
      DESCRIPCION: [null, [Validators.required, Validators.maxLength(3)]],
    })
  }


  crearNuevoEstadoHabitacion(): void {
    let confirmedMessage = '¡Registro exitoso!';
    this.alertsService.alertConfirmed(confirmedMessage).then(() => {
      this.roomService.postStatusRoom(this.formulario.value).subscribe((data) => {
        this.router.navigate(['/lista-estadohabitaciones'])
      });
    });
  }
}
