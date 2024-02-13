import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string;
  private userUrl: string;
  private loginUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.endpoint;
    this.userUrl = `${this.apiUrl}api/user/`;
    this.loginUrl = `${this.apiUrl}api/user/login/`;
  } 

  signIn(user: User): Observable<any> {
    return this.http.post(`${this.userUrl}`, user);
  }
  
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}${id}`);
  }
  
  login(user: User): Observable<any> {
    return this.http.post(`${this.loginUrl}`, user);
  }
}