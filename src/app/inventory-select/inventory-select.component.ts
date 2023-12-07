import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { HomeComponent } from '../home/home.component';

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
    })
  }

  redireccionarActualizar(inventarioId: number): void {
    this.router.navigate(['/actualizar-inventario', inventarioId]);
  }

  eliminarInventario(inventarioId: number): void {
    if (confirm('¿Está seguro de eliminar el inventario?')) {
      this.inventoryService.deleteInventory(inventarioId).subscribe(() => {
        this.router.navigate(['/lista-inventario']);
      })
    }
  }

}
