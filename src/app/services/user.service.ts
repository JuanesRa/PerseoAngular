import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlApi = 'http://127.0.0.1:8000/user/usuarios/';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<any> {
    return this.http.get(this.urlApi);
  }

  public postUser(user: any): Observable<any> {
    return this.http.post(this.urlApi, user);
  }

  public getUserById(userId: number): Observable<any> {
    const url = `${this.urlApi}${userId}/`;
    return this.http.get(url);
  }

  public putUser(userId: number, updatedUserData: any): Observable<any> {
    const url = `${this.urlApi}${userId}/`;
    return this.http.put<any>(url, updatedUserData);
  }

  public deleteUser(userId: number): Observable<any> {
    const url = `${this.urlApi}${userId}/`;
    return this.http.delete<any>(url);
  }

}
