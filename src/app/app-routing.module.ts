import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSelectComponent } from './user-select/user-select.component';
import { UserInsertComponent } from './user-insert/user-insert.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { RoomSelectComponent } from './room-select/room-select.component';
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
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  {path: '', component: AboutUsComponent},
  {path: 'inicio', component: AboutUsComponent},
  {path: 'lista-usuarios', component: UserSelectComponent},
  {path: 'insertar-usuario', component: UserInsertComponent},
  {path: 'actualizar-usuario/:id', component: UserUpdateComponent},
  {path: 'lista-habitaciones', component: RoomSelectComponent},
  {path: 'insertar-habitacion', component: RoomInsertComponent},
  {path: 'actualizar-habitacion/:id', component: RoomUpdateComponent},
  {path: 'lista-reservas', component: ReservationSelectComponent},
  {path: 'insertar-reserva', component: ReservationInsertComponent},
  {path: 'actualizar-reserva/:id', component: ReservationUpdateComponent},
  {path: 'lista-inventario', component: InventorySelectComponent},
  {path: 'insertar-inventario', component: InventoryInsertComponent},
  {path: 'actualizar-inventario/:id', component: InventoryUpdateComponent},
  {path: 'lista-huespedes', component: GuestSelectComponent},
  {path: 'insertar-huesped', component: GuestInsertComponent},
  {path: 'actualizar-huesped/:id', component: GuestUpdateComponent},
  {path: 'lista-detalles-facturas', component: InvoiceDetailsSelectComponent},
  {path: 'insertar-detalle-factura', component: InvoiceDetailsInsertComponent},
  {path: 'actualizar-detalle-factura/:id', component: InvoiceDetailsUpdateComponent},
  {path: 'lista-facturas', component: InvoiceSelectComponent},
  {path: 'insertar-factura', component: InvoiceInsertComponent},
  {path: 'actualizar-factura/:id', component: InvoiceUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
