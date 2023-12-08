import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private urlApi = 'http://127.0.0.1:8000/guest/huesped/'

  constructor(private http: HttpClient) { }

  public getGuests(): Observable<any> {
    return this.http.get(this.urlApi)
  }

  public postGuest(guest: any): Observable<any> {
    return this.http.post(this.urlApi, guest)
  }

  public getGuestById(guestId: number): Observable<any> {
    const url = `${this.urlApi}${guestId}/`;
    return this.http.get(url)
  }

  public putGuest(guestId: number, updatedGuestData: any): Observable<any> {
    const url = `${this.urlApi}${guestId}/`;
    return this.http.put<any>(url, updatedGuestData)
  }

  public deleteGuest(guestId: number): Observable<any> {
    const url = `${this.urlApi}${guestId}/`;
    return this.http.delete(url)
  }
}
