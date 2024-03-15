import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { UserService } from '../services/user.service';
import { AlertsService } from '../services/alerts.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-invoice-select',
  templateUrl: './invoice-select.component.html',
  styleUrls: ['./invoice-select.component.css']
})
export class InvoiceSelectComponent implements OnInit {

  facturas: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private UserService: UserService,
    private invoiceService: InvoiceService,
    private router: Router,
    private AlertsService: AlertsService,
  ) { }

  ngOnInit(): void {
    this.invoiceService.getInvoice().subscribe((data) => {
      this.facturas = data;

      // Configurar el paginador después de recibir los datos
      if (this.paginator) {
        this.paginator.pageSize = 10;
        this.paginator.hidePageSize = true; // Oculta la selección de tamaño de página
      }

      // Obtener el tipo de estado para cada factura
      this.facturas.forEach((factura) => {
        this.UserService.getUserById(factura.PERSONA_NRODOCUMENTO).subscribe((statusData) => {
          factura.Nombre = statusData.NOMBRE;
          factura.Apellido = statusData.APELLIDO;
          factura.Correo = statusData.email;
        });
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
