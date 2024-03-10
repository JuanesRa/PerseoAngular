import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { InventoryService } from '../services/inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-room-inventory-update',
  templateUrl: './room-inventory-update.component.html',
  styleUrls: ['./room-inventory-update.component.css']
})
export class RoomInventoryUpdateComponent {
  formulario: FormGroup;
  habitacionId!: number;
  nroHabitacion!: number;
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

    // Obtener datos del inventario
    this.roomService.getRoomInventoryById(this.habitacionId).subscribe((roomxinv) => {
      // Establecer los valores del formulario con los datos del servicio
      this.formulario.patchValue({
        HABITACION_NROHABITACION: roomxinv.HABITACION_NROHABITACION,
        INVENTARIO_IDINVENTARIO: roomxinv.INVENTARIO_IDINVENTARIO,
        ESTADO_PRODUCTO_IDESTADOPRODUCTO: roomxinv.ESTADO_PRODUCTO_IDESTADOPRODUCTO
      });

      // Asignar el valor de HABITACION_NROHABITACION a la variable nroHabitacion
      this.nroHabitacion = roomxinv.HABITACION_NROHABITACION;
    });
  }

  actualizarInventoryXRoom(): void {
    // Obtener los valores del formulario
    const valoresFormulario = this.formulario.value;

    // Enviar actualización al servicio
    this.roomService.putRoomInventory(this.habitacionId, valoresFormulario).subscribe(() => {
      this.router.navigate(['/lista-habitacion-inventario',this.nroHabitacion]);
    });
  }

}
