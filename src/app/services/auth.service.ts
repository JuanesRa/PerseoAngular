import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    alert(token)
    if (!token) {
      console.error('No hay token almacenado en el localStorage');
      return throwError(() => 'No hay token almacenado en el localStorage')
    }

    localStorage.removeItem(this.authTokenKey);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.urlApi}/logout`, { headers }).pipe(
      catchError(error => {
        console.error('Error al realizar la solicitud de logout:', error);
        return throwError(() => 'Error al realizar la solicitud de logout')
      })
    );
  }

  saveAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

    // Por ejemplo, un método para adjuntar el token a las solicitudes
    attachToken(headers: HttpHeaders): HttpHeaders {
      const authToken = this.getAuthToken();
      if (authToken) {
        return headers.set('Authorization', `Token ${authToken}`);
      }
      return headers;
    }

}
