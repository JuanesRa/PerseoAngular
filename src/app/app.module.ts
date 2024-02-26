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
import { GuestInsertComponent } from './guest-insert/guest-insert.component';
import { GuestSelectComponent } from './guest-select/guest-select.component';
import { GuestUpdateComponent } from './guest-update/guest-update.component';
import { InvoiceDetailsInsertComponent } from './invoice-details-insert/invoice-details-insert.component';
import { InvoiceDetailsSelectComponent } from './invoice-details-select/invoice-details-select.component';
import { InvoiceDetailsUpdateComponent } from './invoice-details-update/invoice-details-update.component';
import { InvoiceSelectComponent } from './invoice-select/invoice-select.component';
import { InvoiceInsertComponent } from './invoice-insert/invoice-insert.component';
import { InvoiceUpdateComponent } from './invoice-update/invoice-update.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

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
    GuestInsertComponent,
    GuestSelectComponent,
    GuestUpdateComponent,
    InvoiceDetailsInsertComponent,
    InvoiceDetailsSelectComponent,
    InvoiceDetailsUpdateComponent,
    InvoiceSelectComponent,
    InvoiceInsertComponent,
    InvoiceUpdateComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
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
