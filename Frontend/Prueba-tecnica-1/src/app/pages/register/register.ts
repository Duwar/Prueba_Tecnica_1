import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { User } from '../../interfaces/user';
import Swal from 'sweetalert2';
import { UserService } from '../../services/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private _userService = inject(UserService);
  private _router = inject(Router);
  ImageSelected: File | null = null;

  registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido1: new FormControl('', [Validators.required]),
    apellido2: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    departamento: new FormControl('', [Validators.required, Validators.email]),
    edad: new FormControl<string>('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    contrasena: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
  });

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.ImageSelected = file;
    }
  }

  handleSubmit() {
    // Manejar el caso cuando el formulario no es válido

    const userData: FormData = new FormData();
    // userData.append('_id', ''); // Dejar vacío para nuevo usuario
    userData.append('nombre', this.registerForm.value.nombre || '');
    userData.append('apellido1', this.registerForm.value.apellido1 || '');
    userData.append('apellido2', this.registerForm.value.apellido2 || '');
    userData.append('username', this.registerForm.value.username || '');
    userData.append('name_departamento', this.registerForm.value.departamento || '');
    userData.append('Edad', this.registerForm.value.edad || '');
    if (this.ImageSelected) {
      userData.append('fotoPerfil', this.ImageSelected);
    }
    userData.append('contrasena', this.registerForm.value.contrasena || '');
    userData.append('role', 'user');

    // console.log('Datos del usuario a registrar:', userData);
    console.log('Datos del usuario a registrar:');
    for (const pair of userData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    this._userService.postUser(userData).subscribe({
      next: (res: any) => {
        console.log('✅ Respuesta del servidor:', res);
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: res.mensaje,
        });
        this.registerForm.reset(); // opcional, limpia el formulario
      },
      error: (err: any) => {
        console.error('Error en el registro:', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error?.mensaje || 'Ocurrió un error al registrar el usuario',
        });
      },
    });
  }
}
