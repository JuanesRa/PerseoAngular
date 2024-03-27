import { Component } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
import { PlatformLocation } from '@angular/common';

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


  constructor(
    private roomService: RoomService,
    private router: Router,
    public fb: FormBuilder,
    private alertsService: AlertsService,
    private location: PlatformLocation,
    ) {
    this.formulario = this.fb.group({
      NROHABITACION: ['', [Validators.required, Validators.maxLength(4)]],
      ESTADO_HABITACION_IDESTADOHABITACION: [null, [Validators.required, Validators.maxLength(3)]],
      TIPO_HABITACION_IDTIPOHABITACION: [null, [Validators.required, Validators.maxLength(3)]],
    });

    history.pushState(null, '', location.href);
      this.location.onPopState(() => {
        window.location.href = ('http://localhost:4200/insertar-habitacion'); //Navigate to another location when the browser back is clicked.
        history.pushState(null, '', location.href);
      });
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
    this.roomService.postRoom(this.formulario.value).subscribe(
      (data) => {
        let confirmedMessage = '¡Registro exitoso!';
        this.alertsService.alertConfirmed(confirmedMessage).then(() => {
          //console.log('habitacion creado:', data);
          this.router.navigate(['/lista-habitaciones']);
        });
      },
      (error) => {
        if (error.status === 400) {
          const errorMessage = error.error && error.error.EMAIL && error.error.EMAIL.length > 0 ? error.error.EMAIL[0] : "Error desconocido";
          if (errorMessage === "la habitacin with this NROHABITACION already exists.") {
            this.alertsService.alertDenied("La habitación ya existe coloque otro número de habitación e inténtelo nuevamente.");
          } else if (errorMessage === "user with this NRODOCUMENTO already exists.") {
            this.alertsService.alertDenied("La habitación ya existe coloque otro número de habitación e inténtelo nuevamente.");
          } else {
            this.alertsService.alertDenied("La habitación ya existe coloque otro número de habitación e inténtelo nuevamente.");
          }
        } else {
          this.alertsService.alertDenied("Error desconocido. Intente de nuevo más tarde.");
        }
      }
    );
  }

  validateInput(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
    if (!allowedKeys.includes(event.key) && !/\d/.test(event.key)) {
      event.preventDefault();
    }
  }
}
