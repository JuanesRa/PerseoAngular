import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private urlApi = 'http://127.0.0.1:8000/invoice/factura/'
  private urlApiMetodoPagoFactura = 'http://127.0.0.1:8000/invoice/metodosfactura/'
  private urlApiMetodoPago = 'http://127.0.0.1:8000/invoice/metodospago/'

  constructor(private http: HttpClient) { }
  //FACTURA
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

   // METODO PAGO
   public getMethod(): Observable<any> {
    return this.http.get(this.urlApiMetodoPago)
  }

  public postMethod(method: any): Observable<any> {
    return this.http.post(this.urlApiMetodoPago, method)
  }

  public getMethodById(methodId: number): Observable<any> {
    const url = `${this.urlApiMetodoPago}${methodId}/`;
    return this.http.get(url)
  }

  public putMethod(methodId: number, updatedMethodData: any): Observable<any> {
    const url = `${this.urlApiMetodoPago}${methodId}/`;
    return this.http.put<any>(url, updatedMethodData)
  }

  public deleteMethod(methodId: number): Observable<any> {
    const url = `${this.urlApiMetodoPago}${methodId}/`;
    return this.http.delete(url)
  }

   // fACTURA METODO PAGO
   public getInvoiceMethod(): Observable<any> {
    return this.http.get(this.urlApiMetodoPagoFactura)
  }

  public postInvoiceMethod(method: any): Observable<any> {
    return this.http.post(this.urlApiMetodoPagoFactura, method)
  }

  public getInvoiceMethodById(methodId: number): Observable<any> {
    const url = `${this.urlApiMetodoPagoFactura}${methodId}/`;
    return this.http.get(url)
  }

  public putInvoiceMethod(methodId: number, updatedMethodData: any): Observable<any> {
    const url = `${this.urlApiMetodoPagoFactura}${methodId}/`;
    return this.http.put<any>(url, updatedMethodData)
  }

  public deleteInvoiceMethod(methodId: number): Observable<any> {
    const url = `${this.urlApiMetodoPagoFactura}${methodId}/`;
    return this.http.delete(url)
  }



}
