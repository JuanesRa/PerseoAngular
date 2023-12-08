import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailsService {

  private urlApi = 'http://127.0.0.1:8000/invoice/detallesfac/'

  constructor(private http: HttpClient) { }

  public getInvoiceDetails(): Observable<any> {
    return this.http.get(this.urlApi)
  }

  public postInvoiceDetail(invDet: any): Observable<any> {
    return this.http.post(this.urlApi, invDet)
  }

  public getInvoiceDetailById(invDetId: number): Observable<any> {
    const url = `${this.urlApi}${invDetId}/`;
    return this.http.get(url)
  }

  public putInvoiceDetail(invDetId: number, updatedInvDetData: any): Observable<any> {
    const url = `${this.urlApi}${invDetId}/`;
    return this.http.put<any>(url, updatedInvDetData)
  }

  public deleteInvoiceDetail(invDetId: number): Observable<any> {
    const url = `${this.urlApi}${invDetId}/`;
    return this.http.delete(url)
  }
}
