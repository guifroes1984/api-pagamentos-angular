import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PessoasPesquisaComponent } from "./pessoas-pesquisa/pessoas-pesquisa.component";
import { PessoasCadastroComponent } from "./pessoas-cadastro/pessoas-cadastro.component";

const routes: Routes = [
    { path: '',        component: PessoasPesquisaComponent }, 
    { path: 'novo',    component: PessoasCadastroComponent }, 
    { path: ':codigo', component: PessoasCadastroComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }