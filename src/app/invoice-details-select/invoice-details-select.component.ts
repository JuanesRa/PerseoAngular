import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceDetailsService } from '../services/invoice-details.service';
import { ServiceService } from '../services/service.service';
import { MatPaginator } from '@angular/material/paginator';
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-invoice-details-select',
  templateUrl: './invoice-details-select.component.html',
  styleUrls: ['./invoice-details-select.component.css']
})
export class InvoiceDetailsSelectComponent implements OnInit {

  detallesFacturas: any[] = [];
  facturaId!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ServiceService: ServiceService,
    private route: ActivatedRoute,
    private invoiceDetailsService: InvoiceDetailsService,
    private router: Router,
    private alertsService:AlertsService) { }

  ngOnInit(): void {
    this.invoiceDetailsService.getInvoiceDetails().subscribe((data) => {
      // Obtener el ID de factura de los parámetros de la ruta
      this.facturaId = +this.route.snapshot.params['id'];
      // Filtrar los registros según el valor de FACTURA_IDFACTURA
      this.detallesFacturas = data.filter((item: any) => item.FACTURA_IDFACTURA == this.facturaId);

      // Configurar el paginador después de recibir los datos
      if (this.paginator) {
        this.paginator.pageSize = 10;
        this.paginator.hidePageSize = true; // Oculta la selección de tamaño de página
      }

      // Obtener los productos 
      this.detallesFacturas.forEach((detalles) => {
        this.ServiceService.getServiceById(detalles.PRODUCTO_IDPRODUCTO).subscribe((statusData) => {
          detalles.producto = statusData.NOMBRE_PRODUCTO;
          detalles.precio = statusData.VALOR;
        });
      });
    });
  }

  redireccionarActualizar(invDetId: number): void {
    this.router.navigate(['/actualizar-detalle-factura', invDetId]);
  }

  eliminarDetalleFatura(invDetId: number): void {
    this.alertsService.eliminarDetalleFactura(invDetId);
  }
}
