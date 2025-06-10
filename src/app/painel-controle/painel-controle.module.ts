import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';


import { SharedModule } from '../shared/shared.module';
import { PainelControleRoutingModule } from './painel-controle-routing.module';
import { PainelControleComponent } from './painel-controle/painel-controle.component';


@NgModule({
  declarations: [
    PainelControleComponent
  ],
  providers: [DecimalPipe], 
  imports: [
    CommonModule, 

    NgChartsModule, 
    MatCardModule, 
    
    SharedModule, 
    PainelControleRoutingModule
  ]
})
export class PainelControleModule { }
