import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { InventoryService } from '../services/inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-room-inventory-insert',
  templateUrl: './room-inventory-insert.component.html',
  styleUrls: ['./room-inventory-insert.component.css']
})
export class RoomInventoryInsertComponent {
  formulario: FormGroup;
  habitacionId!: number;
  productos: any[] = [];
  estados: any[] = [];

  constructor(private roomService: RoomService, private route: ActivatedRoute, private router: Router, public fb: FormBuilder, private inventoryService: InventoryService) {
    this.formulario = this.fb.group({
      HABITACION_NROHABITACION: [null, Validators.required],
      INVENTARIO_IDINVENTARIO: [null, [Validators.required, Validators.maxLength(30)]],
      ESTADO_PRODUCTO_IDESTADOPRODUCTO: [null, [Validators.required, Validators.maxLength(10)]],
    });
   }

  ngOnInit(): void {
    // Obtener el ID del servicio de los parámetros de la ruta
    this.habitacionId = +this.route.snapshot.params['id'];

    // Establecer el valor de HABITACION_NROHABITACION en el formulario
    this.formulario.patchValue({
      HABITACION_NROHABITACION: this.habitacionId
    });

    // Obtener los estados de los productos
    this.inventoryService.getStatusInventory().subscribe((data) => {
      this.estados = data;
      console.log(this.estados)
    });

    // Obtener los productos
    this.inventoryService.getInventory().subscribe((data) => {
      this.productos = data;
      console.log(this.productos)
    });
  }

  crearNuevaInventarioXHabitacion(): void {
    this.roomService.postRoomInventory(this.formulario.value).subscribe((data) => {
      this.router.navigate(['/lista-habitacion-inventario', this.habitacionId]);
    });
  }

}
