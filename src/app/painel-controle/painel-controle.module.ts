import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { PainelControleRoutingModule } from './painel-controle-routing.module';
import { PainelControleComponent } from './painel-controle/painel-controle.component';


@NgModule({
  declarations: [
    PainelControleComponent
  ],
  imports: [
    CommonModule, 
    
    SharedModule, 
    PainelControleRoutingModule
  ]
})
export class PainelControleModule { }
