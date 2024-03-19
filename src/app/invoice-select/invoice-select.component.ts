import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { ReservationService } from '../services/reservation.service';
import { UserService } from '../services/user.service';
import { AlertsService } from '../services/alerts.service';
import { MatPaginator } from '@angular/material/paginator';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-invoice-select',
  templateUrl: './invoice-select.component.html',
  styleUrls: ['./invoice-select.component.css']
})
export class InvoiceSelectComponent implements OnInit {

  facturaId!: number;
  facturaIds: any[] = [];
  nroDocumentos: any[] = [];
  reservas: any[] = [];
  facturas: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private UserService: UserService,
    private invoiceService: InvoiceService,
    private router: Router,
    private AlertsService: AlertsService,
    private reservationService: ReservationService,
  ) { }

  ngOnInit(): void {

    this.invoiceService.getInvoice().subscribe((data) => {
      // Verificar si hay facturas en la respuesta
      if (data.length > 0) {
        // Obtener los IDFACTURA de todas las facturas
        this.facturaIds = data.map((factura: any) => factura.IDFACTURA);
      }
      console.log(this.facturas)
      this.facturas = data;
      this.facturas.forEach((factura => {
        this.reservationService.getReservaById(factura.IDRESERVA).subscribe((data) => {
          factura.USUARIO_DOCUMENTO = data.PERSONA_NRODOCUMENTO;
          this.facturas.forEach((factura) => {
            this.UserService.getUserById(factura.USUARIO_DOCUMENTO).subscribe((data) => {
              factura.USUARIO_NOMBRE = data.NOMBRE;
              factura.USUARIO_APELLIDO = data.APELLIDO;
            })
          })
        })
      }))

      console.log(this.facturas);

      // Configurar el paginador después de recibir los datos
      if (this.paginator) {
        this.paginator.pageSize = 10;
        this.paginator.hidePageSize = true; // Oculta la selección de tamaño de página
      }
    });
  }

  redireccionarActualizar(invoiceId: number): void {
    this.router.navigate(['/actualizar-factura', invoiceId]);
  }

  eliminarFactura(invoiceId: number): void {
    this.AlertsService.eliminarFactura(invoiceId);
  }

}
