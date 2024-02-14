import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: "info",
        title: "Inicie sesión",
        showConfirmButton: false,
        timer: 2000
      });

      this.router.navigate(['/login']);
    }
    return true;
  }
  
}
