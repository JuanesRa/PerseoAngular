import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-inventory-update',
  templateUrl: './inventory-update.component.html',
  styleUrls: ['./inventory-update.component.css']
})
export class InventoryUpdateComponent {

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


  inventario: any = {};
  inventarioOriginal: any = {}

  constructor(private router: Router, private route: ActivatedRoute, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const inventoryId = +params['id'];
      this.inventoryService.getInventoryById(inventoryId).subscribe((inventory) => {
        this.inventario = inventory
      })
    })
  }

  actualizarInventario(): void {
    const inventoryId = this.inventario.id;
    const camposModificados = Object.keys(this.inventario).filter(
      key => this.inventario[key] !== this.inventarioOriginal[key]
    );

    if (camposModificados.length > 0) {
      this.inventoryService.putInventory(inventoryId, this.inventario).subscribe(() => {
        this.router.navigate(['/lista-inventario']);
      });
    } else {
      console.log('No se han realizado cambios');
    }
  }

}
