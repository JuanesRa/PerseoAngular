import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-inventory-insert',
  templateUrl: './inventory-insert.component.html',
  styleUrls: ['./inventory-insert.component.css']
})
export class InventoryInsertComponent {
  categorias: any[] = [];

  formulario: FormGroup;

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    public fb: FormBuilder,
    private alertsService: AlertsService,
    private location: PlatformLocation,
  ) {
    this.formulario = this.fb.group({
      NOMBRE_PRODUCTO: ['', [Validators.required, Validators.maxLength(30)]],
      DESCRIPCION_PRODUCTO: ['', [Validators.required, Validators.maxLength(100)]],
      CATEGORIA_IDCATEGORIA: [null, [Validators.required]],
    });

    history.pushState(null, '', location.href);
      this.location.onPopState(() => {
        window.location.href = ('http://localhost:4200/insertar-inventario'); //Navigate to another location when the browser back is clicked.
        history.pushState(null, '', location.href);
      });
  }

  ngOnInit(): void {
    //Obtener Categorias De inventario
    this.inventoryService.getInventoryCategory().subscribe((data) => {
      this.categorias = data;
    });

  }

  crearNuevoInventario(): void {
    if (this.formulario.valid) {
      let confirmedMessage = '¡Registro exitoso!';
      this.alertsService.alertConfirmed(confirmedMessage).then(() => {
        this.inventoryService.postInventory(this.formulario.value).subscribe((data) => {
          this.router.navigate(['/lista-inventario'])
        });
      });
    }
  }
}
