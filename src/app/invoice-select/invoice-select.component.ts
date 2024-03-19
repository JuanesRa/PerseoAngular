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
      this.facturas = data;

      console.log(this.facturas);
      console.log(this.facturaIds);

      // Configurar el paginador después de recibir los datos
      if (this.paginator) {
        this.paginator.pageSize = 10;
        this.paginator.hidePageSize = true; // Oculta la selección de tamaño de página
      }

      this.reservationService.getReservas().subscribe((data) => {
        this.reservas = data;
        console.log(this.reservas)
        if (data.length > 0) {
          // Obtener los números de documento de todas las reservas
          this.nroDocumentos = data.map((reserva: any) => reserva.PERSONA_NRODOCUMENTO);
          console.log(this.nroDocumentos)

          // Asignar el número de documento correspondiente a cada factura
          this.facturas.forEach((factura) => {
            // Encontrar el número de documento correspondiente en el arreglo nroDocumentos
            const index = this.nroDocumentos.indexOf(factura.PERSONA_NRODOCUMENTO);
            if (index !== -1) {
              // Asignar el número de documento correspondiente a la factura
              factura.nroDocumento = this.nroDocumentos[index];

              // Obtener el tipo de estado para cada factura
                this.UserService.getUserById(factura.PERSONA_NRODOCUMENTO).subscribe((statusData) => {
                  factura.Nombre = statusData.NOMBRE;
                  factura.Apellido = statusData.APELLIDO;
                  factura.Correo = statusData.email;
                });
              
            }
          });
        }
      });
    });
  }

  redireccionarActualizar(invoiceId: number): void {
    this.router.navigate(['/actualizar-factura', invoiceId]);
  }

  eliminarFactura(invoiceId: number): void {
    this.AlertsService.eliminarFactura(invoiceId);
  }

}
