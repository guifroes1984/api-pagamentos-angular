import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LancamentosPesquisaComponent } from "./lancamentos-pesquisa/lancamentos-pesquisa.component";
import { LancamentoCadastroComponent } from "./lancamento-cadastro/lancamento-cadastro.component";
import { AuthGuard } from "../seguranca/auth.guard";
import { PendenciasGuard } from "../core/guards/FormComPendencias";

const routes: Routes = [
    { path: '',        
      component: LancamentosPesquisaComponent, 
      canActivate: [AuthGuard], 
      data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
    }, 
    { path: 'novo',
      component: LancamentoCadastroComponent,
      canActivate: [AuthGuard], 
      canDeactivate: [PendenciasGuard], 
      data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
    }, 
    { path: ':codigo', 
      component: LancamentoCadastroComponent, 
      canActivate: [AuthGuard], 
      canDeactivate: [PendenciasGuard], 
      data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
    }
  ];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LancamentoRoutingModule { }