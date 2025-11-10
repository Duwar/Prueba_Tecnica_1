import { Component, inject } from '@angular/core';
// Formularios reactivos -> cada cosa que el usuario escriba sea ercnocido por el sistema
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../../interfaces/credentials';
import { LoginService } from '../../services/login';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private _loginService = inject(LoginService);
  private router = inject(Router);

  loginForm = new FormGroup({
    userLogin: new FormControl('', [Validators.required, Validators.email]),
    passwordLogin: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  // manejo de eventos
  handleSubmit() {

    const credencials: Credentials = {
      userLogin: this.loginForm.value.userLogin || '',
      passwordLogin: this.loginForm.value.passwordLogin || ''
    };
    console.log('Credenciales para Login', credencials);
    //Logica de autenticacion al back va aqui
    this._loginService.login(credencials).subscribe({
      //manejo de la respuesta exitosa o error
      next: (res: any) => {
        console.log(res);
        if (res) {
          //guardar el token en el local storage
          localStorage.setItem('token', res.token);
          localStorage.setItem('usuarioId', res._id);
          localStorage.setItem('role', res.role);
          console.log("token guardado", res.token);
          console.log('ID de usuario guardado:', res._id);

          const rol = res.role; // este valor debe venir del backend
          if (rol === 'admin') {
            // redirigir a panel de admin
            this.router.navigate(['/admin']);
          } else if (rol === 'user') {
            // redirigir a vista de usuario normal
            this.router.navigate(['/usuario']);
          } else {
            // rol desconocido
            Swal.fire('Error', 'Rol de usuario no reconocido', 'error');
            return;
          }
          Swal.fire({
            title: "Excelente!",
            icon: "success",
            text: res.mensaje,
            draggable: true
          })
        }
      },
      error: (err: any) => {
        console.error('Error en login', err.error.mensaje);
        Swal.fire({
          title: "Oops!",
          icon: "error",
          draggable: true
        });
      }

    });
  }
}
