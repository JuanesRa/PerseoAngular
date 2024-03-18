import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { InvoiceService } from '../services/invoice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-invoice-update',
  templateUrl: './invoice-update.component.html',
  styleUrls: ['./invoice-update.component.css']
})
export class InvoiceUpdateComponent {
  fechaMinimaIn: string;
  formulario: FormGroup;
  clientes: any[] = [];
  facturaId!: number;

  constructor(
    private UserService:UserService, 
    private invoiceService: InvoiceService, 
    private route: ActivatedRoute, 
    private alertsService: AlertsService, 
    public fb: FormBuilder) {
    this.formulario = this.fb.group({
      FECHA_FACTURA  : ['', [Validators.required, Validators.maxLength(4)]],
      MONTO_TOTAL_RESERVA  : [null, [Validators.required, Validators.maxLength(3)]],
      PERSONA_NRODOCUMENTO  : [null, [Validators.required, Validators.maxLength(3)]],
    })
    // Inicialización de la fecha mínima
  const today = new Date();
  this.fechaMinimaIn = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
     // Obtener el ID del servicio de los parámetros de la ruta
     this.facturaId = +this.route.snapshot.params['id'];


    this.route.params.subscribe(params => {
      this.UserService.getUsers().subscribe((data) => {
        this.clientes = data;
       });
    })

    // Obtener datos del servicio por su ID
    this.invoiceService.getInvoiceById(this.facturaId).subscribe((factura) => {
      // Establecer los valores del formulario con los datos de la factura
      this.formulario.patchValue({
        FECHA_FACTURA: factura.FECHA_FACTURA,
        MONTO_TOTAL_RESERVA: factura.MONTO_TOTAL_RESERVA,
        PERSONA_NRODOCUMENTO: factura.PERSONA_NRODOCUMENTO,
      });
    });
  }

  actualizarFactura(): void {
    // Obtén los valores del formulario
    const valoresFormulario = this.formulario.value;

    // Comparar campos modificados y enviar actualización si hay cambios
    const invoiceId = +this.route.snapshot.params['id']; // Obtener ID de los parámetros de ruta
    this.invoiceService.getInvoiceById(invoiceId).subscribe((facturaOriginal) => {
      const camposModificados = Object.keys(valoresFormulario).filter(
        key => valoresFormulario[key] !== facturaOriginal[key]
      );

      if (camposModificados.length > 0) {
        this.alertsService.actualizarFactura(invoiceId, valoresFormulario);
      } else {
        this.alertsService.alertDenied('No se han realizado cambios.');
      }
    });
  }

}
