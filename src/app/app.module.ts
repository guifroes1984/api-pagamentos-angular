import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LancamentoModule } from './lancamento/lancamento.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { SegurancaModule } from './seguranca/seguranca.module';

registerLocaleData(localePt);

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MoneyHttp } from './seguranca/money-http';

export function tokenGetter() {
  return localStorage.getItem('token');
}

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
    SegurancaModule, 
    SharedModule, 
    CoreModule,

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

    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: () => ({
          tokenGetter: () => localStorage.getItem('token'),
          allowedDomains: ['localhost:8080'],
          disallowedRoutes: ['http://localhost:8080/oauth/token'],
        }),
        deps: []
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttp,
      multi: true
    }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
