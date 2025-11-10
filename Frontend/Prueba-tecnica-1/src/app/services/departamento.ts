import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';
import { Departamento } from '../interfaces/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private _httpClient = inject(HttpClient);
  private apiUrl = environment.appUrl;

  // Si tu backend requiere token, agrega headers con autorización
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  // Crear Departamento
  createDepartamento(formData: FormData): Observable<any> {
    return this._httpClient.post(`${this.apiUrl}/departamento/crear`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Listar todos los departamento
  getDepartamentos() {
     return this._httpClient.get(`${this.apiUrl}/departamento/mostrar`);
  }

  // Buscar por nombre de departamento
  getDepartamentoByName(name: string) {
    return this._httpClient.get(`${this.apiUrl}/departamento/mostrar/${name}`);
  }

  // Actualizar departamento
  updateDepartamento(id: string, formData: FormData): Observable<any> {
    return this._httpClient.put(`${this.apiUrl}/departamento/actualizar/${id}`, formData, {
      headers: this.getAuthHeaders(),
    });
  }

  // Eliminar departamento
  deleteDepartamento(id: string): Observable<any> {
    return this._httpClient.delete(`${this.apiUrl}/departamento/eliminar/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
