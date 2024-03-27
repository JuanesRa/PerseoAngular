
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { MatPaginator } from '@angular/material/paginator';
import { AlertsService } from '../services/alerts.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-inventory-category-select',
  templateUrl: './inventory-category-select.component.html',
  styleUrls: ['./inventory-category-select.component.css']
})
export class InventoryCategorySelectComponent {

  categoriaInv: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private categoryInvService: InventoryService,
    private router: Router,
    private alertsService: AlertsService,
    private location: PlatformLocation,
  ) {
    history.pushState(null, '', location.href);
    this.location.onPopState(() => {
      window.location.href = ('http://localhost:4200/lista-categoria-inventario'); //Navigate to another location when the browser back is clicked.
      history.pushState(null, '', location.href);
    });
  }

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
    this.alertsService.eliminarCategoriaInventario(categoryId);
  }
}
