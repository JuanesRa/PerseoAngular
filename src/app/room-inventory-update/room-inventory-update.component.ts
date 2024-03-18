import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { InventoryService } from '../services/inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../services/alerts.service';
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

  constructor(
    private roomService: RoomService, 
    private route: ActivatedRoute, 
    private alertsService: AlertsService, 
    public fb: FormBuilder, 
    private inventoryService: InventoryService) {
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
    // Obtén los valores del formulario
    const valoresFormulario = this.formulario.value;

    // Comparar campos modificados y enviar actualización si hay cambios
    const roomxinventoryId = +this.route.snapshot.params['id']; // Obtener ID de los parámetros de ruta
    this.roomService.getRoomInventoryById(roomxinventoryId).subscribe((inventarioHabitacionOriginal) => {
      const camposModificados = Object.keys(valoresFormulario).filter(
        key => valoresFormulario[key] !== inventarioHabitacionOriginal[key]
      );

      if (camposModificados.length > 0) {
        this.alertsService.actualizarInventarioHabitacion(roomxinventoryId, valoresFormulario, this.nroHabitacion);
      } else {
        this.alertsService.alertDenied('No se han realizado cambios.');
      }
    });
  }

}
