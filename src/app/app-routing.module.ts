import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PessoasPesquisaComponent } from './pessoa/pessoas-pesquisa/pessoas-pesquisa.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PessoasCadastroComponent } from './pessoa/pessoas-cadastro/pessoas-cadastro.component';

const routes: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },

  {
    path: 'lancamentos',
    loadChildren: () =>
      import('./lancamento/lancamento.module').then(m => m.LancamentoModule)
  },
  
  { path: 'pessoas', component: PessoasPesquisaComponent }, 
  { path: 'pessoas/novo', component: PessoasCadastroComponent }, 
  
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
