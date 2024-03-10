import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

private urlApi = 'http://127.0.0.1:8000/room/habitacion/';
private urlApiStatusRoom = 'http://127.0.0.1:8000/room/estadohab/';
private urlApiTypeRoom = 'http://127.0.0.1:8000/room/tipohab/';
private urlApiRoomInventory= 'http://127.0.0.1:8000/room/inventariohab/';


  constructor(private http: HttpClient) { }

  //HABITACION
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

  public patchRoom(roomId: number, updatedRoomData: any):Observable<any> {
    const url = `${this.urlApi}${roomId}/`;
    return this.http.patch<any>(url, updatedRoomData)
  }

  public deleteRoom(roomId: number): Observable<any> {
    const url = `${this.urlApi}${roomId}/`;
    return this.http.delete<any>(url);
  }

  // ESTADO HABITACION

  public getStatusRoom(): Observable<any> {
    return this.http.get(this.urlApiStatusRoom)
  }

  public postStatusRoom(Statusroom: any):Observable<any> {
      return this.http.post(this.urlApiStatusRoom, Statusroom)
  }

  public getStatusRoomById(statusroomId: number): Observable<any> {
    const url = `${this.urlApiStatusRoom}${statusroomId}/`;
    return this.http.get(url);
  }


  public putStatusRoom(roomId: number, updatedStatusRoomData: any):Observable<any> {
    const url = `${this.urlApiStatusRoom}${roomId}/`;
    return this.http.put<any>(url, updatedStatusRoomData)
  }

  public deleteStatusRoom(roomId: number): Observable<any> {
    const url = `${this.urlApiStatusRoom}${roomId}/`;
    return this.http.delete<any>(url);
  }


  // TIPO HABITACION
  public getTypeRoom(): Observable<any> {
    return this.http.get(this.urlApiTypeRoom)
  }

  public postTypeRoom(typeroom: any):Observable<any> {
    return this.http.post(this.urlApiTypeRoom, typeroom)
  }

  public getTypeRoomById(typeroomId: number): Observable<any> {
    const url = `${this.urlApiTypeRoom}${typeroomId}/`;
    return this.http.get(url);
  }

  public putTypeRoom(TyperoomId: number, updatedTypeRoomData: any):Observable<any> {
    const url = `${this.urlApiTypeRoom}${TyperoomId}/`;
    return this.http.patch<any>(url, updatedTypeRoomData)
  }
  public deleteTypeRoom(roomId: number): Observable<any> {
    const url = `${this.urlApiTypeRoom}${roomId}/`;
    return this.http.delete<any>(url);
  }


  // HABITACION X INVENTARIO
  public getRoomInventory(): Observable<any> {
    return this.http.get(this.urlApiRoomInventory)
  }

  public postRoomInventory(roomxinventory: any):Observable<any> {
    return this.http.post(this.urlApiRoomInventory, roomxinventory)
  }

  public getRoomInventoryById(roomxinventoryId: number): Observable<any> {
    const url = `${this.urlApiRoomInventory}${roomxinventoryId}/`;
    return this.http.get(url);
  }

  public putRoomInventory(roomxinventoryId: number, updatedRoomInventory: any):Observable<any> {
    const url = `${this.urlApiRoomInventory}${roomxinventoryId}/`;
    return this.http.patch<any>(url, updatedRoomInventory)
  }
  public deleteRoomInventory(roomxinventoryId: number): Observable<any> {
    const url = `${this.urlApiRoomInventory}${roomxinventoryId}/`;
    return this.http.delete<any>(url);
  }

}
