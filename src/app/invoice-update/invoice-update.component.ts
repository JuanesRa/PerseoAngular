import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-invoice-update',
  templateUrl: './invoice-update.component.html',
  styleUrls: ['./invoice-update.component.css']
})
export class InvoiceUpdateComponent {

  metodoPago = [
    { id: 1, nombre: 'Tarjeta Crédito' },
    { id: 2, nombre: 'Efectivo' }
  ]

  factura: any = {};
  facturaOriginal: any = {}

  constructor(private invoiceService: InvoiceService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const invoiceId = +params['id'];
      this.invoiceService.getInvoiceById(invoiceId).subscribe((data) => {
        this.factura = data
      })
    })
  }

  actualizarFactura(): void {
    const invoiceId = this.factura.id;
    const camposModificados = Object.keys(this.factura).filter(
      key => this.factura[key] !== this.facturaOriginal[key]
    );

    if (camposModificados.length > 0) {
      this.invoiceService.putInvoice(invoiceId, this.factura).subscribe(() => {
        this.router.navigate(['/lista-facturas'])
      });
    } else {
      console.log('No se han realizado cambios')
    }
  }

}
