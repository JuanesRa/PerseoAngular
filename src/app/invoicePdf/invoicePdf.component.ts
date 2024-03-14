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

// Define una interfaz llamada Reserva que especifica la estructura de los objetos de reserva.
interface Reserva {
  CANTIDAD_ADULTOS: number;
  CANTIDAD_NINOS: number;
  ESTADO_RESERVA: number;
  FECHA_ENTRADA: string;
  FECHA_RESERVACION: string;
  FECHA_SALIDA: string;
  HORA_ENTRADA: string | null;
  HORA_SALIDA: string | null;
  IDRESERVA: number;
  PERSONA_NRODOCUMENTO: string;
  PRECIO_CALCULADO: string;
}

@Component({
  selector: 'app-invoicePdf',
  templateUrl: './invoicePdf.component.html',
  styleUrls: ['./invoicePdf.component.css']
})
export class InvoicePdfComponent implements OnInit {

  // Propiedades del componente
  facturaId!: number;
  nroDocumento!: number;
  reservationId!: number;
  detallesFacturas: any[] = [];
  factura: any;
  usuario: any;
  reservas: any[] = [];
  habitacionesXreserva: any[] = [];
  roomxreservation: any[] = [];

  constructor(
    // Inyección de dependencias
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
    // Obtener el ID de la factura de la ruta
    this.facturaId = +this.route.snapshot.params['id'];

    // Obtener los productos de la factura
    this.invoiceService.getInvoiceById(this.facturaId).subscribe((data) => {
      // Almacenar los datos de la factura
      this.factura = data;

              console.log(this.factura)

      // Obtener el número de documento del usuario asociado a la factura
      this.nroDocumento = data.PERSONA_NRODOCUMENTO;

      // Obtener información del usuario
      this.userService.getUserById(this.nroDocumento).subscribe((user) => {
        // Almacenar datos del usuario
        this.usuario = user;

              console.log(this.usuario)

        // Obtener las reservas del usuario
        this.reservationService.getReservas().subscribe((reservas: Reserva[]) => {
          // Convertir el número de documento a string para comparar
          const nroDocumentoString = this.nroDocumento.toString();
          // Filtrar las reservas para obtener solo aquellas que coincidan con el número de documento
          this.reservas = reservas.filter(reserva => reserva.PERSONA_NRODOCUMENTO === nroDocumentoString);
          // Almacenar el ID de la reserva
          this.reservationId = this.reservas[0].IDRESERVA;

              console.log(this.reservas)

          // Obtener las habitaciones asociadas a la reserva
          this.reservationService.getReservationXRoom().subscribe((data) => {
            // Filtrar las habitaciones por el ID de la reserva actual
            this.roomxreservation = data.filter((item: any) => item.RESERVA_IDRESERVA == this.reservationId);


                console.log(this.roomxreservation)


            // Para cada habitación reservada, obtener información adicional de la habitación
            this.roomxreservation.forEach((RoomXReservation) => {
              this.roomService.getRoomById(RoomXReservation.HABITACION_NROHABITACION).subscribe((statusData) => {
                // Almacenar información adicional de la habitación en la reserva
                RoomXReservation.NroHabitacion = statusData.NROHABITACION;
                RoomXReservation.IDTIPOHABITACION = statusData.TIPO_HABITACION_IDTIPOHABITACION;
                // Obtener el tipo de habitación
                this.roomService.getTypeRoomById(RoomXReservation.IDTIPOHABITACION).subscribe((statusData) => {
                  // Almacenar el tipo de habitación y su precio en la reserva
                  RoomXReservation.tipo = statusData.TIPO_HABITACION;
                  RoomXReservation.precio = statusData.PRECIOXNOCHE;
                });
              });
            });
          });
        });

        // Obtener detalles de la factura
        this.invoiceDetailsService.getInvoiceDetails().subscribe((detailsData) => {
          // Filtrar los detalles de factura basados en el ID de la factura actual
          this.detallesFacturas = detailsData;

                console.log(this.detallesFacturas)

          // Obtener información adicional de los productos asociados a los detalles de la factura
          this.detallesFacturas.forEach((detalles) => {
            this.serviceService.getServiceById(detalles.PRODUCTO_IDPRODUCTO).subscribe((statusData) => {
              // Almacenar información adicional de los productos en los detalles de la factura
              detalles.producto = statusData.NOMBRE_PRODUCTO;
              detalles.precio = statusData.VALOR;
            });
          });
        });
      });
    });
  }

  public covertToPdf() {
    html2canvas(document.body).then(canvas => {
      const contentDataUrl = canvas.toDataURL('image/png');
      let pdf = new jsPDF('l', 'mm', 'a4');
      const aspectRatio = canvas.height / canvas.width;
      var width = pdf.internal.pageSize.getWidth();
      var height = width * aspectRatio;
      pdf.addImage(contentDataUrl, 'PNG', 0, 0, width, height);
      pdf.save('Factura.pdf');
    });
  }
}
