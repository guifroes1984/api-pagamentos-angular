import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

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

registerLocaleData(localePt);

const routes: Routes = [];


@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule, 
    HttpClientModule , 
    AppRoutingModule,
    BrowserAnimationsModule, 
    RouterModule.forRoot(routes),
    FormsModule, 
    LancamentoModule, 
    PessoaModule, 
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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
