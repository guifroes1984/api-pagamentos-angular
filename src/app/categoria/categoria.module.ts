import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaListagemComponent } from './categoria-listagem/categoria-listagem.component';
import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoriaListagemComponent,
    CategoriaCadastroComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    CategoriaRoutingModule
  ]
})
export class CategoriaModule { }
