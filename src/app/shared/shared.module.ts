import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MensagemComponent } from './mensagem/mensagem.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { NovoContatoDialogComponent } from './dialogs/novo-contato-dialog/novo-contato-dialog.component';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
    imports: [
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule, 
        MensagemComponent, 
        MatDialogModule,
        MatButtonModule, 
        MatIconModule, 
        MatFormFieldModule, 
        MatInputModule, 

        NgxMaskDirective, 
        NgxMaskPipe, 
        CurrencyMaskModule

        
    ], 
    declarations: [
  ConfirmDialogComponent,
  NovoContatoDialogComponent
],
exports: [MensagemComponent], 
providers: [provideNgxMask()]
})
export class SharedModule { }
