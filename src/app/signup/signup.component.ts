import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../validators/password_validator';
import { UserService } from '../services/user.service';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  formulario: FormGroup;

  users: any[] = [];
  TiposDocumento: any[] = [];

  constructor(private authService: AuthService, private router: Router, private userService: UserService, public fb: FormBuilder, private userDataService: UserDataService) {
    this.formulario = this.fb.group({
      NRODOCUMENTO: ['', [Validators.required, Validators.maxLength(10)]],
      NOMBRE: ['', [Validators.required, Validators.maxLength(70)]],
      APELLIDO: ['', [Validators.required, Validators.maxLength(70)]],
      email: ['', [Validators.required, Validators.email,  Validators.maxLength(100)],],
      username: ['', [Validators.required, Validators.maxLength(100)]],
      TELEFONO: ['', [Validators.required, Validators.maxLength(15)]],
      password: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', Validators.required],
      TIPO_DOCUMENTO_IDTIPODOCUMENTO: [null, [Validators.required]],
      TIPO_PERSONA_IDTIPOPERSONA: [3, [Validators.required]],
      ESTADO_USUARIO_IDESTADO: [1, [Validators.required]],
    }, {
      validators: this.passwordMatchValidator // Aquí asigna el validador correctamente
    });


    this.formulario?.get('email')?.valueChanges.subscribe(email => {
      this.formulario?.get('username')?.setValue(email);

    });
  }

  ngOnInit(): void {
    this.userService.getTipoDocumento().subscribe((data) => {
      this.TiposDocumento = data;
    })
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  crearNuevoUsuario(): void {
    if (this.formulario.valid) {
      if (!this.formulario.hasError('passwordMismatch')) {
        this.authService.signup(this.formulario.value).subscribe((data) => {
          console.log('Usuario creado:', data);
          alert('Registro exitoso');
          this.router.navigate(['/login'])
        });
      } else {
        alert('Las contraseñas no coinciden');
      }
    }

  }
}