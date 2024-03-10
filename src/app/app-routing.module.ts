import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSelectComponent } from './user-select/user-select.component';
import { UserInsertComponent } from './user-insert/user-insert.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { RoomSelectComponent } from './room-select/room-select.component';
import { RoomSelectClientComponent } from './room-select-client/room-select-client.component';
import { RoomInsertComponent } from './room-insert/room-insert.component';
import { RoomUpdateComponent } from './room-update/room-update.component';
import { ReservationSelectComponent } from './reservation-select/reservation-select.component';
import { ReservationInsertComponent } from './reservation-insert/reservation-insert.component';
import { ReservationUpdateComponent } from './reservation-update/reservation-update.component';
import { InventorySelectComponent } from './inventory-select/inventory-select.component';
import { InventoryInsertComponent } from './inventory-insert/inventory-insert.component';
import { InventoryUpdateComponent } from './inventory-update/inventory-update.component';
import { GuestSelectComponent } from './guest-select/guest-select.component';
import { GuestInsertComponent } from './guest-insert/guest-insert.component';
import { GuestUpdateComponent } from './guest-update/guest-update.component';
import { InvoiceDetailsSelectComponent } from './invoice-details-select/invoice-details-select.component';
import { InvoiceDetailsInsertComponent } from './invoice-details-insert/invoice-details-insert.component';
import { InvoiceDetailsUpdateComponent } from './invoice-details-update/invoice-details-update.component';
import { InvoiceSelectComponent } from './invoice-select/invoice-select.component';
import { InvoiceInsertComponent } from './invoice-insert/invoice-insert.component';
import { InvoiceUpdateComponent } from './invoice-update/invoice-update.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { TypeRoomSelectComponent } from './room-type-select/type-room-select.component';
import { TyperoomUpdateComponent } from './room-type-update/typeroom-update.component';
import { TyperoomInsertComponent } from './room-type-insert/typeroom-insert.component';
import { StatusroomSelectComponent } from './room-status-select/statusroom-select.component';
import { RoomStatusInsertComponent } from './room-status-insert/room-status-insert.component';
import { RoomStatusUpdateComponent } from './room-status-update/room-status-update.component';
import { ServiceSelectComponent } from './service-select/service-select.component';
import { ServiceInsertComponent } from './service-insert/service-insert.component';
import { ServiceUpdateComponent } from './service-update/service-update.component';
import { ServiceTypeSelectComponent } from './service-type-select/service-type-select.component';
import { ServiceTypeInsertComponent } from './service-type-insert/service-type-insert.component';
import { ServiceTypeUpdateComponent } from './service-type-update/service-type-update.component';
import { InventoryCategorySelectComponent } from './inventory-category-select/inventory-category-select.component';
import { InventoryCategoryInsertComponent } from './inventory-category-insert/inventory-category-insert.component';
import { InventoryCategoryUpdateComponent } from './inventory-category-update/inventory-category-update.component';
import { RoomInventorySelectComponent } from './room-inventory-select/room-inventory-select.component';
import { RoomInventoryInsertComponent } from './room-inventory-insert/room-inventory-insert.component';
import { RoomInventoryUpdateComponent } from './room-inventory-update/room-inventory-update.component';
import { ReservationGuestSelectComponent } from './reservation-guest-select/reservation-guest-select.component';
import { ReservationGuestInsertComponent } from './reservation-guest-insert/reservation-guest-insert.component';
import { ReservationGuestUpdateComponent } from './reservation-guest-update/reservation-guest-update.component';
import { ReservationRoomSelectComponent } from './reservation-room-select/reservation-room-select.component';
import { ReservationRoomInsertComponent } from './reservation-room-insert/reservation-room-insert.component';
import { ReservationRoomUpdateComponent } from './reservation-room-update/reservation-room-update.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},
  {path: 'registro', component: SignupComponent},
  {path: 'login', component: LoginComponent},

  // USUARIOS
  {path: 'lista-usuarios', component: UserSelectComponent},
  {path: 'insertar-usuario', component: UserInsertComponent},
  {path: 'actualizar-usuario/:id', component: UserUpdateComponent},

  // HABITACIONES
  {path: 'lista-habitaciones', component: RoomSelectComponent},
  {path: 'habitaciones', component: RoomSelectClientComponent},
  {path: 'lista-habitaciones/:id', component: RoomSelectComponent},
  {path: 'insertar-habitacion', component: RoomInsertComponent},
  {path: 'actualizar-habitacion/:id', component: RoomUpdateComponent},

  // TIPO HABITACION
  {path: 'lista-tipohabitaciones', component: TypeRoomSelectComponent},
  {path: 'actualizar-tipohabitaciones/:id', component: TyperoomUpdateComponent},
  {path: 'insertar-tipo-habitacion', component: TyperoomInsertComponent},

  // ESTADO HABITACION
  {path: 'lista-estadohabitaciones', component: StatusroomSelectComponent},
  {path: 'insertar-estado-habitacion', component: RoomStatusInsertComponent},
  {path: 'actualizar-estado/:id', component: RoomStatusUpdateComponent},

  // HABITACION X INVENTARIO
  {path: 'lista-habitacion-inventario/:id', component: RoomInventorySelectComponent},
  {path: 'insertar-habitacion-inventario/:id', component: RoomInventoryInsertComponent},
  {path: 'actualizar-habitacion-inventario/:id', component: RoomInventoryUpdateComponent},

  // HABITACION X RESERVA
  {path: 'lista-habitacion-reserva/:id', component: ReservationRoomSelectComponent},
  {path: 'insertar-habitacion-reserva/:id', component: ReservationRoomInsertComponent},
  {path: 'actualizar-habitacion-reserva/:id', component: ReservationRoomUpdateComponent},

  // TIPO SERVICIOS
  {path: 'lista-tiposervicios', component: ServiceTypeSelectComponent},
  {path: 'insertar-tiposervicio', component: ServiceTypeInsertComponent},
  {path: 'actualizar-tiposervicio/:id', component: ServiceTypeUpdateComponent},

  // SERVICIOS
  {path: 'lista-servicios', component: ServiceSelectComponent},
  {path: 'insertar-servicio', component: ServiceInsertComponent},
  {path: 'actualizar-servicio/:id', component: ServiceUpdateComponent},

  // RESERVAS
  {path: 'lista-reservas', component: ReservationSelectComponent},
  {path: 'insertar-reserva/:id', component: ReservationInsertComponent, canActivate: [AuthGuardService]},
  {path: 'actualizar-reserva/:id', component: ReservationUpdateComponent},

  // INVENTARIO
  {path: 'lista-inventario', component: InventorySelectComponent},
  {path: 'insertar-inventario', component: InventoryInsertComponent},
  {path: 'actualizar-inventario/:id', component: InventoryUpdateComponent},

  //CATEGORIA INVENTARIO
  {path: 'lista-categoria-inventario', component: InventoryCategorySelectComponent},
  {path: 'insertar-categoria-inventario', component: InventoryCategoryInsertComponent},
  {path: 'actualizar-categoria-inventario/:id', component: InventoryCategoryUpdateComponent},

  // HUESPED
  {path: 'lista-huespedes', component: GuestSelectComponent},
  {path: 'insertar-huesped', component: GuestInsertComponent},
  {path: 'actualizar-huesped/:id', component: GuestUpdateComponent},


  // HUESPED X RESERVA
  {path: 'lista-huesped-reserva/:id', component: ReservationGuestSelectComponent},
  {path: 'insertar-huesped-reserva/:id', component: ReservationGuestInsertComponent},
  {path: 'actualizar-huesped-reserva/:id', component: ReservationGuestUpdateComponent},


  // DETALLES FACTURA
  {path: 'lista-detalles-facturas', component: InvoiceDetailsSelectComponent},
  {path: 'insertar-detalle-factura', component: InvoiceDetailsInsertComponent},
  {path: 'actualizar-detalle-factura/:id', component: InvoiceDetailsUpdateComponent},

  // FACTURA
  {path: 'lista-facturas', component: InvoiceSelectComponent},
  {path: 'insertar-factura', component: InvoiceInsertComponent},
  {path: 'actualizar-factura/:id', component: InvoiceUpdateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
