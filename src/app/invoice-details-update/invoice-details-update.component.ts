import { Component } from '@angular/core';
import { InvoiceDetailsService } from '../services/invoice-details.service';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-invoice-details-update',
  templateUrl: './invoice-details-update.component.html',
  styleUrls: ['./invoice-details-update.component.css']
})
export class InvoiceDetailsUpdateComponent {
  detallesfacturaId!: number;
  nroFactura!: number;
  formulario: FormGroup;
  productos: any[] = [];
  constructor(
    private ServiceService: ServiceService, 
    private invoiceDetailsService: InvoiceDetailsService, 
    private route: ActivatedRoute, 
    public fb: FormBuilder, private router: Router,
    private alertsService:AlertsService ) {
    this.formulario = this.fb.group({
      CANTIDAD: [null, Validators.required],
      PRODUCTO_IDPRODUCTO: [null, [Validators.required, Validators.maxLength(30)]],
      FACTURA_IDFACTURA: [null, [Validators.required, Validators.maxLength(30)]],
    });
  }

  ngOnInit(): void {

    // Obtener el ID de la factura
    this.detallesfacturaId = +this.route.snapshot.params['id'];

    // Obtener los productos
    this.ServiceService.getServices().subscribe((data) => {
      this.productos = data;
      console.log(this.productos)
    });

    // Obtener datos de los detalles de factura
    this.invoiceDetailsService.getInvoiceDetailById(this.detallesfacturaId).subscribe((detalles) => {
      // Establecer los valores del formulario con los datos del servicio
      this.formulario.patchValue({
        CANTIDAD: detalles.CANTIDAD,
        PRODUCTO_IDPRODUCTO: detalles.PRODUCTO_IDPRODUCTO,
        FACTURA_IDFACTURA: detalles.FACTURA_IDFACTURA
      });

      // Asignar el valor de FACTURA_IDFACTURA a la variable nroFactura 
      this.nroFactura = detalles.FACTURA_IDFACTURA;
    });



  }

  actualizarDetalleFactura(): void {
   // Obtén los valores del formulario
   const valoresFormulario = this.formulario.value;

   // Comparar campos modificados y enviar actualización si hay cambios
   const invDetId = +this.route.snapshot.params['id']; // Obtener ID de los parámetros de ruta
   this.invoiceDetailsService.getInvoiceDetailById(invDetId).subscribe((DetallesoOriginal) => {
     const camposModificados = Object.keys(valoresFormulario).filter(
       key => valoresFormulario[key] !== DetallesoOriginal[key]
     );

     if (camposModificados.length > 0) {
       this.alertsService.actualizarDetalleFactura(invDetId, valoresFormulario,this.nroFactura);
     } else {
       this.alertsService.alertDenied('No se han realizado cambios.');
     }
   });

  }

}
