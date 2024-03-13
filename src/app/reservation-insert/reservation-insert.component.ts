import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RoomService } from '../services/room.service';
import { FormControl } from '@angular/forms';

// Dentro de la clase del componente

@Component({
  selector: 'app-reservation-insert',
  templateUrl: './reservation-insert.component.html',
  styleUrls: ['./reservation-insert.component.css']
})
export class ReservationInsertComponent implements OnInit {
  
  toggleOverlay(): void {
    const overlay = document.getElementById('overlay');
    if (overlay) {
      overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
      if (overlay.style.display === 'none') {
        this.eliminarInput(`input${this.numInputs}`); // Eliminar el último input cuando se oculta el overlay
      } else {
        this.agregarInput(); // Agregar input cuando el overlay se muestra
      }
    }
  }
  
  
  
  // Referencia al elemento de fecha en el HTML
  @ViewChild('fechaInput', { static: true }) fechaInput!: ElementRef;

  // Variables de clase
  reservas: any[] = [];
  ReservationForm: FormGroup;
  formularioRoomXReserva: FormGroup;
  formularioActualizar: FormGroup;
  habitacion: any;
  precioPorNoche: number = 0;
  isAdmin: boolean = false;
  isRecepcionista: boolean = false;
  isCliente: boolean = false;
  fechaMinimaIn: string;
  fechaMinimaOut: string = '';
  estados: any[] = [];
  estadoOcupadoId: number = 0; // ID del estado "Ocupado"
  
  // Variables mucho a muchos 
  numInputs: number = 0; // Inicializamos con 1 input por defecto
  additionalControls: FormControl[] = [];
  showAdditionalInputs: boolean = false;

  constructor(
    private RoomService: RoomService,
    private ReservationService: ReservationService,
    private authService: AuthService,
    private router: Router,
    public fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    // Inicialización de formularios y validaciones
    this.ReservationForm = this.fb.group({
      FECHA_RESERVACION: ['', [Validators.required]],
      FECHA_ENTRADA: ['', [Validators.required]],
      FECHA_SALIDA: ['', [Validators.required]],
      PRECIO_CALCULADO: [0, [Validators.required]],
      CANTIDAD_ADULTOS: [null, [Validators.required]],
      CANTIDAD_NINOS: [null, [Validators.required]],
      ESTADO_RESERVA: [2],
      PERSONA_NRODOCUMENTO: ['', [Validators.required]],
      input1: ['', Validators.required] // Primer input
    });

    this.formularioRoomXReserva = this.fb.group({
      HABITACION_NROHABITACION: [null, Validators.required],
      RESERVA_IDRESERVA: [null, [Validators.required, Validators.maxLength(30)]],
    });

    this.formularioActualizar = this.fb.group({
      ESTADO_HABITACION_IDESTADOHABITACION: [null, Validators.required],
    });

    // Inicialización de la fecha mínima
    const today = new Date();
    this.fechaMinimaIn = today.toISOString().split('T')[0];

    // Suscripción al cambio de fecha de entrada para actualizar la fecha mínima de salida
    if (this.ReservationForm) {
      this.ReservationForm.get('FECHA_ENTRADA')?.valueChanges.subscribe((fechaEntrada: string) => {
        if (fechaEntrada) {
          const minDate = new Date(fechaEntrada);
          minDate.setDate(minDate.getDate() + 1); // Sumar un día
          this.fechaMinimaOut = minDate.toISOString().split('T')[0];
    
          // Obtener la fecha de salida actual
          const fechaSalidaActual = this.ReservationForm.get('FECHA_SALIDA')?.value;
    
          // Verificar si la fecha de salida actual es anterior a la nueva fecha mínima de salida
          if (fechaSalidaActual) {
            const minDateOut = new Date(this.fechaMinimaOut);
            const fechaSalida = new Date(fechaSalidaActual);
            if (fechaSalida < minDateOut) {
              // Actualizar la fecha de salida para que sea al menos un día después de la nueva fecha de entrada
              const nuevaFechaSalida = new Date(minDateOut);
              nuevaFechaSalida.setDate(nuevaFechaSalida.getDate());
              this.ReservationForm.get('FECHA_SALIDA')?.patchValue(nuevaFechaSalida.toISOString().split('T')[0]);
            }
          }
        }
      });
    }
    
  }

