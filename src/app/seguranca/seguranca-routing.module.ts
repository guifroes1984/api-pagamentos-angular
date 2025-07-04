import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginFormComponent } from "./login-form/login-form.component";
import { CadastroFormComponent } from "./cadastro-form/cadastro-form.component";

const routes: Routes = [
    { path: '', component: LoginFormComponent }, 
    { path: 'cadastro-usuario', component: CadastroFormComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class SegurancaRoutingModule { }