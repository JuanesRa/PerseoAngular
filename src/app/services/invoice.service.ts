import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private urlApi = 'http://127.0.0.1:8000/invoice/factura/'

  constructor(private http: HttpClient) { }

  public getInvoice(): Observable<any> {
    return this.http.get(this.urlApi)
  }

  public postInvoice(invoice: any): Observable<any> {
    return this.http.post(this.urlApi, invoice)
  }

  public getInvoiceById(invoiceId: number): Observable<any> {
    const url = `${this.urlApi}${invoiceId}/`;
    return this.http.get(url)
  }

  public putInvoice(invoiceId: number, updatedInvoiceData: any): Observable<any> {
    const url = `${this.urlApi}${invoiceId}/`;
    return this.http.put<any>(url, updatedInvoiceData)
  }

  public deleteInvoice(invoiceId: number): Observable<any> {
    const url = `${this.urlApi}${invoiceId}/`;
    return this.http.delete(url)
  }
}
