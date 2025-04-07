import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { getPaginatorIntl } from './shared/mat-paginator-intl';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';


@NgModule({
  declarations: [
    AppComponent,
    LancamentosPesquisaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatTabsModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule, 
    MatTableModule,
    MatIconModule, 
    MatTooltipModule, 
    MatPaginatorModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
