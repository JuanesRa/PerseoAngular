import { Component } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-invoice-payment-method-update',
  templateUrl: './invoice-payment-method-update.component.html',
  styleUrls: ['./invoice-payment-method-update.component.css']
})
export class InvoicePaymentMethodUpdateComponent {
  metodofacturaId!: number;
  nroFactura!: number;
  formulario: FormGroup;
  metodos: any[] = [];
  constructor(
    private InvoiceService: InvoiceService, 
    private route: ActivatedRoute, 
    public fb: FormBuilder, 
    private alertsService: AlertsService) {
    this.formulario = this.fb.group({
      METODO_PAGO_IDMETODOPAGO: [null, Validators.required],
      FACTURA_IDFACTURA: [null, [Validators.required, Validators.maxLength(30)]],

    });
  }

  ngOnInit(): void {

    // Obtener el ID de la factura
    this.metodofacturaId = +this.route.snapshot.params['id'];
    // Obtener los metodos
    this.InvoiceService.getMethod().subscribe((data) => {
      this.metodos = data;
    });

    // Obtener datos de los metodos factura
    this.InvoiceService.getInvoiceMethodById(this.metodofacturaId).subscribe((metodos) => {
      // Establecer los valores del formulario con los datos del servicio
      this.formulario.patchValue({
        METODO_PAGO_IDMETODOPAGO: metodos.METODO_PAGO_IDMETODOPAGO,
        FACTURA_IDFACTURA: metodos.FACTURA_IDFACTURA
      });

      // Asignar el valor de FACTURA_IDFACTURA a la variable nroFactura 
      this.nroFactura = metodos.FACTURA_IDFACTURA;
    });



  }

  actualizarMetodoFactura(): void {
   // Obtén los valores del formulario
   const valoresFormulario = this.formulario.value;

   // Comparar campos modificados y enviar actualización si hay cambios
   const invMetId = +this.route.snapshot.params['id']; // Obtener ID de los parámetros de ruta
   this.InvoiceService.getInvoiceMethodById(invMetId).subscribe((metodoPagoOriginal) => {
     const camposModificados = Object.keys(valoresFormulario).filter(
       key => valoresFormulario[key] !== metodoPagoOriginal[key]
     );

     if (camposModificados.length > 0) {
       this.alertsService.actualizarMetodoPagoFactura(invMetId, valoresFormulario, this.nroFactura);
     } else {
       this.alertsService.alertDenied('No se han realizado cambios.');
     }
   });
 }

}
