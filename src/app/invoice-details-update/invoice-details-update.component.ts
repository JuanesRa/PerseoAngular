import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceDetailsService } from '../services/invoice-details.service';

@Component({
  selector: 'app-invoice-details-update',
  templateUrl: './invoice-details-update.component.html',
  styleUrls: ['./invoice-details-update.component.css']
})
export class InvoiceDetailsUpdateComponent {

  detalleFactura: any = {};
  detalleFacturaOriginal: any = {}

  constructor(private invoiceDetailsService: InvoiceDetailsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const invDetId = +params['id'];
      this.invoiceDetailsService.getInvoiceDetailById(invDetId).subscribe((data) => {
        this.detalleFactura = data
      })
    })
  }

  actualizarDetalleFactura(): void {
    const invDetId = this.detalleFactura.id;
    const camposModificados = Object.keys(this.detalleFactura).filter(
      key => this.detalleFactura[key] !== this.detalleFacturaOriginal[key]
    );

    if (camposModificados.length > 0) {
      this.invoiceDetailsService.putInvoiceDetail(invDetId, this.detalleFactura).subscribe(() => {
        this.router.navigate(['/lista-detalles-facturas'])
      });
    } else {
      console.log('No se han realizado cambios')
    }
  }

}
