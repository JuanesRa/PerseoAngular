import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  constructor(private reservationService: ReservationService, private router: Router, public fb: FormBuilder) {
    this.ReservationForm = this.fb.group({
      FECHA_RESERVACION: ['', ],
      FECHA_ENTRADA: ['',],
      FECHA_SALIDA: ['',],
      PRECIO_CALCULADO: [0, ],
      CANTIDAD_ADULTOS: [null,],
      CANTIDAD_NINOS: [null, ],
      ESTADO_RESERVA: [1,],
      PERSONA_NRODOCUMENTO: ['', ],
    })

   }


  ngOnInit(): void {
    this.setFechaActual();
    this.habitacion = history.state.habitacion;
    console.log(this.habitacion);

    // Calcular precio por noche de la habitación
    this.precioPorNoche = this.habitacion.precio; 

    // Calcular precio calculado basado en el precio por noche y el número de noches
    const fechaEntrada = new Date(this.ReservationForm.value.FECHA_ENTRADA);
    const fechaSalida = new Date(this.ReservationForm.value.FECHA_SALIDA);
    const numeroNoches = Math.ceil((fechaSalida.getTime() - fechaEntrada.getTime()) / (1000 * 60 * 60 * 24));
    this.ReservationForm.patchValue({
      PRECIO_CALCULADO: (numeroNoches * this.precioPorNoche)
    });
    console.log(this.ReservationForm.value.PRECIO_CALCULADO);
    console.log(this.ReservationForm.value);
    console.log(this.ReservationForm.valid);


  }
 
  
  setFechaActual(): void {
    const fechaActual = new Date().toISOString().split('T')[0];
    this.ReservationForm.patchValue({
      FECHA_RESERVACION: fechaActual
    });
    // Establecer el valor del campo de entrada oculto si fechaInput está definido
    if (this.fechaInput) {
      this.fechaInput.nativeElement.value = fechaActual;
    }
  }

  crearNuevaReserva(): void {
    if (this.ReservationForm.valid) {
      this.reservationService.postReservas(this.ReservationForm.value).subscribe((data) => {
        console.log('Reserva creada:', data);
        alert('Registro exitoso');
        this.router.navigate(['/'])
      });
    }
    else if (this.ReservationForm.invalid){
      console.log('Formulario inválido')
      alert('Formulario inválido')
      
    }

  }
}
