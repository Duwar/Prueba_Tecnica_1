import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Departamento } from '../../interfaces/departamento';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-departamento-card',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe],
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class DepartamentoCard {
  @Input() departamento!: Departamento;
  @Output() seleccionar = new EventEmitter<{ id: string, name: string }>(); // 🔹 emite el id

  onCardClick()  {
    if (this.departamento._id && this.departamento.name) {
      this.seleccionar.emit({ id: this.departamento._id, name: this.departamento.name });
    }
  }
}
