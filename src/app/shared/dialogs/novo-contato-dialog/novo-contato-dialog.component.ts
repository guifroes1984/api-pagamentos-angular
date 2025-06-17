import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-novo-contato-dialog',
  templateUrl: './novo-contato-dialog.component.html',
  styleUrls: ['./novo-contato-dialog.component.css']
})
export class NovoContatoDialogComponent {

  contato: any = {};
  maskTelefone: string = '';

  constructor(
    public dialogRef: MatDialogRef<NovoContatoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  confirmar(): void {
    this.dialogRef.close(this.contato);
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  public ajustarMascaraTelefone(): void {
    const numeros = this.contato.telefone?.replace(/\D/g, '') || '';
    if (numeros.length >= 3 && numeros.charAt(2) === '9') {
      this.maskTelefone = '(00) 00000-0000';
    } else {
      this.maskTelefone = '(00) 0000-0000';
    }
  }

  public telefoneValido(telefone: string | undefined): boolean {
    if (!telefone) return false;
    const tel = telefone.trim();
    const regexFixo = /^\(\d{2}\) \d{4}-\d{4}$/;
    const regexCelular = /^\(\d{2}\) 9\d{4}-\d{4}$/;
    return regexFixo.test(tel) || regexCelular.test(tel);
  }

}
