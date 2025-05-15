import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LoginFormComponent } from "./login-form/login-form.component";
import { SegurancaRoutingModule } from "./seguranca-routing.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
    imports: [
      CommonModule,
      FormsModule, 
      ReactiveFormsModule, 
      SegurancaRoutingModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule, 

     SegurancaRoutingModule
    ],
    declarations: [LoginFormComponent],
    exports: [LoginFormComponent]
  })
  export class SegurancaModule { }