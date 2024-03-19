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
import { forkJoin, tap } from 'rxjs';

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
  reserva: any[] = [];
  habitacionesXreserva: any[] = [];
  roomxreservation: any[] = [];
  fechaEntrada: any;
  fechaSalida: any;
  duracionEstadia: any;
  totalServicios: number = 0;
  totalReserva: number = 0;
  totalGeneral: number = 0;

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

      this.reservationId = data.IDRESERVA

      // Obtener la reserva asociada a la factura actual
      this.reservationService.getReservaById(this.reservationId).subscribe((data) => {
        this.reserva = data;
        this.fechaEntrada = data.FECHA_ENTRADA;
        this.fechaSalida = data.FECHA_SALIDA;
        this.nroDocumento = data.PERSONA_NRODOCUMENTO;
        this.duracionEstadia = this.calcularDiasEntreFechas(this.fechaEntrada, this.fechaSalida);
        console.log(this.reserva)

        // Obtener las habitaciones asociadas a la reserva
        this.reservationService.getReservationXRoom().subscribe((data) => {
          // Filtrar las habitaciones por el ID de la reserva actual
          this.roomxreservation = data.filter((item: any) => item.RESERVA_IDRESERVA == this.reservationId);

          // Para cada habitación reservada, obtener información adicional de la habitación
          let roomRequests = this.roomxreservation.map(RoomXReservation =>
            this.roomService.getRoomById(RoomXReservation.HABITACION_NROHABITACION).pipe(
              tap(statusData => {
                // Almacenar información adicional de la habitación en la reserva
                RoomXReservation.NroHabitacion = statusData.NROHABITACION;
                RoomXReservation.IDTIPOHABITACION = statusData.TIPO_HABITACION_IDTIPOHABITACION;
                // Obtener el tipo de habitación
                return this.roomService.getTypeRoomById(RoomXReservation.IDTIPOHABITACION).subscribe((statusData) => {
                  // Almacenar el tipo de habitación y su precio en la reserva
                  RoomXReservation.tipo = statusData.TIPO_HABITACION;
                  RoomXReservation.precio = statusData.PRECIOXNOCHE;
                  RoomXReservation.precioTotalHabitacion = statusData.PRECIOXNOCHE * this.duracionEstadia;

                  // console.log(RoomXReservation)

                  this.totalReserva += RoomXReservation.precioTotalHabitacion;
                  console.log(this.totalReserva)
                });
              })
            )
          );

          // Esperar a que todas las solicitudes de habitaciones terminen antes de continuar
          forkJoin(roomRequests).subscribe(() => {
            // Obtener detalles de la factura fuera del bloque del usuario
            this.invoiceDetailsService.getInvoiceDetails().subscribe((detailsData) => {
              // Filtrar los detalles de factura basados en el ID de la factura actual
              this.detallesFacturas = detailsData.filter((item: any) => item.FACTURA_IDFACTURA == this.facturaId);
              console.log(this.detallesFacturas)

              // Obtener información adicional de los productos asociados a los detalles de la factura
              this.detallesFacturas.forEach((detalles) => {
                this.serviceService.getServiceById(detalles.PRODUCTO_IDPRODUCTO).subscribe((statusData) => {
                  // Almacenar información adicional de los productos en los detalles de la factura
                  detalles.producto = statusData.NOMBRE_PRODUCTO;
                  detalles.precio = statusData.VALOR;
                  detalles.precioTotalProducto = detalles.CANTIDAD * statusData.VALOR;

                  this.totalServicios += detalles.precioTotalProducto;
                  console.log(this.totalServicios)
                  // Calcular el total general fuera del bloque del usuario
                  this.totalGeneral = this.totalReserva + this.totalServicios;
                  console.log(this.totalGeneral)
                });
              });
            });
          });
        });

        // Obtener información del usuario asociado a la reserva
        this.userService.getUserById(this.nroDocumento).subscribe((data) => {
          this.usuario = data;
          console.log(this.usuario)
        })
      });
    });
  }

  calcularDiasEntreFechas(fechaInicio: string, fechaFin: string): number {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const diferencia = fin.getTime() - inicio.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  }

  public covertToPdf() {
    const DATA: any = document.getElementById('contentToConvert');
    const pdf = new jsPDF('p', 'pt', 'a4');
    html2canvas(DATA).then(canvas => {
      const contentDataUrl = canvas.toDataURL('image/png');
      const aspectRatio = canvas.height / canvas.width;
      var width = pdf.internal.pageSize.getWidth();
      var height = width * aspectRatio;
      pdf.addImage(contentDataUrl, 'PNG', 0, 0, width, height);
      pdf.save('Factura.pdf');
    });
  }
}
