import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-typeroom-update',
  templateUrl: './typeroom-update.component.html',
  styleUrls: ['./typeroom-update.component.css']
})
export class TyperoomUpdateComponent {
 
  Typerooms: any[] = [];
  tipohabitacion: any = {};
  tipohabitacionOriginal: any = {};
  selectedFile: File | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit(): void {
    this.roomService.getTypeRoom().subscribe((data) => {
      this.Typerooms = data;
    });

    this.route.params.subscribe(params => {
      const typeroomId = +params['id'];
      this.roomService.getTypeRoomById(typeroomId).subscribe((room) => {
        this.tipohabitacion = room;
        this.tipohabitacionOriginal = { ...room }; // Copia original para comparación
      });
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      // Si el usuario selecciona una nueva imagen
      this.selectedFile = event.target.files[0]; // Guarda la nueva imagen seleccionada
    } else {
      // Si el usuario no selecciona una nueva imagen, mantén la imagen actual
      this.selectedFile = null;
    }
  }
  
  actualizarTipoHabitacion(): void {
    const roomId = this.tipohabitacion.IDTIPOHABITACION;
    const camposModificados = Object.keys(this.tipohabitacion).filter(
      key => this.tipohabitacion[key] !== this.tipohabitacionOriginal[key]
    );
  
    // Verifica si se ha seleccionado una nueva imagen
    const nuevaImagenSeleccionada = this.selectedFile !== null;
  
    // Verifica si hay cambios en los campos o si se ha seleccionado una nueva imagen
    if (camposModificados.length > 0 || nuevaImagenSeleccionada) {
      const formData = new FormData(); // Crea un objeto FormData
  
      // Agrega otros datos del formulario al FormData
      Object.keys(this.tipohabitacion).forEach(key => {
        if (key !== 'FOTO') {
          formData.append(key, this.tipohabitacion[key]);
        }
      });
  
      // Si se ha seleccionado una nueva imagen, adjúntala al FormData
      if (nuevaImagenSeleccionada && this.selectedFile) {
        formData.append('FOTO', this.selectedFile);
      };
  
      // Envía la solicitud para actualizar el tipo de habitación
      this.roomService.putTypeRoom(roomId, formData).subscribe(() => {
        this.router.navigate(['/lista-tipohabitaciones']);
      }, error => {
        console.error('Error al actualizar el tipo de habitación:', error);
      });
    } else {
      alert('No se han realizado cambios');
    }
  } 
  
}
