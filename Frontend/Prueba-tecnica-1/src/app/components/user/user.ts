import { Component, inject, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from '../../services/users';
import { User } from '../../interfaces/user';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class Profil implements OnInit, OnChanges {
  baseUrl: string = environment.appUrl;
  @Input() usuarioId: string = '';
  user: User | null = null;
  editMode: boolean = false;
  newPhoto: File | null = null;
  newPassword: string = '';

  private _userService = inject(UserService);

  ngOnInit(): void {
    if (this.usuarioId) {
      this.showUser();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['usuarioId'] && !changes['usuarioId'].isFirstChange()) {
      this.showUser();
    }
  }

  showUser() {
    if (!this.usuarioId) return;

    this._userService.getUserById(this.usuarioId).subscribe({
      next: (response: any) => {
        this.user = response.data;
        console.log('Usuario cargado:', this.user);
      },
      error: (error: any) => {
        console.error('Error al cargar usuario:', error);
      }
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.newPhoto = event.target.files[0];
    }
  }

  async saveChanges() {
    if (!this.user) return;

    const formData = new FormData();
    formData.append('nombre', this.user.nombre);
    formData.append('apellido1', this.user.apellido1);
    formData.append('apellido2', this.user.apellido2);
    formData.append('Edad', `${this.user.Edad}`);

    if (this.user.name_departamento?.name) {
      formData.append('name_departamento', this.user.name_departamento.name);
    }

    if (this.newPassword.trim() !== '') {
      formData.append('contrasena', this.newPassword);
    }

    if (this.newPhoto) {
      formData.append('fotoPerfil', this.newPhoto);
      this.sendFormData(formData);
    } else if (this.user.fotoPerfil) {
      try {
        const imageUrl = this.user.fotoPerfil.startsWith('http')
          ? this.user.fotoPerfil
          : `${this.baseUrl}${this.user.fotoPerfil}`;
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const fileFromBlob = new File([blob], 'fotoPerfil.jpg', { type: blob.type });
        formData.append('fotoPerfil', fileFromBlob);
      } catch (error) {
        console.error('Error al obtener la foto actual como archivo:', error);
      }
      this.sendFormData(formData);
    } else {
      this.sendFormData(formData);
    }
  }

  private sendFormData(formData: FormData) {
    this._userService.putUser(formData, this.usuarioId).subscribe({
      next: (res: any) => {
        Swal.fire('✅ Éxito', 'Datos actualizados correctamente', 'success');
        this.editMode = false;
        this.showUser();
      },
      error: (err: any) => {
        Swal.fire('❌ Error', 'No se pudo actualizar el usuario', 'error');
        console.error(err);
      }
    });
  }

  // Nuevo método: eliminar usuario con confirmación
  deleteUser() {
    if (!this.usuarioId) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.deleteUser(this.usuarioId).subscribe({
          next: (res: any) => {
            Swal.fire('✅ Eliminado', res.mensaje, 'success');
            this.user = null; // Limpiar usuario cargado
          },
          error: (err: any) => {
            Swal.fire('❌ Error', 'No se pudo eliminar el usuario', 'error');
            console.error(err);
          }
        });
      }
    });
  }
}
