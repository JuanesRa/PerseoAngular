import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../services/guest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-guest-update',
  templateUrl: './guest-update.component.html',
  styleUrls: ['./guest-update.component.css']
})
export class GuestUpdateComponent implements OnInit{
  formulario: FormGroup;
  huespedId!: number;

  constructor(private guestService: GuestService, private route: ActivatedRoute, private router: Router, public fb: FormBuilder) {
    this.formulario = this.fb.group({
      NRODOCUMENTO : [''],
      NOMBRE : [''],
      APELLIDO : [''],
      EMAIL : [''],
      TELEFONO : [''],
    });

    // Inicializar huespedId en el constructor si es necesario
    // this.huespedId = ''; // O inicializar con un valor por defecto si es necesario
  }

  ngOnInit(): void {
      // Obtener el ID del servicio de los parámetros de la ruta
      this.huespedId = this.route.snapshot.params['id'];

     // Obtener datos del huesped por su documento
     this.guestService.getGuestById(this.huespedId).subscribe((huesped) => {
       // Establecer los valores del formulario con los datos del huesped
       this.formulario.patchValue({
        NRODOCUMENTO: huesped.NRODOCUMENTO,
        NOMBRE: huesped.NOMBRE,
        APELLIDO: huesped.APELLIDO,
        EMAIL: huesped.EMAIL,
        TELEFONO: huesped.TELEFONO,
       });
     });

  }

  actualizarHuesped(): void {
    // Obtener los valores del formulario
    const valoresFormulario = this.formulario.value;

    this.guestService.putGuest(this.huespedId, valoresFormulario).subscribe(() => {
      this.router.navigate(['/lista-huespedes'])
    });

}
}
