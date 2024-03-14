import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { RoomSelectClientComponent } from './room-select-client/room-select-client.component';
import { TypeRoomSelectComponent } from './room-type-select/type-room-select.component';
import { TyperoomUpdateComponent } from './room-type-update/typeroom-update.component';
import { TyperoomInsertComponent } from './room-type-insert/typeroom-insert.component';
import { StatusroomSelectComponent } from './room-status-select/statusroom-select.component';
import { RoomStatusInsertComponent } from './room-status-insert/room-status-insert.component';
import { RoomStatusUpdateComponent } from './room-status-update/room-status-update.component';
import { ServiceTypeInsertComponent } from './service-type-insert/service-type-insert.component';
import { ServiceTypeSelectComponent } from './service-type-select/service-type-select.component';
import { ServiceTypeUpdateComponent } from './service-type-update/service-type-update.component';
import { ServiceInsertComponent } from './service-insert/service-insert.component';
import { ServiceSelectComponent } from './service-select/service-select.component';
import { ServiceUpdateComponent } from './service-update/service-update.component';
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
import { InvoicePaymentMethodSelectComponent } from './invoice-payment-method-select/invoice-payment-method-select.component';
import { InvoicePaymentMethodInsertComponent } from './invoice-payment-method-insert/invoice-payment-method-insert.component';
import { InvoicePaymentMethodUpdateComponent } from './invoice-payment-method-update/invoice-payment-method-update.component';
import { RoomReservationSelectComponent } from './room-reservation-select/room-reservation-select.component';
import { InvoicePdfComponent } from './invoicePdf/invoicePdf.component';


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
    RoomSelectClientComponent,
    TypeRoomSelectComponent,
    TyperoomUpdateComponent,
    TyperoomInsertComponent,
    StatusroomSelectComponent,
    RoomStatusInsertComponent,
    RoomStatusUpdateComponent,
    ServiceTypeInsertComponent,
    ServiceTypeSelectComponent,
    ServiceTypeUpdateComponent,
    ServiceInsertComponent,
    ServiceSelectComponent,
    ServiceUpdateComponent,
    InventoryCategorySelectComponent,
    InventoryCategoryInsertComponent,
    InventoryCategoryUpdateComponent,
    RoomInventorySelectComponent,
    RoomInventoryInsertComponent,
    RoomInventoryUpdateComponent,
    ReservationGuestSelectComponent,
    ReservationGuestInsertComponent,
    ReservationGuestUpdateComponent,
    ReservationRoomSelectComponent,
    ReservationRoomInsertComponent,
    ReservationRoomUpdateComponent,
    InvoicePaymentMethodSelectComponent,
    InvoicePaymentMethodInsertComponent,
    InvoicePaymentMethodUpdateComponent,
    RoomReservationSelectComponent,
      InvoicePdfComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
