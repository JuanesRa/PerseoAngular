import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
import { PlatformLocation } from '@angular/common';

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
    private alertsService: AlertsService,
    private location: PlatformLocation,
    ) {
    this.formulario = this.fb.group({
      TIPO_ESTADO: ['', [Validators.required, Validators.maxLength(4)]],
      DESCRIPCION: [null, [Validators.required, Validators.maxLength(3)]],
    });

    history.pushState(null, '', location.href);
      this.location.onPopState(() => {
        window.location.href = ('http://localhost:4200/insertar-estado-habitacion'); //Navigate to another location when the browser back is clicked.
        history.pushState(null, '', location.href);
      });
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
