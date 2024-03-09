import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-inventory-insert',
  templateUrl: './inventory-insert.component.html',
  styleUrls: ['./inventory-insert.component.css']
})
export class InventoryInsertComponent {
  categorias: any[] = [];

  formulario: FormGroup;

  constructor(private inventoryService: InventoryService, private router: Router, public fb: FormBuilder) {
    this.formulario = this.fb.group({
      NOMBRE_PRODUCTO  : ['', [Validators.required, Validators.maxLength(30)]],
      DESCRIPCION_PRODUCTO  : ['', [Validators.required, Validators.maxLength(100)]],
      CATEGORIA_IDCATEGORIA   : [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    //Obtener Categorias De inventario
    this.inventoryService.getInventoryCategory().subscribe((data) => {
      this.categorias = data;
     });

  }

  crearNuevoInventario(): void {
    if (this.formulario.valid) {
      this.inventoryService.postInventory(this.formulario.value).subscribe((data) => {
        this.router.navigate(['/lista-inventario'])
      })
    }
  }
}
