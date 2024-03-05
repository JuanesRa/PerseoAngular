import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';


@Component({
  selector: 'app-typeroom-insert',
  templateUrl: './typeroom-insert.component.html',
  styleUrls: ['./typeroom-insert.component.css']
})
export class TyperoomInsertComponent {

  nuevatipoHabitacion: any = {
    TIPO_HABITACION : '',
    DESCRIPCION : '',
    PRECIOXNOCHE : '',
    CANTIDAD_ADULTOS : null,
    CANTIDAD_NINOS : null, 

  };
  selectedFile: File | null = null;

  
  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
   
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


  crearNuevoTipoHabitacion(): void {
    // Crea un nuevo objeto FormData para enviar los datos del formulario
    const formData = new FormData();
  
    // Agrega los campos del formulario al FormData
    formData.append('TIPO_HABITACION', this.nuevatipoHabitacion.TIPO_HABITACION);
    formData.append('DESCRIPCION', this.nuevatipoHabitacion.DESCRIPCION);
    formData.append('PRECIOXNOCHE', this.nuevatipoHabitacion.PRECIOXNOCHE.toString());
    formData.append('CANTIDAD_ADULTOS', this.nuevatipoHabitacion.CANTIDAD_ADULTOS.toString());
    formData.append('CANTIDAD_NINOS', this.nuevatipoHabitacion.CANTIDAD_NINOS.toString());
  
    // Si hay una imagen seleccionada, agrégala al FormData
    if (this.selectedFile) {
      formData.append('FOTO', this.selectedFile);
    }
  
    // Envía la solicitud para crear un nuevo tipo de habitación
    this.roomService.postTypeRoom(formData).subscribe((data) => {
      this.router.navigate(['/lista-tipohabitaciones']);
    });
  }
  

}




 
