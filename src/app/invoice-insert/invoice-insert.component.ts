import { Component } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-invoice-insert',
  templateUrl: './invoice-insert.component.html',
  styleUrls: ['./invoice-insert.component.css']
})
export class InvoiceInsertComponent {

  metodoPago = [
    { id: 1, nombre: 'Tarjeta Crédito' },
    { id: 2, nombre: 'Efectivo' }
  ]

  facturas: any[] = [];
  nuevaFactura: any = {
    id : '',
    id_metodoPago: '',
    id_detalleFactura: '',
    numero_documento: ''
  }

  constructor(private invoiceService: InvoiceService, private router: Router) {}

  crearNuevaFactura(): void {
    this.invoiceService.postInvoice(this.nuevaFactura).subscribe((data) => {
      this.router.navigate(['/lista-facturas'])
    })
  }

}
