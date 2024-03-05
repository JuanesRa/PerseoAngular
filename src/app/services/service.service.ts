import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private urlApiService = 'http://127.0.0.1:8000/service/producto/';
  private urlApiTypeService = 'http://127.0.0.1:8000/service/tiposervicio/';
  
  constructor(private http: HttpClient) { }

  public getServices(): Observable<any> {
    return this.http.get(this.urlApiService);
  }

  public getServiceById(service: number): Observable<any> {
    const url = `${this.urlApiService}${service}/`;
    return this.http.get(url)
  }

  public postService(service: any): Observable<any> {
    return this.http.post(this.urlApiService, service);
  }

  public putService(serviceId: number, updatedServiceData: any): Observable<any> {
    const url = `${this.urlApiService}${serviceId}/`;
    return this.http.put<any>(url,updatedServiceData);
  }

  public deleteService(serviceId: number): Observable<any> {
    const url = `${this.urlApiService}${serviceId}/`;
    return this.http.delete<any>(url);
  }

  // TIPO SERVICIO

  public getTypeService(): Observable<any> {
    return this.http.get(this.urlApiTypeService);
  }

  public getTypeServiceById(service: number): Observable<any> {
    const url = `${this.urlApiTypeService}${service}/`;
    return this.http.get(url)
  }

  public postTypeService(service: any): Observable<any> {
    return this.http.post(this.urlApiTypeService, service);
  }

  public putTypeService(serviceId: number, updatedServiceData: any): Observable<any> {
    const url = `${this.urlApiTypeService}${serviceId}/`;
    return this.http.put<any>(url,updatedServiceData);
  }

  public deleteTypeService(serviceId: number): Observable<any> {
    const url = `${this.urlApiTypeService}${serviceId}/`;
    return this.http.delete<any>(url);
  }
}
  