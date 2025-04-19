import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';
import { MensagemComponent } from '../shared/mensagem/mensagem.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FilterPessoasPipe } from '../pipe/filter-pessoas.pipe';

@NgModule({
  declarations: [
    LancamentosPesquisaComponent,
    LancamentoCadastroComponent,
    LancamentosGridComponent, 
    FilterPessoasPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
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
    NgxMaskDirective, 
    NgxMaskPipe, 
    CurrencyMaskModule, 
    MensagemComponent
  ],
  exports: [
    LancamentosPesquisaComponent,
    LancamentoCadastroComponent
  ]
})
export class LancamentoModule { }
