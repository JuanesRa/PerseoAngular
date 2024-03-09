import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';


@Component({
  selector: 'app-inventory-select',
  templateUrl: './inventory-select.component.html',
  styleUrls: ['./inventory-select.component.css']
})
export class InventorySelectComponent implements OnInit {

  inventarios: any[] = [];

  constructor(private router: Router, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.inventoryService.getInventory().subscribe((data) => {
      this.inventarios = data;
      console.log(this.inventarios = data);


    // Obtener el tipo de habitación para cada habitación
    this.inventarios.forEach((inventario) => {
    this.inventoryService.getInventoryCategoryById(inventario.CATEGORIA_IDCATEGORIA).subscribe((statusData)=>{
      inventario.categoria = statusData.NOMBRE_CATEGORIA
      });
    });
    })




  }

  redireccionarActualizar(inventarioId: number): void {
    this.router.navigate(['/actualizar-inventario', inventarioId]);
  }

  eliminarInventario(inventarioId: number): void {
    if (confirm('¿Está seguro de eliminar el inventario?')) {
      this.inventoryService.deleteInventory(inventarioId).subscribe(() => {
      window.location.reload()
      });
    }
  }

}
