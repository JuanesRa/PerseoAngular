import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private urlApi = 'http://127.0.0.1:8000/reservation/reserva/';
  private urlApiStatusReservation = 'http://127.0.0.1:8000/reservation/estadoreserva/';
  private urlApiReservationXGuest = 'http://127.0.0.1:8000/reservation/huexres/';
  private urlApiReservationXRoom = 'http://127.0.0.1:8000/reservation/habxres/';

  constructor(private http: HttpClient) { }

  //RESERVA
  public getReservas(): Observable<any> {
    return this.http.get(this.urlApi);
  }

  public postReservas(reserva: any): Observable<any> {
    return this.http.post(this.urlApi, reserva);
  }

  public getReservaById(reservaId: number): Observable<any> {
    const url = `${this.urlApi}${reservaId}/`;
    return this.http.get(url)
  }

  public putReserva(reservaId: number, updatedReservaData: any): Observable<any> {
    const url = `${this.urlApi}${reservaId}/`;
    return this.http.put<any>(url, updatedReservaData);
  }

  public deleteReserva(reservaId: number): Observable<any> {
    const url = `${this.urlApi}${reservaId}/`;
    return this.http.delete(url);
  }

  //Estado reserva
  public getStatusReservationById(statusreservationId: number): Observable<any> {
    const url = `${this.urlApiStatusReservation}${statusreservationId}/`;
    return this.http.get(url);
  }


  //RESERVA X HUESPED
  public getReservationXGuest(): Observable<any> {
    return this.http.get(this.urlApiReservationXGuest);
  }

  public postReservationXGuest(ReservationXGuestId: any): Observable<any> {
    return this.http.post(this.urlApiReservationXGuest, ReservationXGuestId);
  }

  public getReservationXGuestById(ReservationXGuestId: number): Observable<any> {
    const url = `${this.urlApiReservationXGuest}${ReservationXGuestId}/`;
    return this.http.get(url)
  }

  public putReservationXGuest(ReservationXGuestId: number, updatedReservaData: any): Observable<any> {
    const url = `${this.urlApiReservationXGuest}${ReservationXGuestId}/`;
    return this.http.put<any>(url, updatedReservaData);
  }

  public deleteReservationXGuest(ReservationXGuestId: number): Observable<any> {
    const url = `${this.urlApiReservationXGuest}${ReservationXGuestId}/`;
    return this.http.delete(url);
  }

   //RESERVA X HABITACION
   public getReservationXRoom(): Observable<any> {
    return this.http.get(this.urlApiReservationXRoom);
  }

  public postReservationXRoom(ReservationXRoomtId: any): Observable<any> {
    return this.http.post(this.urlApiReservationXRoom, ReservationXRoomtId);
  }

  public getReservationXRoomById(ReservationXRoomtId: number): Observable<any> {
    const url = `${this.urlApiReservationXRoom}${ReservationXRoomtId}/`;
    return this.http.get(url)
  }

  public putReservationXRoom(ReservationXRoomtId: number, updatedReservaData: any): Observable<any> {
    const url = `${this.urlApiReservationXRoom}${ReservationXRoomtId}/`;
    return this.http.put<any>(url, updatedReservaData);
  }

  public deleteReservationXRoom(ReservationXRoomtId: number): Observable<any> {
    const url = `${this.urlApiReservationXRoom}${ReservationXRoomtId}/`;
    return this.http.delete(url);
  }

 

}
