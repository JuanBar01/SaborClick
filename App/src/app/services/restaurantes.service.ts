import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Restaurante {
  id?: number;
  nombre: string;
  direccion: string;
  descripcion: string;
  calificacion: number;
 logo_path?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000'; // Cambia según tu API

  constructor(private http: HttpClient) {}

  getRestaurantes(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(`${this.apiUrl}/restaurants/`);
  }

  agregarRestaurante(formData: FormData) {
    return this.http.post<Restaurante>(`${this.apiUrl}/restaurants/`, formData);
  }
}
