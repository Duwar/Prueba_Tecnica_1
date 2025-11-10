import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/users';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-departamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios-departamento.html',
  styleUrls: ['./usuarios-departamento.css']
})
export class UsuariosDepartamento implements OnInit {
  private _userService = inject(UserService);
  baseUrl: string = environment.appUrl;

  usuarios: User[] = [];
  departamentoName: string = '';

  ngOnInit(): void {
    this.departamentoName = localStorage.getItem('departamentoName') || '';
    const departamentoId = localStorage.getItem('departamentoName');
    if (!departamentoId) {
      Swal.fire('❌ Error', 'No se encontró el ID del departamento', 'error');
      return;
    }

    this._userService.getUsersByDepartamento(departamentoId).subscribe({
      next: (res: any) => {
        this.usuarios = res.data || [];
      },
      error: (err) => {
        console.error('Error al cargar usuarios del departamento:', err);
        Swal.fire('❌ Error', 'No se pudieron cargar los usuarios', 'error');
      }
    });
  }
}
