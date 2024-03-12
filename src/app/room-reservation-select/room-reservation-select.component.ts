import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-reservation-select',
  templateUrl: './room-reservation-select.component.html',
  styleUrls: ['./room-reservation-select.component.css']
})
export class RoomReservationSelectComponent {
  @Input() showRoomSection: boolean = true;
  @Input() habitacionSeleccionada: any;
  @Input() habitacion: any;
  rooms: any[] = [];
  Typerooms: any[] = [];
  estados: any[] = [];
  noRoomsAvailable: boolean = false; // Variable para controlar si no hay habitaciones disponibles
  habitacionId!: number;
  // Variable para almacenar el ID del estado "Disponible"
  estadoDisponibleId: number = 0;

  constructor(private roomService: RoomService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // Aquí puedes acceder a this.habitacionSeleccionada para utilizar los datos en el componente
    console.log(this.habitacionSeleccionada);


    // Obtener todas las habitaciones
    this.roomService.getRooms().subscribe((data) => {
      // Obtener el estado "Disponible" y filtrar las habitaciones
      this.roomService.getStatusRoom().subscribe((statusData) => {
        // Asignar los estados
        this.estados = statusData;
        // Obtener el ID del estado "Disponible"
        this.estadoDisponibleId = this.getEstadoDisponibleId();

        // Filtrar las habitaciones por el estado "Disponible"
        this.rooms = data.filter((item: any) => item.ESTADO_HABITACION_IDESTADOHABITACION == this.estadoDisponibleId);
        
        if (this.rooms.length === 0) {
          this.noRoomsAvailable = true; // Establecer la bandera en true si no hay habitaciones disponibles
        } else {
          // Obtener el tipo de habitación para cada habitación
          this.roomService.getTypeRoom().subscribe((typeData) => {
            this.Typerooms = typeData;

            // Obtener foto de habitación para cada habitación
            this.rooms.forEach((room)=> {
              this.roomService.getTypeRoomById(room.TIPO_HABITACION_IDTIPOHABITACION).subscribe((statusData)=>{
                room.foto = statusData.FOTO; // Asignar la foto al objeto de la habitación
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
  }

  // Método para obtener el ID del estado "Disponible"
  getEstadoDisponibleId(): number {
    const estadoDisponible = this.estados.find((estado) => estado.TIPO_ESTADO == 'Disponible');
    return estadoDisponible ? estadoDisponible.IDESTADOHABITACION : 0;
  }

  redireccionarReservar(room: any): void {
    this.router.navigate(['/insertar-reserva', room.NROHABITACION], { state: { habitacion: room } });
  }

}
