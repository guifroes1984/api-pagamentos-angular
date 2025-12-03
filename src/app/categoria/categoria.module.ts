import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaListagemComponent } from './categoria-listagem/categoria-listagem.component';
import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';


@NgModule({
  declarations: [
    CategoriaListagemComponent,
    CategoriaCadastroComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule
  ]
})
export class CategoriaModule { }
