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
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
