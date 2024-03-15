import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-invoice-payment-method-select',
  templateUrl: './invoice-payment-method-select.component.html',
  styleUrls: ['./invoice-payment-method-select.component.css']
})
export class InvoicePaymentMethodSelectComponent implements OnInit {
  FacturaMetodosPago: any[] = [];
  facturaId!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private InvoiceService:InvoiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.InvoiceService.getInvoiceMethod().subscribe((data) => {
      // Obtener el ID de factura de los parámetros de la ruta
      this.facturaId = +this.route.snapshot.params['id'];
      // Filtrar los registros según el valor de FACTURA_IDFACTURA
      this.FacturaMetodosPago = data.filter((item: any) => item.FACTURA_IDFACTURA  == this.facturaId);

      // Configurar el paginador después de recibir los datos
      if (this.paginator) {
        this.paginator.pageSize = 10;
        this.paginator.hidePageSize = true; // Oculta la selección de tamaño de página
      }

      // Obtener los metodos 
      this.FacturaMetodosPago.forEach((facturaMetodo) => {
        this.InvoiceService.getMethodById(facturaMetodo.METODO_PAGO_IDMETODOPAGO).subscribe((statusData)=>{
          facturaMetodo.metodo = statusData.METODO;
        });
      });
    });
  }

  redireccionarActualizar(invDetId: number): void {
    this.router.navigate(['/actualizar-metodo-factura', invDetId]);
  }

  eliminarMetodoFatura(invDetId: number): void {
    if (confirm('¿Está seguro de eliminar el Método?')) {
      this.InvoiceService.deleteInvoiceMethod(invDetId).subscribe(() => {
        window.location.reload();
      });
    }
  }
}
