import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../validators/password_validator';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user-insert',
  templateUrl: './user-insert.component.html',
  styleUrls: ['./user-insert.component.css']
})
export class UserInsertComponent {

  formulario: FormGroup;

  TiposUsuarios: any[] = [];
  TiposDocumento: any[] = [];

  constructor(private authService: AuthService, private router: Router, private userService: UserService, public fb: FormBuilder) {
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
      TIPO_PERSONA_IDTIPOPERSONA: [null, [Validators.required]],
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

    this.userService.getTipoUsuarios().subscribe((data) => { 
      this.TiposUsuarios = data;
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

  public inputValidator(event: any) {
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = event.key;
    
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  crearNuevoUsuario(): void {
    if (this.formulario.valid) {
      if (!this.formulario.hasError('passwordMismatch')) {
        this.authService.signup(this.formulario.value).subscribe((data) => {
          console.log('Usuario creado:', data);
          alert('Registro exitoso');
          this.router.navigate(['/lista-usuarios'])
        });
      } else {
        alert('Las contraseñas no coinciden');
      }
    }
    else if (this.formulario.invalid){
      console.log('Formulario inválido')
      alert('Formulario inválido')
    }

  }

}
