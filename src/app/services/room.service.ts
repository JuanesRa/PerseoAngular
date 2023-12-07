import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private urlApi = 'http://127.0.0.1:8000/room/habitacion/';

  constructor(private http: HttpClient) { }

  public getRooms(): Observable<any> {
    return this.http.get(this.urlApi)
  }

  public postRoom(room: any):Observable<any> {
    return this.http.post(this.urlApi, room)
  }
  
  public getRoomById(roomId: number): Observable<any> {
    const url = `${this.urlApi}${roomId}/`;
    return this.http.get(url);
  }

  public putRoom(roomId: number, updatedRoomData: any):Observable<any> {
    const url = `${this.urlApi}${roomId}/`;
    return this.http.put<any>(url, updatedRoomData)
  }
  
  public deleteRoom(roomId: number): Observable<any> {
    const url = `${this.urlApi}${roomId}/`;
    return this.http.delete<any>(url);
  }

}
