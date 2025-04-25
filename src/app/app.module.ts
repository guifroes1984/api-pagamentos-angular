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
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import { getPaginatorIntl } from './shared/mat-paginator-intl';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LancamentoModule } from './lancamento/lancamento.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { LancamentoService } from './lancamento/lancamento.service';

import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule, 
    HttpClientModule , 
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule, 
    LancamentoModule, 
    PessoaModule, 
    SharedModule, 
    CoreModule,

    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true, 
    }),

    MatTabsModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule, 
    MatTableModule,
    MatIconModule, 
    MatPaginatorModule, 
    MatToolbarModule, 
    MatListModule, 
    MatDialogModule, 
    NgxMaskDirective, 
    NgxMaskPipe,

  ],
  providers: [ 
    LancamentoService, 
    provideNgxMask(),
  { provide: LOCALE_ID, useValue: 'pt' },
  { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  { provide: MatPaginatorIntl, useValue: getPaginatorIntl() }, 
  { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
