import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';



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
    FormsModule, 
    ReactiveFormsModule,

    NgChartsModule, 
    MatCardModule, 
    MatDatepickerModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatNativeDateModule, 
    
    SharedModule, 
    PainelControleRoutingModule, 


  ]
})
export class PainelControleModule { }
