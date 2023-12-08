import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-guest-update',
  templateUrl: './guest-update.component.html',
  styleUrls: ['./guest-update.component.css']
})
export class GuestUpdateComponent {

  huesped: any = {};
  huespedOriginal: any = {}

  constructor(private guestService: GuestService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const guestId = +params['id'];
      this.guestService.getGuestById(guestId).subscribe((data) => {
        this.huesped = data
      })
    })
  }

  actualizarHuesped(): void {
    const guestId = this.huesped.numero_documento;
    const camposModificados = Object.keys(this.huesped).filter(
      key => this.huesped[key] !== this.huespedOriginal[key]
    );

    if (camposModificados.length > 0) {
      this.guestService.putGuest(guestId, this.huesped).subscribe(() => {
        this.router.navigate(['/lista-huespedes'])
      });
    } else {
      console.log('No se han realizado cambios')
    }
  }
}
