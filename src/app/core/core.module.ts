import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LancamentoService } from '../lancamento/lancamento.service';
import { PessoaService } from '../pessoa/pessoa.service';
import { CategoriaService } from '../categorias/categoria.service';
import { AuthService } from '../seguranca/auth.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { PainelControleService } from '../painel-controle/painel-controle.service';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPaginatorIntl } from '../shared/mat-paginator-intl';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { Title } from '@angular/platform-browser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatListModule, 
    MatTooltipModule,

    NgxMaskDirective, 
    NgxMaskPipe,

    SharedModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true, 
    }),
    
  ], 
  
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  exports: [NavbarComponent], 
  providers: [
    LancamentoService, 
    PessoaService, 
    CategoriaService, 
    ErrorHandlerService, 
    AuthService, 
    PainelControleService, 
    provideNgxMask(),
  { provide: LOCALE_ID, useValue: 'pt-BR' },
  { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  { provide: MatPaginatorIntl, useValue: getPaginatorIntl() }, 
  { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}, 
    JwtHelperService, 
    ErrorHandlerService, 
    Title
  ]
})
export class CoreModule { }
