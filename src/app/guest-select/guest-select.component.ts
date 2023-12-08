import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuestService } from '../services/guest.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-guest-select',
  templateUrl: './guest-select.component.html',
  styleUrls: ['./guest-select.component.css']
})
export class GuestSelectComponent implements OnInit {

  huespedes: any[] = [];

  constructor(private guestService: GuestService, private router: Router) { }

  ngOnInit(): void {
    this.guestService.getGuests().subscribe((data) => {
      this.huespedes = data
    })
  }

  redireccionarActualizar(huespedId: number): void {
    this.router.navigate(['/actualizar-huesped', huespedId]);
  }

  eliminarHuesped(huespedId: number): void {
    if (confirm('¿Está seguro de eliminar el huésped?')) {
      this.guestService.deleteGuest(huespedId).subscribe(() => {
        this.router.navigate(['/lista-huespedes']);
      })
    }
  }
}
