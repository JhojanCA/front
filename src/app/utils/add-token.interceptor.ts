import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';
import Swal from 'sweetalert2';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private _errorService: ErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    if (token) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    }

     return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401){
          Swal.fire({
            icon: "info",
            title: "Inicie sesión",
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
