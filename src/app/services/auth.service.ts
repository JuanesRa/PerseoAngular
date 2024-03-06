import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlApi = 'http://127.0.0.1:8000/usuarios'
  private authTokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/login`, credentials).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error de inicio de sesión';

        if (error.status === 400 && error.error && error.error.detail) {
          errorMessage = error.error.detail;
        } else if (error.status === 401 && error.error && error.error.detail) {
          errorMessage = error.error.detail;
        } else if (error.status === 403 && error.error && error.error.detail) {
          errorMessage = error.error.detail;
        }
        alert(errorMessage); // Mostrar el mensaje de error
        return throwError(() => errorMessage)
      })
    );
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
        this.clearAuthData();
      })
    );
  }

  saveAuthToken(token: string, userId: string, userRolId: string): void {
    localStorage.setItem(this.authTokenKey, token);
    localStorage.setItem('Doc', userId);
    localStorage.setItem('Rol', userRolId)
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  getAuthId(): string | null {
    return localStorage.getItem('Doc');
  }

  getRolId(): string | null {
    return localStorage.getItem('Rol');
  }

  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }

  clearAuthData(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem('Doc');
    localStorage.removeItem('Rol');
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
