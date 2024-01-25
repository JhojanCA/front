import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Photo } from '../interfaces/photo';
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
  
  deleteTour(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}`);
  } 

  getImagenes(id: number): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.url}imgs/${id}`);
  } 

  saveImagen(id_tour: number, photos: File[]): Observable<void> {
    const form = new FormData();
    form.append('id_tour', `${ id_tour }`);
    for (let i = 0; i < photos.length; i++) {
      form.append('image', photos[i]);
    }
    return this.http.post<void>(`${this.url}imgs`, form);
  }

  getCategorias(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.url}categorias`);
  }
}
