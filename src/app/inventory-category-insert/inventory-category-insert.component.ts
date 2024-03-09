import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-inventory-category-insert',
  templateUrl: './inventory-category-insert.component.html',
  styleUrls: ['./inventory-category-insert.component.css']
})
export class InventoryCategoryInsertComponent {

  formulario: FormGroup;

  constructor(private categoryInv: InventoryService, private router: Router, public fb: FormBuilder) {
    this.formulario = this.fb.group({
      NOMBRE_CATEGORIA : ['', [Validators.required, Validators.maxLength(30)]],
      DESCRIPCION : ['', [Validators.required, Validators.maxLength(100)]],
    })
  }

  crearTipoServicio(): void {
    if (this.formulario.valid) {
      this.categoryInv.postInventoryCategory(this.formulario.value).subscribe((data) => {
        this.router.navigate(['/lista-categoria-inventario'])
      })
    }
  }

}
