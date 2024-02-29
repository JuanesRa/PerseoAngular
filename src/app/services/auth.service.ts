import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlApi = 'http://127.0.0.1:8000/usuarios'
  private authTokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  login(user: any): Observable<any> {
    return this.http.post(`${this.urlApi}/login`, user);
  }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.urlApi}/signup`, user);
  }

  test(data: any): Observable<any> {
    return this.http.get(`${this.urlApi}/test-view`, data);
  }

  logout(): Observable<any> {
    const token = this.getAuthToken();

    const headers = new HttpHeaders();
    const headersWithToken = this.attachToken(headers);

    // Eliminar el token del servidor
    return this.http.get(`${this.urlApi}/logout`, { headers: headersWithToken }).pipe(
      catchError(error => {
        console.error('Error al intentar cerrar sesión:', error);
        return throwError(() => error);
      }),
      // Realizar la limpieza del token almacenado en el cliente (localStorage)
      finalize(() => {
        localStorage.removeItem(this.authTokenKey);
      })
    );
  }

  saveAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  // Método para adjuntar el token a las solicitudes
  attachToken(headers: HttpHeaders): HttpHeaders {
    const authToken = this.getAuthToken();
    if (authToken) {
      return headers.set('Authorization', `Token ${authToken}`);
    }
    return headers;
  }

}
