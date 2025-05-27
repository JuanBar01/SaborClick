import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Usuario {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  loginOcrear(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/login_or_create/`, usuario);
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/users/`);
  }
}
