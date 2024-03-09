import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-inventory-update',
  templateUrl: './inventory-update.component.html',
  styleUrls: ['./inventory-update.component.css']
})
export class InventoryUpdateComponent {

  categorias: any[] = [];
  formulario: FormGroup;


constructor(private router: Router, private route: ActivatedRoute, private inventoryService: InventoryService, public fb: FormBuilder) {
    this.formulario = this.fb.group({
      NOMBRE_PRODUCTO:['', [Validators.required, Validators.maxLength(30)]],
      DESCRIPCION_PRODUCTO:['', [Validators.required, Validators.maxLength(100)]],
      CATEGORIA_IDCATEGORIA:[null, [Validators.required]],
    });
  }


  ngOnInit(): void {
    //Obtener Categorias De inventario
    this.inventoryService.getInventoryCategory().subscribe((data) => {
      this.categorias = data;
     });

    this.route.params.subscribe((params) => {
      const inventarioId = +params['id'];
      this.inventoryService.getInventoryById(inventarioId).subscribe((categoria) => {
        // Establece los valores del formulario con los datos del tipo de servicio
        this.formulario.patchValue({
          NOMBRE_PRODUCTO:categoria.NOMBRE_PRODUCTO,
          DESCRIPCION_PRODUCTO:categoria.DESCRIPCION_PRODUCTO,
          CATEGORIA_IDCATEGORIA:categoria.CATEGORIA_IDCATEGORIA})
        })
    });
  }

  actualizarInventario(): void {
    // Obtén los valores del formulario
    const valoresFormulario = this.formulario.value;

    // Comparar campos modificados y enviar actualización si hay cambios
    const inventarioId = +this.route.snapshot.params['id']; // Obtener ID de los parámetros de ruta
    this.inventoryService.getInventoryById(inventarioId).subscribe((inventarioOriginal) => {
      const camposModificados = Object.keys(valoresFormulario).filter(
        key => valoresFormulario[key] !== inventarioOriginal[key]
      );

      if (camposModificados.length > 0) {
        // Enviar actualización al servicio
        this.inventoryService.putInventory(inventarioId, valoresFormulario).subscribe(() => {
          this.router.navigate(['/lista-inventario']);
        });
      } else {
        alert('No se han realizado cambios');
      }
    });
  }

}
