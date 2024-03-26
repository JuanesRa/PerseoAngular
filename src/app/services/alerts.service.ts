import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InvoiceService } from './invoice.service';
import { RoomService } from './room.service';
import { UserService } from './user.service';
import { GuestService } from './guest.service';
import { InventoryService } from './inventory.service';
import { InvoiceDetailsService } from './invoice-details.service';
import { ReservationService } from './reservation.service';
import { ServiceService } from './service.service';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  // ---------------------------------------------------------- VARIABLES PARA ACTUALIZAR ---------------------------------------------------------------------------------------
  //Tipo Servicio
  tipoServicioAlertUpdatetitle = '¿Está seguro de actualizar el tipo de servicio?';
  tipoServicioAlertUpdatetext = '¡Atención! Este proceso actualizará el tipo de servicio y todos los productos relacionados permanentemente. ¿Estás seguro de que deseas proceder?';
  tipoServicioactualizar = 'El tipo de servicio ha sido actualizado.';

  //Servicio
  servicioAlertUpdatetitle = '¿Está seguro de actualizar el servicio o producto?';
  servicioAlertUpdatetext = '¡Atención! Este proceso actualizará el servicio o producto permanentemente. ¿Estás seguro de que deseas proceder?';
  servicioactualizar = 'El servicio o producto ha sido actualizado.';


  //Reserva
  ReservaAlertUpdatetitle = '¿Está seguro de actualizar la reserva?';
  ReservaAlertUpdatetext = '¡Atención! Este proceso actualizará la reserva permanentemente. ¿Estás seguro de que deseas proceder?';
  Reservaactualizar = 'La reserva ha sido actualizada.';

  //Habitacion x Reserva
  habitacionReservaAlertUpdatetitle = '¿Está seguro de actualizar la habitación?';
  habitacionReservaAlertUpdatetext = '¡Atención! Este proceso actualizará la habitación permanentemente. ¿Estás seguro de que deseas proceder?';
  habitacionReservaactualizar = 'La habitación ha sido actualizada.';


  //HUesped x Reserva
  huespedReservaAlertUpdatetitle = '¿Está seguro de actualizar el húesped?';
  huespedReservaAlertUpdatetext = '¡Atención! Este proceso actualizará el húesped permanentemente. ¿Estás seguro de que deseas proceder?';
  huespedReservaactualizar = 'El húesped ha sido actualizado.';


  //Inventario
  inventarioaAlertUpdatetitle = '¿Está seguro de actualizar el inventario?';
  inventarioaAlertUpdatetext = '¡Atención! Este proceso actualizará el inventario y en la habitación el inventario relacionado permanentemente. ¿Estás seguro de que deseas proceder?';
  inventarioaactualizar = 'El inventario ha sido actualizado.';

  //Categoria Inventario
  categoriaaAlertUpdatetitle = '¿Está seguro de actualizar la categoria?';
  categoriaaAlertUpdatetext = '¡Atención! Este proceso actualizará la categoría y todos los productos del inventario relacionados permanentemente. ¿Estás seguro de que deseas proceder?';
  categoriaaactualizar = 'La categoria ha sido actualizada.';

  //Huesped
  huespedAlertUpdatetitle = '¿Está seguro de actualizar el húesped?';
  huespedAlertUpdatetext = '¡Atención! Este proceso actualizará el húesped permanentemente. ¿Estás seguro de que deseas proceder?';
  huespedactualizar = 'El húesped ha sido actualizado.';

  //Usuario
  usuarioAlertUpdatetitle = '¿Está seguro de actualizar el usuario?';
  usuarioAlertUpdatetext = '¡Atención! Este proceso actualizará el usuario permanentemente. ¿Estás seguro de que deseas proceder?';
  usuarioactualizar = 'El usuario ha sido actualizado.';

  //Habitacion
  habitacionAlertUpdatetitle = '¿Está seguro de actualizar la habitación?';
  habitacionAlertUpdatetext = 'Este proceso actualizará la habitación permanentemente. ¿Estás seguro de que deseas proceder?';
  habitacionactualizar = 'La habitación ha sido actualizada.';

  //Habitacion Tipo
  habitacionTipoAlertUpdatetitle = '¿Está seguro de actualizar el tipo de habitación?';
  habitacionTipoAlertUpdatetext = 'Este proceso actualizará el tipo de habitación y las habitaciones relacionadas permanentemente. ¿Estás seguro de que deseas proceder?';
  habitacionTipoactualizar = 'El tipo de habitación ha sido actualizado.';

  //Habitacion Estado
  habitacionEstadoAlertUpdatetitle = '¿Está seguro de actualizar el estado de la habitación?';
  habitacionEstadoAlertUpdatetext = 'Este proceso actualizará el estado de la habitación permanentemente. ¿Estás seguro de que deseas proceder?';
  habitacionEstadoactualizar = 'El estado de la habitación ha sido actualizado.';

  //Habitacion Inventario
  habitacionInventarioAlertUpdatetitle = '¿Está seguro de actualizar el inventario de la habitación?';
  habitacionInventarioAlertUpdatetext = 'Este proceso actualizará el inventario de la habitación permanentemente. ¿Estás seguro de que deseas proceder?';
  habitacionInventarioactualizar = 'El inventario de la habitación ha sido actualizado.';

  //Factura
  facturaAlertUpdatetitle = '¿Está seguro de actualizar la factura?';
  facturaAlertUpdatetext = '¡Atención! Este proceso actualizará la factura y sus detalles permanentemente. ¿Estás seguro de que deseas proceder?';
  facturaactualizar = 'La factura ha sido actualizada.';

  //Detalle Factura
  detallesFacturaAlertUpdatetitle = '¿Está seguro de actualizar el detalle de la factura?';
  detallesFacturaAlertUpdatetext = '¡Atención! Este proceso actualizará detalle de la factura permanentemente. ¿Estás seguro de que deseas proceder?';
  detallesFacturaactualizar = 'El detalle de la factura ha sido actualizado.';

  //Metodo Factura
  metodoPagofacturaAlertUpdatetitle = '¿Está seguro de actualizar el método de pago?';
  metodoPagofacturaAlertUpdatetext = '¡Atención! Este proceso actualizará el método de pago permanentemente. ¿Estás seguro de que deseas proceder?';
  metodoPagofacturaactualizar = 'El método de pago ha sido actualizado.';

  // ---------------------------------------------------------- VARIABLES PARA ELIMINAR ---------------------------------------------------------------------------------------
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
    private serviceService: ServiceService,
    private router: Router,

  ) { }



  alertDrop(title: string, text: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5eb319",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Sí, Borralo!"
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  alertUpdate(title: string, text: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5eb319",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Sí, Actualiza!"
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

  //---------------------------------- METODOS PARA ACTUALIZAR -----------------------------------------------

  actualizarTipoServicio(TypeServiceId: number, formulario: any): void {
    this.alertUpdate(this.tipoServicioAlertUpdatetitle, this.tipoServicioAlertUpdatetext).then((confirmed) => {
        if (confirmed) {
            this.serviceService.putTypeService(TypeServiceId, formulario).subscribe(() => {
                Swal.fire({
                    title: '¡Actualizado!',
                    text: this.tipoServicioactualizar,
                    icon: 'success',
                    confirmButtonColor: '#5eb319',
                }).then(() => {
                    this.router.navigate(['/lista-tiposervicios']);
                });
            }, (error: HttpErrorResponse) => {
                if (error.status === 400) {
                    console.error('Error interno del servidor:', error.message);
                    // Muestra un mensaje al usuario informándole sobre el error interno del servidor
                    Swal.fire({
                        title: 'Error',
                        text: 'Cambie el nombre del tipo de servicio e inténtalo de nuevo.',
                        icon: 'error',
                        confirmButtonColor: '#d33',
                    });
                } else {
                    console.error('Error desconocido:', error);
                    // Puedes manejar otros códigos de estado HTTP si es necesario
                }
            });
        }
    });
}

  actualizarServicio(serviceId: number, formulario: any): void {
    this.alertUpdate(this.servicioAlertUpdatetitle, this.servicioAlertUpdatetext).then((confirmed) => {
      if (confirmed) {
        this.serviceService.putService(serviceId, formulario).subscribe(() => {
          Swal.fire({
            title: '¡Actualizado!',
            text: this.servicioactualizar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            this.router.navigate(['/lista-servicios']);
          });
        },
          (error: HttpErrorResponse) => {
            if (error.status === 500) {
              console.error('Error interno del servidor:', error.message);
              // Muestra un mensaje al usuario informándole sobre el error interno del servidor
              Swal.fire({
                title: 'Error',
                text: 'Este servicio o producto está siendo utilizado en uno o más detalles de facturas. Por favor, elimine el servicio o producto de los detalles de factura asociados antes de intentar actualizarlo nuevamente.',
                icon: 'error',
                confirmButtonColor: '#d33',
              });
            } else {
              console.error('Error desconocido:', error);
              // Puedes manejar otros códigos de estado HTTP si es necesario
            }
          });
      }
    });
  }



  actualizarReserva(reservaId: number, formulario: any): void {
    this.alertUpdate(this.ReservaAlertUpdatetitle, this.ReservaAlertUpdatetext).then((confirmed) => {
      if (confirmed) {
        this.reservationService.putReserva(reservaId, formulario).subscribe(() => {
          Swal.fire({
            title: '¡Actualizado!',
            text: this.Reservaactualizar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            this.router.navigate(['/lista-reservas'])
          });
        });
      }
    });
  }

  actualizarHabitacionReserva(roomXreserId: number, formulario: any, nroReserva: number): void {
    this.alertUpdate(this.habitacionReservaAlertUpdatetitle, this.habitacionReservaAlertUpdatetext).then((confirmed) => {
      if (confirmed) {
        this.reservationService.putReservationXRoom(roomXreserId, formulario).subscribe(() => {
          Swal.fire({
            title: '¡Actualizado!',
            text: this.habitacionReservaactualizar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            this.router.navigate(['/lista-habitacion-reserva', nroReserva]);
          });
        });
      }
    });
  }


  actualizarHuespedReserva(guestxreserId: number, formulario: any, nroReserva: number): void {
    this.alertUpdate(this.huespedReservaAlertUpdatetitle, this.huespedReservaAlertUpdatetext).then((confirmed) => {
      if (confirmed) {
        this.reservationService.putReservationXGuest(guestxreserId, formulario).subscribe(() => {
          Swal.fire({
            title: '¡Actualizado!',
            text: this.huespedReservaactualizar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            this.router.navigate(['/lista-huesped-reserva', nroReserva]);
          });
        });
      }
    });
  }


  actualizarInventario(inventarioId: number, formulario: any): void {
    this.alertUpdate(this.inventarioaAlertUpdatetitle, this.inventarioaAlertUpdatetext).then((confirmed) => {
      if (confirmed) {
        this.inventoryService.putInventory(inventarioId, formulario).subscribe(() => {
          Swal.fire({
            title: '¡Actualizado!',
            text: this.inventarioaactualizar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            this.router.navigate(['/lista-inventario']);
          });
        });
      }
    });
  }

  actualizarCategoriaInventario(categoryId: number, formulario: any): void {
    this.alertUpdate(this.categoriaaAlertUpdatetitle, this.categoriaaAlertUpdatetext).then((confirmed) => {
      if (confirmed) {
        this.categoryInvService.putInventoryCategory(categoryId, formulario).subscribe(() => {
          Swal.fire({
            title: '¡Actualizado!',
            text: this.categoriaaactualizar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            this.router.navigate(['/lista-categoria-inventario']);
          });
        });
      }
    });
  }

  actualizarHuesped(huespedId: number, formulario: any): void {
    this.alertUpdate(this.huespedAlertUpdatetitle, this.huespedAlertUpdatetext).then((confirmed) => {
      if (confirmed) {
        this.guestService.putGuest(huespedId, formulario).subscribe(
          () => {
            Swal.fire({
              title: '¡Actualizado!',
              text: this.huespedactualizar,
              icon: 'success',
              confirmButtonColor: '#5eb319',
            }).then(() => {
              this.router.navigate(['/lista-huespedes']);
            });
          },
          (error: HttpErrorResponse) => {
            if (error.status === 400 && error.error) {
              const errorMessage = 'Correo ya registrado. Intente con otro.';
              this.alertDenied(errorMessage);
            } else {
              console.error('Error desconocido:', error);
              this.alertDenied('Correo ya registrado. Intente con otro.');
            }
          }
        );
      }
    });
  }


  actualizarUsuario(UserId: number, formulario: any): void {
    this.alertUpdate(this.usuarioAlertUpdatetitle, this.usuarioAlertUpdatetext).then((confirmed) => {
        if (confirmed) {
            this.userService.putUser(UserId, formulario).subscribe(() => {
                Swal.fire({
                    title: '¡Actualizado!',
                    text: this.usuarioactualizar,
                    icon: 'success',
                    confirmButtonColor: '#5eb319',
                }).then(() => {
                    this.router.navigate(['/lista-usuarios']);
                });
            }, (error: HttpErrorResponse) => {
                if (error.status === 400) {
                    console.error('Error interno del servidor:', error.message);
                    // Muestra un mensaje al usuario informándole sobre el error interno del servidor
                    Swal.fire({
                        title: 'Error',
                        text: 'El correo ya está registrado. Ingrese otro e inténtalo de nuevo.',
                        icon: 'error',
                        confirmButtonColor: '#d33',
                    });
                } else {
                    console.error('Error desconocido:', error);
                    // Puedes manejar otros códigos de estado HTTP si es necesario
                    Swal.fire({
                        title: 'Error',
                        text: 'Se produjo un error al actualizar el usuario. Por favor, inténtalo de nuevo más tarde. Si el problema persiste, contacta al soporte técnico para obtener asistencia adicional.',
                        icon: 'error',
                        confirmButtonColor: '#d33',
                    });
                }
            });
        }
    });
}


  actualizarHabitacion(roomId: number, formulario: any): void {
    this.alertUpdate(this.habitacionAlertUpdatetitle, this.habitacionAlertUpdatetext).then((confirmed) => {
      if (confirmed) {
        this.roomService.putRoom(roomId, formulario).subscribe(() => {
          Swal.fire({
            title: '¡Actualizado!',
            text: this.habitacionactualizar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            this.router.navigate(['/lista-habitaciones']);
          });
        });
      }
    });
  }

  actualizarHabitacionTipo(TypeRoomId: number, formulario: any): void {
    this.alertUpdate(this.habitacionTipoAlertUpdatetitle, this.habitacionTipoAlertUpdatetext).then((confirmed) => {
      if (confirmed) {
        this.roomService.putTypeRoom(TypeRoomId, formulario).subscribe(() => {
          Swal.fire({
            title: '¡Actualizado!',
            text: this.habitacionTipoactualizar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            this.router.navigate(['/lista-tipohabitaciones']);
          });
        });
      }
    });
  }

  actualizarHabitacionEstado(StatusRoomId: number, formulario: any): void {
    this.alertUpdate(this.habitacionEstadoAlertUpdatetitle, this.habitacionEstadoAlertUpdatetext).then((confirmed) => {
      if (confirmed) {
        this.roomService.putStatusRoom(StatusRoomId, formulario).subscribe(() => {
          Swal.fire({
            title: '¡Actualizado!',
            text: this.habitacionEstadoactualizar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            this.router.navigate(['/lista-estadohabitaciones'])
          });
        });
      }
    });
  }

  actualizarInventarioHabitacion(roomxinventoryId: number, formulario: any, nroHabitacion: number): void {
    this.alertUpdate(this.habitacionInventarioAlertUpdatetitle, this.habitacionInventarioAlertUpdatetext).then((confirmed) => {
      if (confirmed) {
        this.roomService.putRoomInventory(roomxinventoryId, formulario).subscribe(() => {
          Swal.fire({
            title: '¡Actualizado!',
            text: this.habitacionInventarioactualizar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            this.router.navigate(['/lista-habitacion-inventario', nroHabitacion]);
          });
        });
      }
    });
  }

  actualizarFactura(invoiceId: number, formulario: any): void {
    this.alertUpdate(this.facturaAlertUpdatetitle, this.facturaAlertUpdatetext).then((confirmed) => {
      if (confirmed) {
        this.invoiceService.putInvoice(invoiceId, formulario).subscribe(() => {
          Swal.fire({
            title: '¡Actualizado!',
            text: this.facturaactualizar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            this.router.navigate(['/lista-facturas']);
          });
        });
      }
    });
  }

  actualizarDetalleFactura(invDetId: number, formulario: any, nroFactura: number): void {
    this.alertUpdate(this.detallesFacturaAlertUpdatetitle, this.detallesFacturaAlertUpdatetext).then((confirmed) => {
      if (confirmed) {
        this.invoiceDetailsService.putInvoiceDetail(invDetId, formulario).subscribe(() => {
          Swal.fire({
            title: '¡Actualizado!',
            text: this.detallesFacturaactualizar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            this.router.navigate(['/lista-detalles-facturas/', nroFactura]);
          });
        });
      }
    });
  }

  actualizarMetodoPagoFactura(invMetId: number, formulario: any, nroFactura: number): void {
    this.alertUpdate(this.metodoPagofacturaAlertUpdatetitle, this.metodoPagofacturaAlertUpdatetext).then((confirmed) => {
      if (confirmed) {
        this.invoiceService.putInvoiceMethod(invMetId, formulario).subscribe(() => {
          Swal.fire({
            title: '¡Actualizado!',
            text: this.metodoPagofacturaactualizar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            this.router.navigate(['/lista-metodos-facturas/', nroFactura]);
          });
        });
      }
    });
  }

  //---------------------------------- METODOS PARA ELIMINAR -----------------------------------------------

  eliminarTipoServicio(TypeServiceId: number): void {
    this.alertDrop(this.tipoServicioAlertDroptitle, this.tipoServicioAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.serviceService.deleteTypeService(TypeServiceId).subscribe(() => {
          Swal.fire({
            title: '¡Eliminado!',
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
            title: '¡Eliminado!',
            text: this.servicioeliminar,
            icon: 'success',
            confirmButtonColor: '#5eb319',
          }).then(() => {
            window.location.reload();
          });
        },
          (error: HttpErrorResponse) => {
            if (error.status === 500) {
              console.error('Error interno del servidor:', error.message);
              // Muestra un mensaje al usuario informándole sobre el error interno del servidor
              Swal.fire({
                title: 'Error',
                text: 'Este servicio o producto está siendo utilizado en uno o más detalles de facturas. Por favor, elimine el servicio o producto de los detalles de factura asociados antes de intentar eliminarlo nuevamente.',
                icon: 'error',
                confirmButtonColor: '#d33',
              });
            } else {
              console.error('Error desconocido:', error);
              // Puedes manejar otros códigos de estado HTTP si es necesario
            }
          });
      }
    });
  }



  eliminarReserva(reservaId: number): void {
    this.alertDrop(this.ReservaAlertDroptitle, this.ReservaAlertDroptext).then((confirmed) => {
      if (confirmed) {
        this.reservationService.deleteReserva(reservaId).subscribe(() => {
          Swal.fire({
            title: '¡Eliminado!',
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
            title: '¡Eliminado!',
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
            title: '¡Eliminado!',
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
            title: '¡Eliminado!',
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
            title: '¡Eliminado!',
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
            title: '¡Eliminado!',
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
            title: '¡Eliminado!',
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
            title: '¡Eliminada!',
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
            title: '¡Eliminada!',
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
            title: '¡Eliminada!',
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
            title: '¡Eliminada!',
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
            title: '¡Eliminada!',
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
            title: '¡Eliminado!',
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
            title: '¡Eliminado!',
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
