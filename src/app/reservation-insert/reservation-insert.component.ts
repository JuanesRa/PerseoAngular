import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-reservation-insert',
  templateUrl: './reservation-insert.component.html',
  styleUrls: ['./reservation-insert.component.css']
})
export class ReservationInsertComponent implements OnInit {

  @ViewChild('fechaInput', { static: true }) fechaInput!: ElementRef;
  reservas: any[] = [];
  ReservationForm: FormGroup;
  habitacion: any;
  precioPorNoche: number = 0;
  isAdmin: boolean = false;
  isRecepcionista: boolean = false;
  isCliente: boolean = false;

  constructor(private reservationService: ReservationService, private authService: AuthService, private router: Router, public fb: FormBuilder) {
    this.ReservationForm = this.fb.group({
      FECHA_RESERVACION: ['', [Validators.required]],
      FECHA_ENTRADA: ['', [Validators.required]],
      FECHA_SALIDA: ['', [Validators.required]],
      PRECIO_CALCULADO: [0, [Validators.required]],
      CANTIDAD_ADULTOS: [null, [Validators.required]],
      CANTIDAD_NINOS: [null, [Validators.required]],
      ESTADO_RESERVA: [2,],
      PERSONA_NRODOCUMENTO: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const user = this.authService.getAuthId();
    const rol = this.authService.getRolId();
    if (rol === '1') {
      this.isAdmin = true;
    } else if (rol === '2') {
      this.isRecepcionista = true;
    } else if (rol === '3') {
      this.isCliente = true;
    }
    if (user && this.isCliente) {
      this.ReservationForm.patchValue({
        PERSONA_NRODOCUMENTO: user
      });
    }

    this.ReservationForm.patchValue({
      FECHA_RESERVACION: new Date().toISOString().split('T')[0]
    });

    this.habitacion = history.state.habitacion;
    // console.log(this.habitacion);

    // Precio por noche de la habitación
    this.precioPorNoche = this.habitacion.precio;
    // console.log('PRECIO X NOCHE HABITACION: ', this.precioPorNoche);
  }

  calcularDiasEntreFechas(fechaInicio: string, fechaFin: string): number {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const diferencia = fin.getTime() - inicio.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  }

  calcularPrecioTotal(): void {
    const fechaEntrada = this.ReservationForm.value.FECHA_ENTRADA;
    const fechaSalida = this.ReservationForm.value.FECHA_SALIDA;
  
    // Calcula la duración de la estadía en días
    const duracionEstadia = this.calcularDiasEntreFechas(fechaEntrada, fechaSalida);
  
    // Calcula el precio total multiplicando la tarifa por noche por la duración de la estadía
    const precioTotal = this.precioPorNoche * duracionEstadia;
  
    // Actualizar el valor en el formulario
    this.ReservationForm.patchValue({
      PRECIO_CALCULADO: precioTotal
    });
  
    console.log('Precio total de la reserva:', this.ReservationForm.value.PRECIO_CALCULADO);
  }

  crearNuevaReserva(): void {
    if (this.ReservationForm.valid) {
      this.calcularPrecioTotal();
      this.reservationService.postReservas(this.ReservationForm.value).subscribe(
        (data) => {
          console.log('Reserva creada:', data);
          alert('Registro exitoso');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error al crear reserva:', error);
          alert('Error al crear reserva. Por favor, inténtelo de nuevo.');
        }
      );
    } else {
      console.log('Formulario inválido');
      alert('Formulario inválido');
    }
  }
}