  ngOnInit(): void {

    // Verificación del usuario y su rol
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

    // Inicialización de la fecha de reservación
    this.ReservationForm.patchValue({
      FECHA_RESERVACION: new Date().toISOString().split('T')[0]
    });

    // Obtener datos de la habitación
    this.habitacion = history.state.habitacion;
    console.log(this.habitacion);

    // Precio por noche de la habitación
    this.precioPorNoche = this.habitacion.precio;
  }

  // Método para calcular la diferencia en días entre dos fechas
  calcularDiasEntreFechas(fechaInicio: string, fechaFin: string): number {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const diferencia = fin.getTime() - inicio.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  }

  // Método para calcular el precio total de la reserva
  calcularPrecioTotal(): void {
    const fechaEntrada = this.ReservationForm.value.FECHA_ENTRADA;
    const fechaSalida = this.ReservationForm.value.FECHA_SALIDA;
    const duracionEstadia = this.calcularDiasEntreFechas(fechaEntrada, fechaSalida);
    const precioTotal = this.precioPorNoche * duracionEstadia;
    this.ReservationForm.patchValue({
      PRECIO_CALCULADO: precioTotal
    });
    console.log('Precio total de la reserva:', this.ReservationForm.value.PRECIO_CALCULADO);
  }

  // Método para validar la cantidad de personas en la reserva
  validarCantidadPersonas(): boolean {
    const capacidadAdultos = this.habitacion.cap_adultos;
    const capacidadNinos = this.habitacion.cap_ninos;
    const cantidadAdultos = this.ReservationForm.value.CANTIDAD_ADULTOS;
    const cantidadNinos = this.ReservationForm.value.CANTIDAD_NINOS;
    if (cantidadAdultos > capacidadAdultos) {
      alert('La cantidad de adultos supera la capacidad de la habitación.');
      return false;
    } else if (cantidadNinos > capacidadNinos) {
      alert('La cantidad de niños supera la capacidad de la habitación.');
      return false;
    }
    return true;
  }

  // Método para crear una nueva reserva
  crearNuevaReserva(): void {
    if (this.ReservationForm.valid) {
      this.calcularPrecioTotal();
      if (this.validarCantidadPersonas()) {
        this.ReservationService.postReservas(this.ReservationForm.value).subscribe(
          (data) => {
            const reservaId = data.IDRESERVA;
            console.log('Reserva creada:', data);
            alert('Registro exitoso');
            this.crearNuevoHabitacionXReserva(reservaId, this.habitacion.NROHABITACION);
            this.RoomService.getStatusRoom().subscribe((statusData) => {
              const estadoOcupadoId = this.getEstadoOcuapdoId(statusData);
              this.ActualizarEstadoHabitacion(estadoOcupadoId);
            });
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

  // Método para crear un nuevo registro de habitación por reserva
  crearNuevoHabitacionXReserva(reservaId: number, numeroHabitacion: number): void {
    this.formularioRoomXReserva.patchValue({
      HABITACION_NROHABITACION: numeroHabitacion,
      RESERVA_IDRESERVA: reservaId
    });

    this.ReservationService.postReservationXRoom(this.formularioRoomXReserva.value).subscribe((data) => {
      this.router.navigate(['/inicio']);
    });
  }

  // Método para actualizar el estado de la habitación
  ActualizarEstadoHabitacion(estadoId: number): void {
    this.formularioActualizar.patchValue({
      ESTADO_HABITACION_IDESTADOHABITACION: estadoId
    });

    this.RoomService.patchRoom(this.habitacion.NROHABITACION, this.formularioActualizar.value).subscribe((data) => {
      this.router.navigate(['/inicio']);
    });
  }

  // Método para obtener el ID del estado "Ocupado"
  getEstadoOcuapdoId(estados: any[]): number {
    const estadoOcupado = estados.find((estado) => estado.TIPO_ESTADO == 'Ocupado');
    return estadoOcupado ? estadoOcupado.IDESTADOHABITACION : 0;
  }

  agregarInput(): void {
    if (this.numInputs < 4) { // Máximo 4 inputs
      this.numInputs++;
      const controlName = `input${this.numInputs}`;
      const newControl = this.fb.control('', Validators.required);
      this.ReservationForm.addControl(controlName, newControl);
      this.additionalControls.push(newControl);
      this.showAdditionalInputs = true; // Mostrar los inputs adicionales
    }
  }
  
  eliminarInput(controlName: string): void {
    this.ReservationForm.removeControl(controlName);
    this.numInputs--; // Decrementar la cantidad de inputs
  }
  

}
