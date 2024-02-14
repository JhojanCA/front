import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private _userService: UserService,
              private _errorService: ErrorService) {

    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login() {
    const user: User = {
      id_rol: 0,
      nombre: '',
      apellido: '',
      telefono: 0,
      correo: '',
      usuario: this.form.value.usuario,
      password: this.form.value.password,
    }

    this.loading = true;
    this._userService.login(user).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        this.getUser(data.id);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false
      }
    })
  }

  getUser(id: number) {
    this._userService.getUser(id).subscribe((data) => {
      if (data.id_rol  === 1) {
        this.router.navigate(['/main']);
      } 
      if (data.id_rol  === 2) {
        window.history.back();       
      }
    })
  }

}
