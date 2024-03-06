import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  formulario: FormGroup;
  tiposDocumento: any[] = [];
  tiposUsuario: any[] = [];
  estadoUsuario: any[] = [];
  usuarioId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      NRODOCUMENTO: ['', [Validators.required, Validators.maxLength(10)]],
      NOMBRE: ['', [Validators.required, Validators.maxLength(30)]],
      APELLIDO: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.maxLength(30)]],
      TELEFONO: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(30)]],
      username: [, [Validators.required, Validators.maxLength(30)]], // No es necesario inicializarlo aquí
      TIPO_DOCUMENTO_IDTIPODOCUMENTO: [null, [Validators.required]],
      TIPO_PERSONA_IDTIPOPERSONA: [null, [Validators.required]],
      ESTADO_USUARIO_IDESTADO: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.usuarioId = +params['id'];

      this.userService.getUserById(this.usuarioId).subscribe((usuario) => {
        this.formulario.patchValue({
          NRODOCUMENTO: usuario.NRODOCUMENTO,
          NOMBRE: usuario.NOMBRE,
          APELLIDO: usuario.APELLIDO,
          email: usuario.email,
          TELEFONO: usuario.TELEFONO,
          password: usuario.password,
          username: usuario.email, // Definir username con el valor del email
          TIPO_DOCUMENTO_IDTIPODOCUMENTO: usuario.TIPO_DOCUMENTO_IDTIPODOCUMENTO,
          TIPO_PERSONA_IDTIPOPERSONA: usuario.TIPO_PERSONA_IDTIPOPERSONA,
          ESTADO_USUARIO_IDESTADO: usuario.ESTADO_USUARIO_IDESTADO,
        });
      });
    });

    // Suscribirse a los cambios del campo email
    this.formulario?.get('email')?.valueChanges.subscribe(email => {
      // Actualizar el valor del campo username con el valor del email
      this.formulario?.get('username')?.setValue(email);
    });

    // Obtener tipos de documento
    this.userService.getTipoDocumento().subscribe((data) => {
      this.tiposDocumento = data;
    });

    // Obtener tipos de usuario
    this.userService.getTipoUsuarios().subscribe((data) => {
      this.tiposUsuario = data;
    });

    // Obtener estados de usuario
    this.userService.getEstadoUsuarios().subscribe((data) => {
      this.estadoUsuario = data;
    });
  }

  actualizarUsuario(): void {
    // Obtener los valores del formulario
    const valoresFormulario = this.formulario.value;

    // Enviar actualización al servicio
    this.userService.putUser(this.usuarioId, valoresFormulario).subscribe(() => {
      this.router.navigate(['/lista-usuarios']);
    });
  }
}
