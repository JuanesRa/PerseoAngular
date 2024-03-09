import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private urlApi = 'http://127.0.0.1:8000/inventory/inventario/';
  private urlApiInventoryCategory = 'http://127.0.0.1:8000/inventory/categoria/';

  constructor(private http: HttpClient) { }

  //INVENTARIO
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

  //CATEGORIA INVENTARIO
  public getInventoryCategory(): Observable<any> {
    return this.http.get(this.urlApiInventoryCategory)
  }

  public postInventoryCategory(inventory: any): Observable<any> {
    return this.http.post(this.urlApiInventoryCategory, inventory)
  }

  public getInventoryCategoryById(inventoryId: number): Observable<any> {
    const url = `${this.urlApiInventoryCategory}${inventoryId}/`;
    return this.http.get(url);
  }

  public putInventoryCategory(inventoryId: number, updatedInventoryData: any): Observable<any> {
    const url = `${this.urlApiInventoryCategory}${inventoryId}/`;
    return this.http.put<any>(url, updatedInventoryData)
  }

  public deleteInventoryCategory(inventoryId: number): Observable<any> {
    const url = `${this.urlApiInventoryCategory}${inventoryId}/`;
    return this.http.delete(url)
  }


}
