import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { InvoiceService } from './invoice.service';
import { RoomService } from './room.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private invoiceService: InvoiceService,
    private RoomService: RoomService,
    private http: HttpClient) { }


  alertDrop(title: string, text: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5eb319",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Borralo!"
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  alertConfirmed(title: string): Promise<void> {
    return Swal.fire({
      title: title,
      icon: 'success',
      confirmButtonColor: '#5eb319', // Cambia el color del botón "OK"
    }).then(() => {});
  }

  alertDenied(title: string){
    Swal.fire({
      title: title,
      icon: 'error',
      confirmButtonColor: '#F27474', // Cambia el color del botón "OK"
    }).then(() => {});
  }


  eliminarFactura(invoiceId: number): void {
    this.alertDrop('¿Está seguro de eliminar la factura?', 'Este proceso eliminará la factura permanentemente.').then((confirmed) => {
      if (confirmed) {
        this.invoiceService.deleteInvoice(invoiceId).subscribe(() => {
          Swal.fire({
            title: 'Eliminada!',
            text: 'La factura ha sido eliminada.',
            icon: 'success',
            confirmButtonColor: '#5eb319', // Cambia el color del botón "OK"
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }
  
  eliminarHabitacion(roomId: number): void {
    this.alertDrop('¿Está seguro de eliminar la habitación?', 'Este proceso eliminará la habitación permanentemente.').then((confirmed) => {
      if (confirmed) {
        this.RoomService.deleteRoom(roomId).subscribe(() => {
          Swal.fire({
            title: 'Eliminada!',
            text: 'La habitación ha sido eliminada.',
            icon: 'success',
            confirmButtonColor: '#5eb319', // Cambia el color del botón "OK"
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }
}
