import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    RelatorioLancamentosComponent
  ],
  imports: [
    CommonModule, 
    FormsModule, 

    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatButtonModule, 

    SharedModule, 
    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }
