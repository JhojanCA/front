import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Tour } from '../interfaces/tour';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private appUrl: string;
  private apiUrl: string;
  private url: string;

  constructor(private http: HttpClient) {
    this.appUrl = environment.endpoint;
    this.apiUrl = 'api/tour/';
    this.url = `${this.appUrl}${this.apiUrl}`;
  } 

  getListTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.url}`);
  }
  
  getTour2(id: number): Observable<Tour> {
    return this.http.get<Tour>(`${this.url}${id}`);
  }
  
  getTour(id: number): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.url}${id}`);
  }
  

  saveTour(tour: Tour): Observable<void> {
    return this.http.post<void>(`${this.url}`, tour);
  }

  getCategorias(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.url}categorias`);
  }
}
