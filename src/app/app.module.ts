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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { getPaginatorIntl } from './shared/mat-paginator-intl';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { LancamentoModule } from './lancamento/lancamento.module';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoaModule } from './pessoa/pessoa.module';

registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent, 
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule, 
    LancamentoModule, 
    PessoaModule,

    MatTabsModule, 
        MatFormFieldModule,
        MatInputModule, 
        MatButtonModule, 
        MatTableModule,
        MatIconModule, 
        MatPaginatorModule, 
        MatToolbarModule, 
        MatListModule, 
        NgxMaskDirective, 
        NgxMaskPipe,

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
