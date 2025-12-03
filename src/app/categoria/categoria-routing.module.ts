import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaListagemComponent } from './categoria-listagem/categoria-listagem.component';
import { AuthGuard } from '../seguranca/auth.guard';
import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';
import { PendenciasGuard } from '../core/guards/FormComPendencias';

const routes: Routes = [
  {
    path: '',
    component: CategoriaListagemComponent,
    canActivate: [AuthGuard], 
    canDeactivate: [PendenciasGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIA'], 
    title: 'Categorias' }  
  }, 
  {
    path: 'nova',
    component: CategoriaCadastroComponent,
    canActivate: [AuthGuard],
    canDeactivate: [PendenciasGuard],
    data: { roles: ['ROLE_CADASTRAR_CATEGORIA'],
    title: 'Nova Categoria' }
  }, 
  {
    path: ':codigo',
    component: CategoriaCadastroComponent,
    canActivate: [AuthGuard], 
    canDeactivate: [PendenciasGuard],
    data: { roles: ['ROLE_CADASTRAR_CATEGORIA'],
    title: 'Editar Categoria' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
