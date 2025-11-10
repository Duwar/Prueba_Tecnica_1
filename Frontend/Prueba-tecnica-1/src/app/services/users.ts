import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _httpClient = inject(HttpClient);
  private apiUrl = environment.appUrl;

  // Si tu backend requiere token, agrega headers con autorización
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  // Crear usuario (POST)
  postUser(userToCreate: FormData) {
    return this._httpClient.post(`${this.apiUrl}/users/crear`, userToCreate);
  }

  // Obtener todos los usuarios (GET)
  getUsers() {
    return this._httpClient.get(`${this.apiUrl}/users/mostrar`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Obtener un usuario por ID (GET)
  getUserById(id: string) {
    return this._httpClient.get(`${this.apiUrl}/users/mostrar/${id}`);
  }

  // Obtener usuarios por nombre de departamento (GET)
  getUsersByDepartamento(name: string) {
    return this._httpClient.get(`${this.apiUrl}/users/mostrarusuarios/${name}`);
  }

  // Actualizar usuario (PUT)
  putUser(userToUpdate: FormData, id: string) {
    return this._httpClient.put(`${this.apiUrl}/users/actualizar/${id}`, userToUpdate,);
  }

  // Eliminar usuario (DELETE)
  deleteUser(id: string) {
    return this._httpClient.delete(`${this.apiUrl}/users/eliminar/${id}`);
  }
}
