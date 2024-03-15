import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoomService } from '../services/room.service';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservation-insert',
  templateUrl: './reservation-insert.component.html',
  styleUrls: ['./reservation-insert.component.css']
})
export class ReservationInsertComponent implements OnInit {
  @ViewChild('fechaInput', { static: true }) fechaInput!: ElementRef;

  reservas: any[] = [];
  ReservationForm: FormGroup;
  formularioRoomXReserva: FormGroup;
  formularioActualizar: FormGroup;
  formularioActualizarAnadidas: FormGroup;
  habitacion: any;
  precioPorNoche: number = 0;
  isAdmin: boolean = false;
  isRecepcionista: boolean = false;
  isCliente: boolean = false;
  fechaMinimaIn: string;
  fechaMinimaOut: string = '';
  estados: any[] = [];
  estadoOcupadoId: number = 0;
  habitacionId!: number;
  numInputs: number = 1;
  additionalControls: FormControl[] = [];
  showAdditionalInputs: boolean = false;

  showRoomSection: boolean = true;
  habitacionSeleccionada: any;
  rooms: any[] = [];
  Typerooms: any[] = [];
  noRoomsAvailable: boolean = false;
  estadoDisponibleId: number = 0;
  roomsInput: { [key: string]: any } = {};

  constructor(
    private RoomService: RoomService,
    private ReservationService: ReservationService,
    private authService: AuthService,
    private router: Router,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private elementRef: ElementRef
  ) {
    this.ReservationForm = this.fb.group({
      FECHA_RESERVACION: ['', [Validators.required]],
      FECHA_ENTRADA: ['', [Validators.required]],
      FECHA_SALIDA: ['', [Validators.required]],
      PRECIO_CALCULADO: [0, [Validators.required]],
      CANTIDAD_ADULTOS: [null, [Validators.required]],
      CANTIDAD_NINOS: [null, [Validators.required]],
      ESTADO_RESERVA: [2],
      PERSONA_NRODOCUMENTO: ['', [Validators.required]],
      input1: ['',]
    });

    this.formularioRoomXReserva = this.fb.group({
      HABITACION_NROHABITACION: [null, Validators.required],
      RESERVA_IDRESERVA: [null, [Validators.required, Validators.maxLength(30)]],
    });

    this.formularioActualizar = this.fb.group({
      ESTADO_HABITACION_IDESTADOHABITACION: [null, Validators.required],
    });

    this.formularioActualizarAnadidas = this.fb.group({
      ESTADO_HABITACION_IDESTADOHABITACION: [null, Validators.required],
    });

    const today = new Date();
    this.fechaMinimaIn = today.toISOString().split('T')[0];

    if (this.ReservationForm) {
      this.ReservationForm.get('FECHA_ENTRADA')?.valueChanges.subscribe((fechaEntrada: string) => {
        if (fechaEntrada) {
          const minDate = new Date(fechaEntrada);
          minDate.setDate(minDate.getDate() + 1);
          this.fechaMinimaOut = minDate.toISOString().split('T')[0];

          const fechaSalidaActual = this.ReservationForm.get('FECHA_SALIDA')?.value;

          if (fechaSalidaActual) {
            const minDateOut = new Date(this.fechaMinimaOut);
            const fechaSalida = new Date(fechaSalidaActual);
            if (fechaSalida < minDateOut) {
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
    this.RoomService.getRooms().subscribe((data) => {
      this.RoomService.getStatusRoom().subscribe((statusData) => {
        this.estados = statusData;
        this.estadoDisponibleId = this.getEstadoDisponibleId();
        this.rooms = data.filter((item: any) => item.ESTADO_HABITACION_IDESTADOHABITACION == this.estadoDisponibleId);
        if (this.rooms.length === 0) {
          this.noRoomsAvailable = true;
        } else {
          this.RoomService.getTypeRoom().subscribe((typeData) => {
            this.Typerooms = typeData;
            this.rooms.forEach((room) => {
              this.RoomService.getTypeRoomById(room.TIPO_HABITACION_IDTIPOHABITACION).subscribe((statusData) => {
                room.foto = statusData.FOTO;
                room.tipo = statusData.TIPO_HABITACION;
                room.precio = statusData.PRECIOXNOCHE;
                room.descripcion = statusData.DESCRIPCION;
                room.cap_adultos = statusData.CANTIDAD_ADULTOS;
                room.cap_ninos = statusData.CANTIDAD_NINOS;
              });
            });
          });
        }
      });
    });

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
    console.log(this.habitacionId = history.state.habitacion.NROHABITACION);
    this.precioPorNoche = this.habitacion.precio;
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
    const duracionEstadia = this.calcularDiasEntreFechas(fechaEntrada, fechaSalida);
    const precioTotal = this.precioPorNoche * duracionEstadia;
    this.ReservationForm.patchValue({
      PRECIO_CALCULADO: precioTotal
    });
    console.log('Precio total de la reserva:', this.ReservationForm.value.PRECIO_CALCULADO);
  }

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

  
  crearNuevaReserva(): void {
    this.imprimirValoresInputs();
    console.log(this.roomsInput);
    if (this.ReservationForm.valid) {
      this.calcularPrecioTotal();
      if (this.validarCantidadPersonas()) {
        this.ReservationService.postReservas(this.ReservationForm.value).subscribe(
          (data) => {
            const reservaId = data.IDRESERVA;
            console.log('Reserva creada:', data);
            alert('Registro exitoso');
            // Crear la reserva para la primera habitación seleccionada
            this.crearNuevoHabitacionXReserva(reservaId, this.habitacion.NROHABITACION);
            // Actualizar el estado de la primera habitación seleccionada
            this.estadoOcupadoId = this.getEstadoOcuapdoId();
            this.ActualizarEstadoHabitacion(this.estadoOcupadoId);
  
            // Verificar si roomsInput no está vacío
            if (Object.keys(this.roomsInput).length > 0) {
              // Iterar sobre los valores de roomsInput y llamar a crearNuevoHabitacionXReserva() para cada uno
              // Actualizar el estado de todas las habitaciones seleccionadas
              const estadoOcupadoId = this.getEstadoOcuapdoId();
              for (const roomId in this.roomsInput) {
                if (this.roomsInput.hasOwnProperty(roomId)) {
                  const roomNumber = this.roomsInput[roomId];
                  this.crearNuevoHabitacionXReserva(reservaId, roomNumber);
                  this.ActualizarEstadoHabitacionAnadidas(roomNumber, estadoOcupadoId);
                }
              }
            }
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
  
  ActualizarEstadoHabitacion(estadoId: number): void {
    this.formularioActualizar.patchValue({
      ESTADO_HABITACION_IDESTADOHABITACION: estadoId
    });
    this.RoomService.patchRoom(this.habitacion.NROHABITACION, this.formularioActualizar.value).subscribe((data) => {
      this.router.navigate(['/inicio']);
    });
  }
  
  ActualizarEstadoHabitacionAnadidas(nrohab: number, estadoId: number): void {
    this.formularioActualizarAnadidas.patchValue({
      ESTADO_HABITACION_IDESTADOHABITACION: estadoId
    });
    this.RoomService.patchRoom(nrohab, this.formularioActualizarAnadidas.value).subscribe((data) => {
      this.router.navigate(['/inicio']);
    });
  }
  
  crearNuevoHabitacionXReserva(reservaId: number, numeroHabitacion: number): void {
    this.formularioRoomXReserva.patchValue({
      HABITACION_NROHABITACION: numeroHabitacion,
      RESERVA_IDRESERVA: reservaId
    });
    this.ReservationService.postReservationXRoom(this.formularioRoomXReserva.value).subscribe((data) => {
      this.router.navigate(['/inicio']);
    });
  }
  
  getEstadoDisponibleId(): number {
    const estadoDisponible = this.estados.find((estado) => estado.TIPO_ESTADO == 'Disponible');
    return estadoDisponible ? estadoDisponible.IDESTADOHABITACION : 0;
  }
  
  getEstadoOcuapdoId(): number {
    const estadoOcupado = this.estados.find((estado) => estado.TIPO_ESTADO == 'Ocupado');
    return estadoOcupado ? estadoOcupado.IDESTADOHABITACION : 0;
  }
  
  
imprimirValoresInputs(): void {
  // Crear un objeto para almacenar los valores de los inputs
  const inputValues: { [key: string]: any } = {};

  // Obtener todos los nombres de los controles del formulario
  const controlNames = Object.keys(this.ReservationForm.controls);
  
  // Filtrar solo los nombres de los controles que comienzan con "input"
  const inputControlNames = controlNames.filter(name => name.startsWith('input'));

  // Iterar sobre los nombres de los controles filtrados y obtener sus valores
  inputControlNames.forEach(name => {
    const value = this.ReservationForm.get(name)?.value;
    // Almacenar el valor en el objeto usando el nombre del control como clave
    inputValues[name] = value;
  });

  // Almacenar el objeto en la variable roomsInput
  this.roomsInput = inputValues;

  // Imprimir el objeto JSON en la consola para verificar
  //console.log('Valores de los inputs:', this.roomsInput);
}




// Función agregarInput con parámetros para agregar el número de habitación
agregarInputWithRoomNumber(numeroHabitacion: number): void {
  // Verificar si la habitación ya está en la lista de inputs
  if (this.additionalControls.some(control => control.value === numeroHabitacion) || numeroHabitacion === this.habitacion.NROHABITACION) {
    alert('¡Esta habitación ya está en tu lista!');
    return; // Salir de la función si la habitación ya está en la lista
  }

  if (this.numInputs < 4) {
    this.numInputs++;
    const controlName = `input${this.numInputs}`;
    // Crear el nuevo control con un valor inicial igual al número de habitación
    const newControl = this.fb.control(numeroHabitacion, Validators.required);
    // Agregar el nuevo control al formulario
    this.ReservationForm.addControl(controlName, newControl);
    // Agregar el nuevo control a la lista de controles adicionales
    this.additionalControls.push(newControl);
    // Mostrar los inputs adicionales
    this.showAdditionalInputs = true;
    // Cerrar el overlay
    this.toggle();
  }
}



toggle() {
  const overlay = this.elementRef.nativeElement.querySelector('.overlay');

  // Si el estilo display del overlay es 'none', cambia a 'block', de lo contrario, cambia a 'none'
  if (overlay.style.display === 'none' || !overlay.style.display) {
    overlay.style.display = 'block';
  } else {
    overlay.style.display = 'none';
  }
}


toggleOverlay(numeroHabitacion?: number): void {
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
    if (overlay.style.display === 'none') {
      // Si se está ocultando el overlay, eliminamos el último input
      this.eliminarInput(`input${this.numInputs}`);
    } else {
      if (numeroHabitacion) {
        this.agregarInputWithRoomNumber(numeroHabitacion); // Agregar input con el número de habitación si se proporciona
      } 
    }
  }
}

eliminarInput(controlName: string): void {
  const controlIndex = this.additionalControls.findIndex(control => controlName === controlName);
  if (controlIndex !== -1) {
    this.additionalControls.splice(controlIndex, 1); // Eliminar el control de la lista de controles adicionales
  }
  
  this.ReservationForm.removeControl(controlName);
  this.numInputs--;

  // Actualizar los nombres de los controles restantes
  for (let i = 2; i <= this.numInputs + 1; i++) {
    const oldName = `input${i}`;
    const newName = `input${i - 1}`;
    const control = this.ReservationForm.get(oldName);
    if (control) {
      this.ReservationForm.removeControl(oldName); // Eliminar el control con el nombre antiguo
      this.ReservationForm.addControl(newName, control); // Agregar el control con el nuevo nombre
    }
  }
}



  

}
