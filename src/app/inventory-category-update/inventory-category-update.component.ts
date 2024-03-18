import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-inventory-category-update',
  templateUrl: './inventory-category-update.component.html',
  styleUrls: ['./inventory-category-update.component.css']
})
export class InventoryCategoryUpdateComponent  implements OnInit{
  formulario: FormGroup;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private categoryInvService: InventoryService, 
    public fb: FormBuilder,
    private alertsService:AlertsService) {
    this.formulario = this.fb.group({
      NOMBRE_CATEGORIA: ['', [Validators.required, Validators.maxLength(30)]],
      DESCRIPCION: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const categoryId = +params['id'];
      this.categoryInvService.getInventoryCategoryById(categoryId).subscribe((categoria) => {
        // Establece los valores del formulario con los datos del tipo de servicio
        this.formulario.patchValue({
          NOMBRE_CATEGORIA: categoria.NOMBRE_CATEGORIA,
          DESCRIPCION: categoria.DESCRIPCION,
        });
      });
    });
  }

  actualizarCategoria(): void {
    // Obtén los valores del formulario
    const valoresFormulario = this.formulario.value;

    // Comparar campos modificados y enviar actualización si hay cambios
    const categoriaId = +this.route.snapshot.params['id']; // Obtener ID de los parámetros de ruta
    this.categoryInvService.getInventoryCategoryById(categoriaId).subscribe((categoriaOriginal) => {
      const camposModificados = Object.keys(valoresFormulario).filter(
        key => valoresFormulario[key] !== categoriaOriginal[key]
      );

      if (camposModificados.length > 0) {
        // Enviar actualización al servicio
        this.alertsService.actualizarCategoriaInventario(categoriaId, valoresFormulario);
      } else {
        this.alertsService.alertDenied('No se han realizado cambios.');
      }
    });
  }

}
