import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-room-inventory-select',
  templateUrl: './room-inventory-select.component.html',
  styleUrls: ['./room-inventory-select.component.css']
})
export class RoomInventorySelectComponent implements OnInit {
  roomxinventory: any[] = [];
  habitacionId!: number;

  constructor(private roomService: RoomService, private route: ActivatedRoute, private router: Router, private InventoryService: InventoryService) { }

  ngOnInit(): void {
    // Obtener el ID del servicio de los parámetros de la ruta
    this.habitacionId = +this.route.snapshot.params['id'];

    this.roomService.getRoomInventory().subscribe((data) => {
      // Filtrar los registros según el valor de HABITACION_NROHABITACION
      this.roomxinventory = data.filter((item: any) => item.HABITACION_NROHABITACION == this.habitacionId);

      // Obtener producto para cada inventario
      this.roomxinventory.forEach((inventory) => {
        this.InventoryService.getInventoryById(inventory.INVENTARIO_IDINVENTARIO).subscribe((statusData) => {
          // Asignar el nombre del producto al objeto de inventario
          inventory.producto = statusData.NOMBRE_PRODUCTO;
        });
      });

       // Obtener estado producto
       this.roomxinventory.forEach((inventory) => {
        this.InventoryService.getStatusInventoryById(inventory.ESTADO_PRODUCTO_IDESTADOPRODUCTO).subscribe((statusData) => {
          // Asignar el nombre del producto al objeto de inventario
          inventory.estado = statusData.ESTADO;
        });
      });
    });
  }

  redireccionarActualizar(roomId: number): void {
    this.router.navigate(['/actualizar-habitacion-inventario', roomId]);
  }

  eliminarHabitacionxInventario(roomxinventoryId: number): void {
    if (confirm('¿Está seguro de eliminar el inventario?')) {
      this.roomService.deleteRoomInventory(roomxinventoryId).subscribe(() => {
        window.location.reload();
      });
    }
  }
}