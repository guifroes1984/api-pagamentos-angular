import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';


import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LancamentoService } from '../lancamento/lancamento.service';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPaginatorIntl } from '../shared/mat-paginator-intl';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatListModule, 

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
    NavbarComponent
  ],
  exports: [NavbarComponent], 
  providers: [
    LancamentoService, 
    provideNgxMask(),
  { provide: LOCALE_ID, useValue: 'pt-BR' },
  { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  { provide: MatPaginatorIntl, useValue: getPaginatorIntl() }, 
  { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    ErrorHandlerService
  ]
})
export class CoreModule { }
