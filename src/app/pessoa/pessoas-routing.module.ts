import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PessoasPesquisaComponent } from "./pessoas-pesquisa/pessoas-pesquisa.component";
import { PessoasCadastroComponent } from "./pessoas-cadastro/pessoas-cadastro.component";
import { AuthGuard } from "../seguranca/auth.guard";
import { PendenciasGuard } from "../core/guards/FormComPendencias";

const routes: Routes = [
    { path: '',
      component: PessoasPesquisaComponent,
      canActivate: [AuthGuard],
      data: { title: 'Pessoas' }
    },
    { path: 'novo',
      component: PessoasCadastroComponent,
      canActivate: [AuthGuard],
      canDeactivate: [PendenciasGuard],
      data: { title: 'Nova Pessoa' }
    },
    { path: ':codigo',
      component: PessoasCadastroComponent,
      canActivate: [AuthGuard],
      canDeactivate: [PendenciasGuard],
      data: { title: 'Editar Pessoa' }
    }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }