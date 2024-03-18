import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrls: ['./room-update.component.css']
})
export class RoomUpdateComponent {
  formulario: FormGroup;
  Statusrooms: any[] = [];
  Typerooms: any[] = [];
  habitacionId!: number;

  constructor(
    private alertsService: AlertsService,
    private route: ActivatedRoute,
    private roomService: RoomService,
    public fb: FormBuilder) {
    this.formulario = this.fb.group({
      NROHABITACION: ['', [Validators.required, Validators.maxLength(4)]],
      ESTADO_HABITACION_IDESTADOHABITACION: [null, [Validators.required, Validators.maxLength(3)]],
      TIPO_HABITACION_IDTIPOHABITACION: [null, [Validators.required, Validators.maxLength(3)]],
    })
  }

  ngOnInit(): void {
    // Obtener el ID del servicio de los parámetros de la ruta
    this.habitacionId = +this.route.snapshot.params['id'];

    this.roomService.getStatusRoom().subscribe((data) => {
      this.Statusrooms = data;
    });
    this.roomService.getTypeRoom().subscribe((data) => {
      this.Typerooms = data;
    });

    // Obtener datos del servicio por su ID
    this.roomService.getRoomById(this.habitacionId).subscribe((habitacion) => {
      // Establecer los valores del formulario con los datos del servicio
      this.formulario.patchValue({
        NROHABITACION: habitacion.NROHABITACION,
        ESTADO_HABITACION_IDESTADOHABITACION: habitacion.ESTADO_HABITACION_IDESTADOHABITACION,
        TIPO_HABITACION_IDTIPOHABITACION: habitacion.TIPO_HABITACION_IDTIPOHABITACION,
      });
    });
  }

  actualizarHabitacion(): void {
    // Obtén los valores del formulario
    const valoresFormulario = this.formulario.value;
    // Comparar campos modificados y enviar actualización si hay cambios
    const roomId = +this.route.snapshot.params['id']; // Obtener ID de los parámetros de ruta
    this.roomService.getRoomById(roomId).subscribe((HabitacionOriginal) => {
      const camposModificados = Object.keys(valoresFormulario).filter(
        key => valoresFormulario[key] !== HabitacionOriginal[key]
      );

      if (camposModificados.length > 0) {
        this.alertsService.actualizarHabitacion(roomId, valoresFormulario);
      } else {
        this.alertsService.alertDenied('No se han realizado cambios.');
      }
    });
  }
}
