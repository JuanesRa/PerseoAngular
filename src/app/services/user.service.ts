import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlApi = 'http://127.0.0.1:8000/usuarios/usuarios/';
  private urlApiTipoDocumento = 'http://127.0.0.1:8000/usuarios/tipodoc/'
  private urlApiTiposUsuario = 'http://127.0.0.1:8000/usuarios/tipousuario/'
  private urlApiEstadoUsuario = 'http://127.0.0.1:8000/usuarios/estadousuario/'

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

  // Tipo documento

  public getTipoDocumento(): Observable<any> {
    return this.http.get(this.urlApiTipoDocumento)
  }

  public getTipoDocumentoById(tipoDocId: number): Observable<any> {
    const url = `${this.urlApiTipoDocumento}${tipoDocId}/`;
    return this.http.get(url)
  }

  // Tipo Usuario

  public getTipoUsuarios(): Observable<any> {
    return this.http.get(this.urlApiTiposUsuario)
  }

  public getTipoUsuariosById(tipoUsu: number): Observable<any> {
    const url = `${this.urlApiTiposUsuario}${tipoUsu}/`;
    return this.http.get(this.urlApiTiposUsuario)
  }

  // Estado Usuario

  public getEstadoUsuarios(): Observable<any> {
    return this.http.get(this.urlApiEstadoUsuario)
  }
}
