import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartamentoService } from '../../services/departamento';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register-departamento',
  templateUrl: './register-departamento.html',
  styleUrls: ['./register-departamento.css'],
})
export class RegisterDepartamentoPage implements OnInit {

  departamentoForm!: FormGroup;
  banderaFile!: File | null;

  constructor(
    private fb: FormBuilder,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit(): void {
    this.departamentoForm = this.fb.group({
      name: ['', [Validators.required]],
      fecha_fundacion: ['', [Validators.required]],
      alcalde: ['', [Validators.required]],
      poblacion: ['', [Validators.required, Validators.min(1)]],
      bandera: [null]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) this.banderaFile = file;
  }

  createDepartamento() {
    if (this.departamentoForm.invalid) {
      Swal.fire('Error', 'Por favor completa todos los campos obligatorios', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.departamentoForm.get('name')?.value);
    formData.append('fecha_fundacion', this.departamentoForm.get('fecha_fundacion')?.value);
    formData.append('alcalde', this.departamentoForm.get('alcalde')?.value);
    formData.append('poblacion', this.departamentoForm.get('poblacion')?.value);
    
    if (this.banderaFile) {
      formData.append('bandera', this.banderaFile);
    }

    this.departamentoService.createDepartamento(formData).subscribe({
      next: () => Swal.fire('Éxito', 'Departamento creado correctamente', 'success'),
      error: () => Swal.fire('Error', 'No se pudo crear el departamento', 'error')
    });
  }
}
