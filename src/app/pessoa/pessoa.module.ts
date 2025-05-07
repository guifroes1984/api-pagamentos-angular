import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { SharedModule } from '../shared/shared.module';
import { PessoaRoutingModule } from './pessoas-routing.module';

import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    PessoasPesquisaComponent, 
    PessoasCadastroComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    RouterModule, 
    
    MatTabsModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule, 
    MatTableModule,
    MatIconModule, 
    MatTooltipModule, 
    MatPaginatorModule, 
    MatToolbarModule, 
    MatListModule, 
    MatSelectModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatButtonToggleModule, 
    MatCardModule, 
    NgxMaskDirective, 
    NgxMaskPipe, 
    CurrencyMaskModule, 

    SharedModule, 
    PessoaRoutingModule
  ], 
  exports: []
})
export class PessoaModule { }
