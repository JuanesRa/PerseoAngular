import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { MatPaginator } from '@angular/material/paginator';
import { AlertsService } from '../services/alerts.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-inventory-select',
  templateUrl: './inventory-select.component.html',
  styleUrls: ['./inventory-select.component.css']
})
export class InventorySelectComponent implements OnInit {

  inventarios: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private inventoryService: InventoryService,
    private alertsService: AlertsService,
    private location: PlatformLocation,
    ) {
      history.pushState(null, '', location.href);
      this.location.onPopState(() => {
        window.location.href = ('http://localhost:4200/lista-inventario'); //Navigate to another location when the browser back is clicked.
        history.pushState(null, '', location.href);
      });
    }

  ngOnInit(): void {
    this.inventoryService.getInventory().subscribe((data) => {
      this.inventarios = data;

      // Configura el paginador después de recibir los datos
      if (this.paginator) {
        this.paginator.pageSize = 10;
        this.paginator.hidePageSize = true; // Oculta la selección de tamaño de página
      }

      // Obtener el tipo de habitación para cada habitación
      this.inventarios.forEach((inventario) => {
        this.inventoryService.getInventoryCategoryById(inventario.CATEGORIA_IDCATEGORIA).subscribe((statusData)=>{
          inventario.categoria = statusData.NOMBRE_CATEGORIA;
        });
      });
    });
  }

  redireccionarActualizar(inventarioId: number): void {
    this.router.navigate(['/actualizar-inventario', inventarioId]);
  }

  eliminarInventario(inventarioId: number): void {
    this.alertsService.eliminarInventario(inventarioId);
  }
  
}
