import { Component } from '@angular/core';
import { InvoiceDetailsService } from '../services/invoice-details.service';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-invoice-details-insert',
  templateUrl: './invoice-details-insert.component.html',
  styleUrls: ['./invoice-details-insert.component.css']
})
export class InvoiceDetailsInsertComponent {
  facturaId!: number;
  formulario: FormGroup;
  productos: any[] = [];

  constructor(
    private ServiceService: ServiceService,
    private invoiceDetailsService: InvoiceDetailsService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    private alertsService: AlertsService) {
    this.formulario = this.fb.group({
      CANTIDAD: [null, Validators.required],
      PRODUCTO_IDPRODUCTO: [null, [Validators.required, Validators.maxLength(30)]],
      FACTURA_IDFACTURA: [null, [Validators.required, Validators.maxLength(30)]],
    });
  }


  ngOnInit(): void {
    this.invoiceDetailsService.getInvoiceDetails().subscribe((data) => {
      // Obtener el ID del servicio de los parámetros de la ruta
      this.facturaId = +this.route.snapshot.params['id'];


      // Establecer el valor de FACTURA_IDFACTURA en el formulario
      this.formulario.patchValue({
        FACTURA_IDFACTURA: this.facturaId
      });

      // Obtener los productos
      this.ServiceService.getServices().subscribe((data) => {
        this.productos = data;
        console.log(this.productos)
      });

    })
  }

  crearNuevoDetalleFactura(): void {
    let confirmedMessage = '¡Se añadió exitosamente!';
    this.alertsService.alertConfirmed(confirmedMessage).then(() => {
      this.invoiceDetailsService.postInvoiceDetail(this.formulario.value).subscribe((data) => {
        this.router.navigate(['/lista-detalles-facturas/', this.facturaId]);
      });
    });
  }
}
