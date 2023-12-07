import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-inventory-insert',
  templateUrl: './inventory-insert.component.html',
  styleUrls: ['./inventory-insert.component.css']
})
export class InventoryInsertComponent {

  estados = [
    { id: 1, nombre: 'Nuevo' },
    { id: 2, nombre: 'Buen estado' },
    { id: 3, nombre: 'Con defectos menores' },
    { id: 5, nombre: 'Reacondicionado' },
    { id: 5, nombre: 'Defectuoso' }
  ]

  categorias = [
    { id: 1, nombre: 'Mobiliario' },
    { id: 2, nombre: 'Electrodomésticos' },
    { id: 3, nombre: 'Artículos de Decoración' },
    { id: 4, nombre: 'Seguridad y Accesorios' },
    { id: 5, nombre: 'Iluminación' },
    { id: 9, nombre: 'Consumibles' }
  ]


  inventarios: any[] = [];
  nuevoInventario: any = {
    id: '',
    nombre_producto: '',
    descripcion: '',
    id_estado: null,
    id_categoria: null
  }

  constructor(private router: Router, private inventoryService: InventoryService) {}

  crearNuevoInventario():void {
    this.inventoryService.postInventory(this.nuevoInventario).subscribe((data) => {
      this.router.navigate(['/lista-inventario'])
    })
  }
}
