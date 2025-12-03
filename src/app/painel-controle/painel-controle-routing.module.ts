import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelControleComponent } from './painel-controle/painel-controle.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  { path: '', 
    component: PainelControleComponent, 
    canActivate: [AuthGuard], 
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }, 
    title: 'Painel de Controle'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelControleRoutingModule { }
