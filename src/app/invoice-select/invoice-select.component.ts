import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-invoice-select',
  templateUrl: './invoice-select.component.html',
  styleUrls: ['./invoice-select.component.css']
})
export class InvoiceSelectComponent implements OnInit{

  facturas: any[] = [];

  constructor(private invoiceService: InvoiceService, private router: Router) { }

  ngOnInit(): void {
    this.invoiceService.getInvoice().subscribe((data) => {
      this.facturas = data
    })
  }

  redireccionarActualizar(invoiceId: number): void {
    this.router.navigate(['/actualizar-factura', invoiceId]);
  }

  eliminarFactura(invoiceId: number): void {
    if (confirm('¿Está seguro de eliminar la factura?')) {
      this.invoiceService.deleteInvoice(invoiceId).subscribe(() => {
        this.router.navigate(['/lista-facturas']);
      })
    }
  }

}
