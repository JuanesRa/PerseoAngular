import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { InvoiceService } from './invoice.service';
import { RoomService } from './room.service';
import { UserService } from './user.service';
import { GuestService } from './guest.service';
import { InventoryService } from './inventory.service';
import { InvoiceDetailsService } from './invoice-details.service';
import { ReservationService } from './reservation.service';
import { ServiceService } from './service.service';
@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  //Tipo Servicio
  tipoServicioAlertDroptitle = '¿Está seguro de eliminar el tipo de servicio?';
  tipoServicioAlertDroptext = '¡Atención! Este proceso eliminará el tipo de servicio y todos los productos relacionados permanentemente. ¿Estás seguro de que deseas proceder?';
  tipoServicioeliminar = 'El tipo de servicio ha sido eliminado.';

  //Servicio
  servicioAlertDroptitle = '¿Está seguro de eliminar el servicio o producto?';
  servicioAlertDroptext = '¡Atención! Este proceso eliminará el servicio o producto permanentemente. ¿Estás seguro de que deseas proceder?';
  servicioeliminar = 'El servicio o producto ha sido eliminado.';


  //Reserva
  ReservaAlertDroptitle = '¿Está seguro de eliminar la reserva?';
  ReservaAlertDroptext = '¡Atención! Este proceso eliminará la reserva permanentemente. ¿Estás seguro de que deseas proceder?';
  Reservaeliminar = 'La reserva ha sido eliminada.';

  //Habitacion x Reserva
  habitacionReservaAlertDroptitle = '¿Está seguro de quitar la habitación?';
  habitacionReservaAlertDroptext = '¡Atención! Este proceso quitará la habitación permanentemente. ¿Estás seguro de que deseas proceder?';
  habitacionReservaeliminar = 'La habitación ha sido quitada.';


  //HUesped x Reserva
  huespedReservaAlertDroptitle = '¿Está seguro de quitar el húesped?';
  huespedReservaAlertDroptext = '¡Atención! Este proceso quitará el húesped permanentemente. ¿Estás seguro de que deseas proceder?';
  huespedReservaeliminar = 'El húesped ha sido quitado.';


  //Inventario
  inventarioaAlertDroptitle = '¿Está seguro de eliminar el inventario?';
  inventarioaAlertDroptext = '¡Atención! Este proceso eliminará el inventario y en la habitación el inventario relacionado permanentemente. ¿Estás seguro de que deseas proceder?';
  inventarioaeliminar = 'El inventario ha sido eliminado.';

  //Categoria Inventario
  categoriaaAlertDroptitle = '¿Está seguro de eliminar la categoria?';
  categoriaaAlertDroptext = '¡Atención! Este proceso eliminará la categoría y todos los productos del inventario relacionados permanentemente. ¿Estás seguro de que deseas proceder?';
  categoriaaeliminar = 'La categoria ha sido eliminada.';

  //Huesped
  huespedAlertDroptitle = '¿Está seguro de eliminar el húesped?';
  huespedAlertDroptext = '¡Atención! Este proceso eliminará el húesped permanentemente. ¿Estás seguro de que deseas proceder?';
  huespedeliminar = 'El húesped ha sido eliminado.';

  //Usuario
  usuarioAlertDroptitle = '¿Está seguro de eliminar el usuario?';
  usuarioAlertDroptext = '¡Atención! Este proceso eliminará el usuario permanentemente. ¿Estás seguro de que deseas proceder?';
  usuarioeliminar = 'El usuario ha sido eliminado.';

  //Habitacion
  habitacionAlertDroptitle = '¿Está seguro de eliminar la habitación?';
  habitacionAlertDroptext = 'Este proceso eliminará la habitación permanentemente. ¿Estás seguro de que deseas proceder?';
  habitacioneliminar = 'La habitación ha sido eliminada.';

  //Habitacion Tipo
  habitacionTipoAlertDroptitle = '¿Está seguro de eliminar el tipo de habitación?';
  habitacionTipoAlertDroptext = 'Este proceso eliminará el tipo de habitación y las habitaciones relacionadas permanentemente. ¿Estás seguro de que deseas proceder?';
  habitacionTipoeliminar = 'El tipo de habitación ha sido eliminado.';

  //Habitacion Estado
  habitacionEstadoAlertDroptitle = '¿Está seguro de eliminar el estado de la habitación?';
  habitacionEstadoAlertDroptext = 'Este proceso eliminará el estado de la habitación permanentemente. ¿Estás seguro de que deseas proceder?';
  habitacionEstadoeliminar = 'El estado de la habitación ha sido eliminado.';

  //Habitacion Inventario
  habitacionInventarioAlertDroptitle = '¿Está seguro de eliminar el inventario de la habitación?';
  habitacionInventarioAlertDroptext = 'Este proceso eliminará el inventario de la habitación permanentemente. ¿Estás seguro de que deseas proceder?';
  habitacionInventarioeliminar = 'El inventario de la habitación ha sido eliminado.';

  //Factura
  facturaAlertDroptitle = '¿Está seguro de eliminar la factura?';
  facturaAlertDroptext = '¡Atención! Este proceso eliminará la factura y sus detalles permanentemente. ¿Estás seguro de que deseas proceder?';
  facturaeliminar = 'La factura ha sido eliminada.';

  //Detalle Factura
  detallesFacturaAlertDroptitle = '¿Está seguro de eliminar el detalle de la factura?';
  detallesFacturaAlertDroptext = '¡Atención! Este proceso eliminará detalle de la factura permanentemente. ¿Estás seguro de que deseas proceder?';
  detallesFacturaeliminar = 'El detalle de la factura ha sido eliminado.';

  //Metodo Factura
  metodoPagofacturaAlertDroptitle = '¿Está seguro de quitar el método de pago?';
  metodoPagofacturaAlertDroptext = '¡Atención! Este proceso quitará el método de pago permanentemente. ¿Estás seguro de que deseas proceder?';
  metodoPagofacturaeliminar = 'El método de pago ha sido quitado.';



  constructor(
    private invoiceService: InvoiceService,
    private roomService: RoomService,
    private userService: UserService,
    private guestService: GuestService,
    private categoryInvService: InventoryService,
    private inventoryService: InventoryService,
    private invoiceDetailsService: InvoiceDetailsService,
    private reservationService: ReservationService,
    private serviceService: ServiceService

  ) { }



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
      confirmButtonColor: '#5eb319',
    }).then(() => { });
  }


  alertDenied(title: string) {
    Swal.fire({
      title: title,
      icon: 'error',
      confirmButtonColor: '#F27474',
    }).then(() => { });
  }
  
  eliminarTipoServicio(TypeServiceId: number): void {
    this.alertDrop(this.tipoServicioAlertDroptitle, this.tipoServicioAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.serviceService.deleteTypeService(TypeServiceId).subscribe(() => {
          Swal.fire({
            title: 'Eliminado!',
            text: this.tipoServicioeliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  eliminarServicio(serviceId: number): void {
    this.alertDrop(this.servicioAlertDroptitle, this.servicioAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.serviceService.deleteService(serviceId).subscribe(() => {
          Swal.fire({
            title: 'Eliminado!',
            text: this.servicioeliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  eliminarReserva(reservaId: number): void {
    this.alertDrop(this.ReservaAlertDroptitle, this.ReservaAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.reservationService.deleteReserva(reservaId).subscribe(() => {
          Swal.fire({
            title: 'Eliminado!',
            text: this.Reservaeliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  eliminarHabitacionReserva(roomXreserId: number): void {
    this.alertDrop(this.habitacionReservaAlertDroptitle, this.habitacionReservaAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.reservationService.deleteReservationXRoom(roomXreserId).subscribe(() => {
          Swal.fire({
            title: 'Eliminado!',
            text: this.habitacionReservaeliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }


  eliminarHuespedReserva(guestxreserId: number): void {
    this.alertDrop(this.huespedReservaAlertDroptitle, this.huespedReservaAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.reservationService.deleteReservationXGuest(guestxreserId).subscribe(() => {
          Swal.fire({
            title: 'Eliminado!',
            text: this.huespedReservaeliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }


  eliminarInventario(inventarioId: number): void {
    this.alertDrop(this.inventarioaAlertDroptitle, this.inventarioaAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.inventoryService.deleteInventory(inventarioId).subscribe(() => {
          Swal.fire({
            title: 'Eliminado!',
            text: this.inventarioaeliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  eliminarCategoriaInventario(categoryId: number): void {
    this.alertDrop(this.categoriaaAlertDroptitle, this.categoriaaAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.categoryInvService.deleteInventoryCategory(categoryId).subscribe(() => {
          Swal.fire({
            title: 'Eliminado!',
            text: this.categoriaaeliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  eliminarHuesped(huespedId: number): void {
    this.alertDrop(this.huespedAlertDroptitle, this.huespedAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.guestService.deleteGuest(huespedId).subscribe(() => {
          Swal.fire({
            title: 'Eliminado!',
            text: this.huespedeliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  eliminarUsuario(UserId: number): void {
    this.alertDrop(this.usuarioAlertDroptitle, this.usuarioAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.userService.deleteUser(UserId).subscribe(() => {
          Swal.fire({
            title: 'Eliminado!',
            text: this.usuarioeliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  eliminarHabitacion(roomId: number): void {
    this.alertDrop(this.habitacionAlertDroptitle, this.habitacionAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.roomService.deleteRoom(roomId).subscribe(() => {
          Swal.fire({
            title: 'Eliminada!',
            text: this.habitacioneliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  eliminarHabitacionTipo(TypeRoomId: number): void {
    this.alertDrop(this.habitacionTipoAlertDroptitle, this.habitacionTipoAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.roomService.deleteTypeRoom(TypeRoomId).subscribe(() => {
          Swal.fire({
            title: 'Eliminada!',
            text: this.habitacionTipoeliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  eliminarHabitacionEstado(StatusRoomId: number): void {
    this.alertDrop(this.habitacionEstadoAlertDroptitle, this.habitacionEstadoAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.roomService.deleteStatusRoom(StatusRoomId).subscribe(() => {
          Swal.fire({
            title: 'Eliminada!',
            text: this.habitacionEstadoeliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  eliminarInventarioHabitacion(roomxinventoryId: number): void {
    this.alertDrop(this.habitacionInventarioAlertDroptitle, this.habitacionInventarioAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.roomService.deleteRoomInventory(roomxinventoryId).subscribe(() => {
          Swal.fire({
            title: 'Eliminada!',
            text: this.habitacionInventarioeliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  eliminarFactura(invoiceId: number): void {
    this.alertDrop(this.facturaAlertDroptitle, this.facturaAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.invoiceService.deleteInvoice(invoiceId).subscribe(() => {
          Swal.fire({
            title: 'Eliminada!',
            text: this.facturaeliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  eliminarDetalleFactura(invDetId: number): void {
    this.alertDrop(this.detallesFacturaAlertDroptitle, this.detallesFacturaAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.invoiceDetailsService.deleteInvoiceDetail(invDetId).subscribe(() => {
          Swal.fire({
            title: 'Eliminado!',
            text: this.detallesFacturaeliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  eliminarMetodoPagoFactura(invMetId: number): void {
    this.alertDrop(this.metodoPagofacturaAlertDroptitle, this.metodoPagofacturaAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.invoiceService.deleteInvoiceMethod(invMetId).subscribe(() => {
          Swal.fire({
            title: 'Eliminado!',
            text: this.metodoPagofacturaeliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }


}
