import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private urlApi = 'http://127.0.0.1:8000/reservation/reserva/';

  constructor(private http: HttpClient) { }

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


}
