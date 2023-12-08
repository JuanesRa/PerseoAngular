import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceDetailsService } from '../services/invoice-details.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-invoice-details-select',
  templateUrl: './invoice-details-select.component.html',
  styleUrls: ['./invoice-details-select.component.css']
})
export class InvoiceDetailsSelectComponent implements OnInit {

  detallesFacturas: any[] = [];

  constructor(private invoiceDetailsService: InvoiceDetailsService, private router: Router) { }

  ngOnInit(): void {
    this.invoiceDetailsService.getInvoiceDetails().subscribe((data) => {
      this.detallesFacturas = data
    })
  }

  redireccionarActualizar(invDetId: number): void {
    this.router.navigate(['/actualizar-detalle-factura', invDetId]);
  }

  eliminarDetalleFatura(invDetId: number): void {
    if (confirm('¿Está seguro de eliminar el detalle de factura?')) {
      this.invoiceDetailsService.deleteInvoiceDetail(invDetId).subscribe(() => {
        this.router.navigate(['/lista-detalles-facturas']);
      })
    }
  }

}
