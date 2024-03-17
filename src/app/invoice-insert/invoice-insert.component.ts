import { Component } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-invoice-insert',
  templateUrl: './invoice-insert.component.html',
  styleUrls: ['./invoice-insert.component.css']
})
export class InvoiceInsertComponent {
  fechaMinimaIn: string;
  formulario: FormGroup;
  clientes: any[] = [];

  constructor(
    private UserService: UserService,
    private invoiceService: InvoiceService,
    private router: Router,
    public fb: FormBuilder,
    private alertsService: AlertsService
  ) {
    // Crear el formulario
    this.formulario = this.fb.group({
      FECHA_FACTURA: [this.getTodayDate(), [Validators.required]],
      MONTO_TOTAL_RESERVA: [null, [Validators.required, Validators.maxLength(3)]],
      PERSONA_NRODOCUMENTO: [null, [Validators.required, Validators.maxLength(3)]],
    });

    // Inicialización de la fecha mínima
    const today = new Date();
    this.fechaMinimaIn = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.UserService.getUsers().subscribe((data) => {
      this.clientes = data;
    });
  }

  // Obtener la fecha actual en formato ISO para establecerla en el formulario
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  crearNuevaFactura(): void {
    let confirmedMessage = '¡Registro exitoso!';
    this.alertsService.alertConfirmed(confirmedMessage).then(() => {
      this.invoiceService.postInvoice(this.formulario.value).subscribe((data) => {
        this.router.navigate(['/lista-facturas']);
      });
    });
  }
}
