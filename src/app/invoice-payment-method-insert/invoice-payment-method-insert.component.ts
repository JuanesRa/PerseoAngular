import { Component} from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice-payment-method-insert',
  templateUrl: './invoice-payment-method-insert.component.html',
  styleUrls: ['./invoice-payment-method-insert.component.css']
})
export class InvoicePaymentMethodInsertComponent {
  facturaId!: number;
  formulario: FormGroup;
  metodos: any[] = [];
 
  constructor(private InvoiceService:InvoiceService,private route: ActivatedRoute, public fb: FormBuilder, private router: Router) {
    this.formulario = this.fb.group({
      METODO_PAGO_IDMETODOPAGO  : [null, Validators.required],
      FACTURA_IDFACTURA : [null, [Validators.required, Validators.maxLength(30)]],
    });
  }

  
  ngOnInit(): void {
    this.InvoiceService.getInvoiceMethod().subscribe((data) => {
    // Obtener el ID del servicio de los parámetros de la ruta
    this.facturaId = +this.route.snapshot.params['id'];

    // Establecer el valor de FACTURA_IDFACTURA en el formulario
    this.formulario.patchValue({
      FACTURA_IDFACTURA: this.facturaId
    });
    
    // Obtener los metodos
    this.InvoiceService.getMethod().subscribe((data) => {
      this.metodos = data;
      console.log(this.metodos)
    });
   
    })
  }

  crearNuevoMetodoFactura(): void {
    this.InvoiceService.postInvoiceMethod(this.formulario.value).subscribe((data) => {
      this.router.navigate(['/lista-metodos-facturas/', this.facturaId])
    })
  }

}
