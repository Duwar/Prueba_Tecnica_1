import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartamentoService } from '../../services/departamento';
import { Departamento } from '../../interfaces/departamento';
import { DepartamentoCard } from '../../components/card/card';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamentos',
  imports: [DepartamentoCard, CommonModule],
  templateUrl: './departamentos.html',
  styleUrl: './departamentos.css',
})
export class Departamentos implements OnInit {
  private _departamentoService = inject(DepartamentoService);
  private _router = inject(Router);

  departamentos: Departamento[] = [];

  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  cargarDepartamentos() {
    this._departamentoService.getDepartamentos().subscribe({
      next: (res: any) => {
        this.departamentos = res.data;
      },
      error: () => {
        Swal.fire('❌ Error', 'No se pudieron cargar los departamentos', 'error');
      },
    });
  }

  // 🔹 método que recibe el id emitido por el hijo
  irAUsuarios(id: any, name: any) {
    this._router.navigate(['/usuariosDepartamento']);
    localStorage.setItem('departamentoId', id);
    localStorage.setItem('departamentoName', name);
  }
}