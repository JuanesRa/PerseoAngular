import { Component } from '@angular/core';
import { InvoiceDetailsService } from '../services/invoice-details.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-invoice-details-insert',
  templateUrl: './invoice-details-insert.component.html',
  styleUrls: ['./invoice-details-insert.component.css']
})
export class InvoiceDetailsInsertComponent {

  detallesFacturas: any[] = [];
  nuevoDetalleFactura: any = {
    id : '',
    fecha_emision: '',
    total_factura: ''
  }

  constructor(private invoiceDetailsService: InvoiceDetailsService, private router: Router) {}

  crearNuevoDetalleFactura(): void {
    this.invoiceDetailsService.postInvoiceDetail(this.nuevoDetalleFactura).subscribe((data) => {
      this.router.navigate(['/lista-detalles-facturas'])
    })
  }
}
