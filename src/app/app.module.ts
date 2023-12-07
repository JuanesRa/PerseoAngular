import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UserSelectComponent } from './user-select/user-select.component';
import { UserInsertComponent } from './user-insert/user-insert.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { RoomInsertComponent } from './room-insert/room-insert.component';
import { RoomSelectComponent } from './room-select/room-select.component';
import { RoomUpdateComponent } from './room-update/room-update.component';
import { ReservationInsertComponent } from './reservation-insert/reservation-insert.component';
import { ReservationSelectComponent } from './reservation-select/reservation-select.component';
import { ReservationUpdateComponent } from './reservation-update/reservation-update.component';
import { InventorySelectComponent } from './inventory-select/inventory-select.component';
import { InventoryInsertComponent } from './inventory-insert/inventory-insert.component';
import { InventoryUpdateComponent } from './inventory-update/inventory-update.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    UserSelectComponent,
    UserInsertComponent,
    UserUpdateComponent,
    RoomInsertComponent,
    RoomSelectComponent,
    RoomUpdateComponent,
    ReservationInsertComponent,
    ReservationSelectComponent,
    ReservationUpdateComponent,
    InventorySelectComponent,
    InventoryInsertComponent,
    InventoryUpdateComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
