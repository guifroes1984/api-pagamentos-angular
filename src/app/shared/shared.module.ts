import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemComponent } from './mensagem/mensagem.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NovoContatoDialogComponent } from './dialogs/novo-contato-dialog/novo-contato-dialog.component';

@NgModule({
    imports: [
        CommonModule, 
        MensagemComponent, 
        MatDialogModule,
        MatButtonModule, 
        MatIconModule, 
    ], 
    exports: [MensagemComponent], declarations: [ConfirmDialogComponent, NovoContatoDialogComponent]
})
export class SharedModule { }
