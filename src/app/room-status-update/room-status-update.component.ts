import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-room-status-update',
  templateUrl: './room-status-update.component.html',
  styleUrls: ['./room-status-update.component.css']
})
export class RoomStatusUpdateComponent {
  formulario: FormGroup;
  statusId: number = 0;
  constructor(
    private alertsService: AlertsService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private roomService: RoomService,
    private location: PlatformLocation,
    ) {
    this.formulario = this.fb.group({
      TIPO_ESTADO: ['', [Validators.required, Validators.maxLength(30)]],
      DESCRIPCION: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const statusId = +params['id'];
      this.statusId = +params['id'];
      this.roomService.getStatusRoomById(statusId).subscribe((Statusroom) => {
        // Establece los valores del formulario con los datos del tipo de servicio
        this.formulario.patchValue({
          TIPO_ESTADO: Statusroom.TIPO_ESTADO,
          DESCRIPCION: Statusroom.DESCRIPCION,
        });
      });
    });

    history.pushState(null, '', location.href);
      this.location.onPopState(() => {
        window.location.href = ('http://localhost:4200/actualizar-estado/' + this.statusId); //Navigate to another location when the browser back is clicked.
        history.pushState(null, '', location.href);
      });
  }

  actualizarEstadoHabitacion(): void {
    // Obtén los valores del formulario
    const valoresFormulario = this.formulario.value;

    // Comparar campos modificados y enviar actualización si hay cambios
    const StatusRoomId = +this.route.snapshot.params['id']; // Obtener ID de los parámetros de ruta
    this.roomService.getStatusRoomById(StatusRoomId).subscribe((estadoHabOriginal) => {
      const camposModificados = Object.keys(valoresFormulario).filter(
        key => valoresFormulario[key] !== estadoHabOriginal[key]
      );

      if (camposModificados.length > 0) {
        this.alertsService.actualizarHabitacionEstado(StatusRoomId, valoresFormulario);
      } else {
        this.alertsService.alertDenied('No se han realizado cambios.');
      }
    });
  }
}


