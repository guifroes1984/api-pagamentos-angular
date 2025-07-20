import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CadastroFormComponent } from './cadastro-form/cadastro-form.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { ResetarSenhaComponent } from './resetar-senha/resetar-senha.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SegurancaRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    MatIconModule, 
    MatProgressSpinnerModule
   
  ],
  declarations: [LoginFormComponent, CadastroFormComponent, RecuperarSenhaComponent, ResetarSenhaComponent],
  exports: [LoginFormComponent]
})
export class SegurancaModule { }
