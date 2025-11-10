import { Component, inject, OnInit } from '@angular/core';
import { DepartamentoService } from '../../../services/departamento';
import { RouterLink } from '@angular/router';
import { Departamento } from '../../../interfaces/departamento';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { DepartamentoComponent } from '../../../components/card-departamento/card-departamento';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, RouterLink, DepartamentoComponent],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory implements OnInit {
  baseUrl: string = environment.appUrl;
  private _departamentoService = inject(DepartamentoService);

  departamentos: Departamento[] = [];
  selectedDepartamentoId: string | null = null;
  selectedDepartamentoname: string | null = null;
  departamentoKey: string | null = null;


  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  cargarDepartamentos() {
    this._departamentoService.getDepartamentos().subscribe({
      next: (res: any) => {
        this.departamentos = res.data || [];
      },
      error: (err: any) => {
        Swal.fire('❌ Error', 'No se pudieron cargar los departamentos', 'error');
        console.error(err);
      }
    });
  }

  seleccionarDepartamento(departamento: Departamento) {
  this.selectedDepartamentoId = departamento._id!;
  this.selectedDepartamentoname = departamento.name;
  console.log("departamentoId:", this.selectedDepartamentoId);
  console.log("departamentoName:", this.selectedDepartamentoname);
  }

  eliminarDepartamento(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._departamentoService.deleteDepartamento(id).subscribe({
          next: (res: any) => {
            Swal.fire('✅ Eliminado', res.mensaje, 'success');
            this.cargarDepartamentos();
            if (this.selectedDepartamentoId === id) this.selectedDepartamentoId = null;
          },
          error: (err: any) => {
            Swal.fire('❌ Error', 'No se pudo eliminar el departamento', 'error');
            console.error(err);
          }
        });
      }
    });
  }
}
