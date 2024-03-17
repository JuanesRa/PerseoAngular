import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../validators/password_validator';
import { UserService } from '../services/user.service';
import { AlertsService } from '../services/alerts.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  formulario: FormGroup;
  TiposDocumento: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    public fb: FormBuilder,
    private AlertsService:AlertsService) {
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
    });
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

            }else if (data.TELEFONO == this.formulario.value.TELEFONO){

            } else if(data.email == "user with this email already exists."){
              this.AlertsService.alertDenied("Correo ya registrado. Intente con otro.");
              return
                
            }else{
              let confirmedMessage = '¡Registro exitoso!';
              this.AlertsService.alertConfirmed(confirmedMessage).then(() => {
              console.log('Usuario creado:', data);
              this.router.navigate(['/login'])
            })};
           });
      } else {
        this.AlertsService.alertDenied('Las contraseñas no coinciden');
      }
    } else if (this.formulario.invalid){
      this.AlertsService.alertDenied('Formulario inválido');
    }
  }
}