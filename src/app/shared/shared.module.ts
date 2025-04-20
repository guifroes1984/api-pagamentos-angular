import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemComponent } from './mensagem/mensagem.component';

@NgModule({
    imports: [
        CommonModule, 
        MensagemComponent
    ], 
    exports: [MensagemComponent]
})
export class SharedModule { }
