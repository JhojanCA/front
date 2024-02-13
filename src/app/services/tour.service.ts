import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Reserva } from '../interfaces/reserva';
import { Tour } from '../interfaces/tour';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  @Output() tourAdded: EventEmitter<void> = new EventEmitter();
  private apiUrl: string;
  private tourUrl: string;
  private photoUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.endpoint;
    this.tourUrl = `${this.apiUrl}api/tour/`;
    this.photoUrl = `${this.apiUrl}api/photo/`;
  } 

  getListTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.tourUrl}`);
  }
  
  getTour(id: number): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.tourUrl}${id}`);
  }  
  
  saveTour(tour: Tour): Observable<void> {
    return this.http.post<void>(`${this.tourUrl}`, tour);
  }
  
  deleteTour(id: number): Observable<void> {
    return this.http.delete<void>(`${this.tourUrl}${id}`);
  } 

  putTour(id: number, tour: Tour): Observable<void> {
    return this.http.put<void>(`${this.tourUrl}${id}`, tour);
  }

  getImagenes(id_tour: number): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.photoUrl}${id_tour}`);
  } 

  saveImagen(id_tour: number, photos: File[]): Observable<void> {
    const form = new FormData();
    form.append('id_tour', `${ id_tour }`);
    for (let i = 0; i < photos.length; i++) {
      form.append('image', photos[i]);
    }
    return this.http.post<void>(`${this.photoUrl}`, form);
  }

  deleteImagen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.photoUrl}${id}`)
  }

  putImagen(id: number, photos: File[]): Observable<void> {
    const form = new FormData();
    form.append('id', `${ id }`);
    for (let i = 0; i < photos.length; i++) {
      form.append('image', photos[i]);
    }
    return this.http.put<void>(`${this.photoUrl}${id}`, form);
  }

  getCategorias(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.tourUrl}categorias`);
  }

  saveReserva(reserva: Reserva): Observable<void> {
    return this.http.post<void>(`${this.tourUrl}reserva`, reserva);
  }
}
