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
  
  getTour(id: number): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.url}${id}`);
  }
}
