import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/users';
import { User } from '../../../interfaces/user';
import { Profil } from '../../../components/user/user'; // tu componente standalone
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [Profil, CommonModule], // importamos el componente para poder usarlo
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class Users implements OnInit {
  private _userService = inject(UserService);
  private _router = inject(Router);
  baseUrl: string = environment.appUrl;
  usuarioKey: string | null = null;

  allUsers: User[] = [];
  selectedUserId: string | null = null; // id del usuario seleccionado

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this._userService.getUsers().subscribe({
      next: (res: any) => {
        this.allUsers = res.data || [];
      },
      error: (err: any) => {
        Swal.fire('❌ Error', 'No se pudieron cargar los usuarios', 'error');
        console.error(err);
      }
    });
  }

  // método que se llama al hacer click en un usuario
  seleccionarUsuario(id: string) {
    this.selectedUserId = id; // asignamos el id al seleccionado
    this.usuarioKey = id;
  }

  // eliminar usuario
  eliminarUsuario(id: string) {
    this._userService.deleteUser(id).subscribe({
      next: (res: any) => {
        Swal.fire('✅ Usuario eliminado', res.mensaje, 'success');
        this.cargarUsuarios(); // recargamos la lista
        if (this.selectedUserId === id) this.selectedUserId = null; // si se estaba editando, limpiar
      },
      error: (err: any) => console.error(err)
    });
  }
}
