import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private urlApi = 'http://127.0.0.1:8000/inventory/inventario/';

  constructor(private http: HttpClient) { }

  public getInventory(): Observable<any> {
    return this.http.get(this.urlApi)
  }

  public postInventory(inventory: any): Observable<any> {
    return this.http.post(this.urlApi, inventory)
  }

  public getInventoryById(inventoryId: number): Observable<any> {
    const url = `${this.urlApi}${inventoryId}/`;
    return this.http.get(url);
  }

  public putInventory(inventoryId: number, updatedInventoryData: any): Observable<any> {
    const url = `${this.urlApi}${inventoryId}/`;
    return this.http.put<any>(url, updatedInventoryData)
  }

  public deleteInventory(inventoryId: number): Observable<any> { 
    const url = `${this.urlApi}${inventoryId}/`;
    return this.http.delete(url)
  }
}
