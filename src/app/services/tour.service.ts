import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Photo } from '../interfaces/photo';
import { Tour } from '../interfaces/tour';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  @Output() tourAdded: EventEmitter<void> = new EventEmitter();
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
  
  saveTour(tour: Tour): Observable<void> {
    return this.http.post<void>(`${this.url}`, tour);
  }
  
  deleteTour(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}`);
  } 

  putTour(id: number, tour: Tour): Observable<void> {
    return this.http.put<void>(`${this.url}${id}`, tour);
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

  deleteImagen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}imgs/${id}`)
  }

  putImagen(id: number, photos: File[]): Observable<void> {
    const form = new FormData();
    form.append('id', `${ id }`);
    for (let i = 0; i < photos.length; i++) {
      form.append('image', photos[i]);
    }
    return this.http.put<void>(`${this.url}imgs/${id}`, form);
  }

  getCategorias(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.url}categorias`);
  }
}
