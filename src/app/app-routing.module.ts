import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LancamentosPesquisaComponent } from './lancamento/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento/lancamento-cadastro/lancamento-cadastro.component';
import { PessoasPesquisaComponent } from './pessoa/pessoas-pesquisa/pessoas-pesquisa.component';

const routes: Routes = [
  { path: 'lancamentos', 
    children: [
      { path: '',     component: LancamentosPesquisaComponent }, 
      { path: 'novo', component: LancamentoCadastroComponent }, 
      { path: ':codigo', component: LancamentoCadastroComponent }
    ] 
  }, 
  { path: 'pessoas', component: PessoasPesquisaComponent }, 
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
