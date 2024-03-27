import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-inventory-category-insert',
  templateUrl: './inventory-category-insert.component.html',
  styleUrls: ['./inventory-category-insert.component.css']
})
export class InventoryCategoryInsertComponent {

  formulario: FormGroup;

  constructor(
    private categoryInv: InventoryService,
    private router: Router,
    public fb: FormBuilder,
    private alertsService: AlertsService,
    private location: PlatformLocation,
  ) {
    this.formulario = this.fb.group({
      NOMBRE_CATEGORIA: ['', [Validators.required, Validators.maxLength(30)]],
      DESCRIPCION: ['', [Validators.required, Validators.maxLength(100)]],
    });

    history.pushState(null, '', location.href);
    this.location.onPopState(() => {
      window.location.href = ('http://localhost:4200/insertar-categoria-inventario'); //Navigate to another location when the browser back is clicked.
      history.pushState(null, '', location.href);
    });
  }

  crearTipoServicio(): void {
    if (this.formulario.valid) {
      let confirmedMessage = '¡Registro exitoso!';
      this.alertsService.alertConfirmed(confirmedMessage).then(() => {
        this.categoryInv.postInventoryCategory(this.formulario.value).subscribe((data) => {
          this.router.navigate(['/lista-categoria-inventario'])
        });
      });
    }
  }

}
