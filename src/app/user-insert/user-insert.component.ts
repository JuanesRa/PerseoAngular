import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../validators/password_validator';
import { UserService } from '../services/user.service';
import { AlertsService } from '../services/alerts.service';
import { PlatformLocation } from '@angular/common';


@Component({
  selector: 'app-user-insert',
  templateUrl: './user-insert.component.html',
  styleUrls: ['./user-insert.component.css']
})
export class UserInsertComponent {

  formulario: FormGroup;

  showPassword: boolean = false;
  TiposUsuarios: any[] = [];
  TiposDocumento: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    public fb: FormBuilder,
    private AlertsService:AlertsService,
    private location: PlatformLocation) {
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

    history.pushState(null, '', location.href)
    this.location.onPopState (() => {
      window.location.href = 'http://localhost:4200/insertar-usuario'; //Navigate to another location when the browser back is clicked.
      history.pushState(null, '', location.href)
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
            if (data.NRODOCUMENTO == "user with this NRODOCUMENTO already exists."){
              this.AlertsService.alertDenied("Documento ya registrado. Intente con otro.");
              return
            } else if(data.email == "user with this email already exists."){
              this.AlertsService.alertDenied("Correo ya registrado. Intente con otro.");
              return
                
            }else{
              let confirmedMessage = '¡Registro exitoso!';
              this.AlertsService.alertConfirmed(confirmedMessage).then(() => {
              //console.log('Usuario creado:', data);
              this.router.navigate(['/lista-usuarios'])
            })};
           });
      } else {
        this.AlertsService.alertDenied('Las contraseñas no coinciden');
      }
    } else if (this.formulario.invalid){
      this.AlertsService.alertDenied('Formulario inválido');
    }
  }

  togglePasswordVisibility(passwordField: HTMLInputElement): void {
    this.showPassword = !this.showPassword;
    passwordField.type = this.showPassword ? 'text' : 'password';
  }

}
