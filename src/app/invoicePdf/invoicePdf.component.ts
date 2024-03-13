import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceDetailsService } from '../services/invoice-details.service';
import { ServiceService } from '../services/service.service';
import { UserService } from '../services/user.service';
import { ReservationService } from '../services/reservation.service';
import { RoomService } from '../services/room.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoicePdf',
  templateUrl: './invoicePdf.component.html',
  styleUrls: ['./invoicePdf.component.css']
})
export class InvoicePdfComponent implements OnInit {


  facturaId!: number;
  nroDocumento!: number;
  detallesFacturas: any[] = [];
  factura: any[] = [];


  constructor(
    private invoiceService: InvoiceService,
    private invoiceDetailsService: InvoiceDetailsService,
    private serviceService: ServiceService,
    private userService: UserService,
    private reservationService: ReservationService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {
    // Obtener el ID de la factura
    this.facturaId = +this.route.snapshot.params['id'];

    // Obtener los productos
    this.invoiceService.getInvoiceById(this.facturaId).subscribe((data) => {
      this.factura = data;
      console.log(this.factura);

      // Guardar el número de documento en una variable
      // this.nroDocumento = this.factura.PERSONA_NRODOCUMENTO;x
      

      // Obtener detalles de factura
      this.invoiceDetailsService.getInvoiceDetails().subscribe((detailsData) => {
        // Filtrar los detalles de factura basados en el ID de la factura actual
        this.detallesFacturas = detailsData;
        console.log(this.detallesFacturas);

        // Obtener los productos 
        this.detallesFacturas.forEach((detalles) => {
          this.serviceService.getServiceById(detalles.PRODUCTO_IDPRODUCTO).subscribe((statusData) => {
            detalles.producto = statusData.NOMBRE_PRODUCTO
            detalles.precio = statusData.VALOR
            console.log(statusData);

          });
        });
      });
    });
  }

  public covertToPdf() {
    html2canvas(document.body).then(canvas => {
      const contentDataUrl = canvas.toDataURL('image/png');
      let pdf = new jsPDF('l', 'mm', 'credit-card');
      const aspectRatio = canvas.height / canvas.width;
      var width = pdf.internal.pageSize.getWidth();
      var height = width * aspectRatio;
      pdf.addImage(contentDataUrl, 'PNG', 0, 0, width, height);
      pdf.save('Factura.pdf');
    });
  }
}
