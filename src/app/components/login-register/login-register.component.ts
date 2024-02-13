import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  form: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private _userService: UserService, 
              private _errorService: ErrorService) {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  addUser() {
    const user: User = {
      id_rol: 2,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      telefono: this.form.value.telefono,
      correo: this.form.value.correo,
      usuario: this.form.value.usuario,
      password: this.form.value.password
    }
    
    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        Swal.fire({
          icon: "success",
          title: "Usuario registrado",
          text: `El usuario fue registrado con éxito`,
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      }
    });
  }
}
