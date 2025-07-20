import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PaginaNaoAutorizadoComponent } from './core/nao-autorizado.component';
import { RelatoriosModule } from './relatorios/relatorios.module';

const routes: Routes = [
  { path: '', redirectTo: 'painel-controle', pathMatch: 'full' },

  {
    path: 'lancamentos',
    loadChildren: () =>
      import('./lancamento/lancamento.module').then(m => m.LancamentoModule)
  }, 

  {
    path: 'pessoas', 
    loadChildren: () => 
      import('./pessoa/pessoa.module').then(m => m.PessoaModule)
  },

  {
    path: 'painel-controle', 
    loadChildren: () => 
      import('./painel-controle/painel-controle.module').then(m => m.PainelControleModule)
  },

  {
    path: 'relatorios', 
    loadChildren: () => 
      import('./relatorios/relatorios.module').then(m => RelatoriosModule)
  },

  {
    path: 'login', 
    loadChildren: () => 
      import('./seguranca/seguranca.module').then(m => m.SegurancaModule)
  },
  
  // { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent }, 
  // { path: 'pagina-nao-autorizado', component: PaginaNaoAutorizadoComponent },
  // { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
