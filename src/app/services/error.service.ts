import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  msjError(e: HttpErrorResponse) {
    if (e.error.msg) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${e.error.msg}`,
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Upps ocurrio un error, comuniquese con el administrador",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }
}