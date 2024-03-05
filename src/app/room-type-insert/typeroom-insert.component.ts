import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-typeroom-insert',
  templateUrl: './typeroom-insert.component.html',
  styleUrls: ['./typeroom-insert.component.css']
})
export class TyperoomInsertComponent {

  typeRoomForm: FormGroup;
  selectedFile: File | null = null;


  constructor(private roomService: RoomService, private router: Router, public fb: FormBuilder) {
    this.typeRoomForm = this.fb.group({
      TIPO_HABITACION: ['', [Validators.required, Validators.maxLength(30)]],
      DESCRIPCION: ['', [Validators.required, Validators.maxLength(200)]],
      PRECIOXNOCHE: ['', [Validators.required]],
      CANTIDAD_ADULTOS: [null, [Validators.required]],
      CANTIDAD_NINOS: [null, [Validators.required]],
      FOTO: [null, [Validators.required]],
    })
  }

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
    const formData = new FormData();
    formData.append('TIPO_HABITACION', this.typeRoomForm.value.TIPO_HABITACION);
    formData.append('DESCRIPCION', this.typeRoomForm.value.DESCRIPCION);
    formData.append('PRECIOXNOCHE', this.typeRoomForm.value.PRECIOXNOCHE.toString());
    formData.append('CANTIDAD_ADULTOS', this.typeRoomForm.value.CANTIDAD_ADULTOS.toString());
    formData.append('CANTIDAD_NINOS', this.typeRoomForm.value.CANTIDAD_NINOS.toString());
  
    if (this.selectedFile) {
      formData.append('FOTO', this.selectedFile);
    } else {
      // Marcar el campo de la foto como inválido si no se ha seleccionado ninguna foto
      this.typeRoomForm.get('FOTO')?.setErrors({ required: true });
      return; // Evitar enviar el formulario si no se ha seleccionado ninguna foto
    }
  
    this.roomService.postTypeRoom(formData).subscribe((data) => {
      this.router.navigate(['/lista-tipohabitaciones']);
    });
  }
  
}




 
