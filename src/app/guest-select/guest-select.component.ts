import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GuestService } from '../services/guest.service';
import { MatPaginator } from '@angular/material/paginator';
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-guest-select',
  templateUrl: './guest-select.component.html',
  styleUrls: ['./guest-select.component.css'],
})


export class GuestSelectComponent implements OnInit {

  huespedes: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  constructor(
    private guestService: GuestService,
    private router: Router,
    private alertsService: AlertsService){ }

 
  ngOnInit(): void {
    this.guestService.getGuests().subscribe((data) => {
        this.huespedes = data;
        // Configura el paginador después de recibir los datos
        if (this.paginator) {
            this.paginator.pageSize = 10;
            this.paginator.hidePageSize = true; // Oculta la selección de tamaño de página
        }
    });
}

  redireccionarActualizar(huespedId: number): void {
    this.router.navigate(['/actualizar-huesped', huespedId]);
  }

  eliminarHuesped(huespedId: number): void {
    this.alertsService.eliminarHuesped(huespedId);
  }
}
