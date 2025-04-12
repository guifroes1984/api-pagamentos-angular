import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { getPaginatorIntl } from './shared/mat-paginator-intl';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { CurrencyMaskModule } from "ng2-currency-mask";

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FilterPessoasPipe } from './pipe/filter-pessoas.pipe';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';

registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent,
    LancamentosPesquisaComponent,
    NavbarComponent,
    PessoasPesquisaComponent,
    LancamentoCadastroComponent, 
    FilterPessoasPipe, PessoasCadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule, 
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
    CurrencyMaskModule
  ],
  providers: [
    provideNgxMask(),
  { provide: LOCALE_ID, useValue: 'pt' },
  { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  { provide: MatPaginatorIntl, useValue: getPaginatorIntl() }
],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
