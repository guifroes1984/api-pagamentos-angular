import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginFormComponent } from "./login-form/login-form.component";
import { CadastroFormComponent } from "./cadastro-form/cadastro-form.component";
import { RecuperarSenhaComponent } from "./recuperar-senha/recuperar-senha.component";
import { ResetarSenhaComponent } from "./resetar-senha/resetar-senha.component";

const routes: Routes = [
    { path: '', component: LoginFormComponent },
    { path: 'cadastro-usuario', component: CadastroFormComponent },
    {
        path: 'login', children: [
            {
                path: 'recuperar-senha', children: [
                    { path: 'resetar-senha/:token', component: ResetarSenhaComponent }
                ]
            }
        ]
    },
    { path: 'recuperar-senha', component: RecuperarSenhaComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SegurancaRoutingModule { }