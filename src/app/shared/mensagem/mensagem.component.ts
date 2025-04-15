import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-mensagem',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule],
  template: `
    <div *ngIf="temErro()" class="mensagem-erro">
      {{ textoErro() }}
    </div>
  `,
  styles: [`
    .mensagem-erro {
      background-color: #f44336;
      color: #fff;
      padding: 4px 8px;
      font-size: 13px;
      margin-top: -20px;
      border-radius: 2px;
      display: block;
    }
  `]
})
export class MensagemComponent {
  @Input() error!: string;
  @Input() control!: NgModel;
  @Input() text!: string;

  temErro(): boolean {
    return this.control?.hasError(this.error) && this.control?.dirty || false;
  }
  
  textoErro(): string {
    if (this.error === 'required') {
      return 'Informe uma descrição';
    } else if (this.error === 'minlength') {
      const minlength = this.control?.errors?.['minlength']?.requiredLength;
      return `Mínimo de ${minlength} caracteres`;
    }
    return '';
  }
}
