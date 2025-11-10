import { Component, inject, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DepartamentoService } from '../../services/departamento';
import { Departamento } from '../../interfaces/departamento';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-departamento',
  imports: [CommonModule, FormsModule],
  templateUrl: './card-departamento.html',
  styleUrl: './card-departamento.css',
})
export class DepartamentoComponent implements OnInit, OnChanges {
  baseUrl: string = environment.appUrl;
  @Input() departamentoId: string = '';
  @Input() departamentoName: string = '';
  departamento: Departamento | null = null;
  editMode: boolean = false;
  newBandera: File | null = null;

  private _departamentoService = inject(DepartamentoService);

  ngOnInit(): void {
    if (this.departamentoId) this.cargarDepartamento();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['departamentoId'] && !changes['departamentoId'].isFirstChange()) {
      this.cargarDepartamento();
    }
  }

  cargarDepartamento() {
    if (!this.departamentoId) return;

    this._departamentoService.getDepartamentoByName(this.departamentoName).subscribe({
      next: (res: any) => {
        this.departamento = res.data || res; // Ajustar según tu backend
        console.log('Departamento cargado:', this.departamento);
      },
      error: (err) => console.error('Error al cargar departamento:', err)
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.newBandera = event.target.files[0];
    }
  }

  async saveChanges() {
    if (!this.departamento) return;

    const formData = new FormData();
    formData.append('name', this.departamento.name);
    formData.append('alcalde', this.departamento.alcalde);
    formData.append('poblacion', `${this.departamento.poblacion}`);
    const fecha = new Date(this.departamento.fecha_fundacion);
    formData.append('fecha_fundacion', fecha.toISOString());

    if (this.newBandera) formData.append('bandera', this.newBandera);

    this._departamentoService.updateDepartamento(this.departamentoId, formData).subscribe({
      next: () => {
        Swal.fire('✅ Éxito', 'Departamento actualizado', 'success');
        this.editMode = false;
        this.cargarDepartamento();
      },
      error: (err) => Swal.fire('❌ Error', 'No se pudo actualizar', 'error')
    });
  }

  eliminarDepartamento() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && this.departamentoId) {
        this._departamentoService.deleteDepartamento(this.departamentoId).subscribe({
          next: () => Swal.fire('✅ Eliminado', 'Departamento eliminado', 'success'),
          error: (err) => Swal.fire('❌ Error', 'No se pudo eliminar', 'error')
        });
      }
    });
  }
}
