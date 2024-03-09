import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuestService } from '../services/guest.service';


@Component({
  selector: 'app-guest-insert',
  templateUrl: './guest-insert.component.html',
  styleUrls: ['./guest-insert.component.css']
})
export class GuestInsertComponent {
  formulario: FormGroup;
  huespedes: any[] = [];

  constructor(private guestService: GuestService, private router: Router,  public fb: FormBuilder) {
    this.formulario = this.fb.group({
      NRODOCUMENTO : ['',],
      NOMBRE : ['', ],
      APELLIDO : ['',],
      EMAIL : ['',],
      TELEFONO : ['',],
    })
  }

  crearNuevoHuesped(): void {
    this.guestService.postGuest(this.formulario.value).subscribe((data) => {
      this.router.navigate(['/lista-huespedes'])
    })
  }

}
