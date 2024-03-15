
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-inventory-category-select',
  templateUrl: './inventory-category-select.component.html',
  styleUrls: ['./inventory-category-select.component.css']
})
export class InventoryCategorySelectComponent {

  categoriaInv: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  constructor(private categoryInvService: InventoryService, private router: Router) { }

  ngOnInit(): void {
    this.categoryInvService.getInventoryCategory().subscribe((data) => {
      this.categoriaInv = data;
      // Configura el paginador después de recibir los datos
      if (this.paginator) {
        this.paginator.pageSize = 10;
        this.paginator.hidePageSize = true; // Oculta la selección de tamaño de página
      }
    });
  }

  redireccionarActualizar(categoryId: number): void {
    this.router.navigate(['/actualizar-categoria-inventario', categoryId]);
  }

  eliminarHabitacion(categoryId: number): void {
    if (confirm('¿Está seguro de eliminar la categoria?')) {
      this.categoryInvService.deleteInventoryCategory(categoryId).subscribe(() => {
        window.location.reload();
      });
    }
  }
}
