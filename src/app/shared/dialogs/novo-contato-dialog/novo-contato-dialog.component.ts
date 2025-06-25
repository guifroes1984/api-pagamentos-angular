import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-novo-contato-dialog',
  templateUrl: './novo-contato-dialog.component.html',
  styleUrls: ['./novo-contato-dialog.component.css']
})
export class NovoContatoDialogComponent implements OnInit {

  contatoForm: FormGroup;
  maskTelefone: string = '';
  contatosExistentes: any[] = [];
  editando: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NovoContatoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contatoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['']
    });
  }

  ngOnInit(): void {
    this.editando = !!this.data?.contato;
    this.contatosExistentes = this.data?.contatosExistentes || [];

    if (this.editando) {
      this.contatoForm.patchValue(this.data.contato);
    }

    this.ajustarMascaraTelefone();
  }

  confirmar(): void {
    if (this.contatoForm.valid && this.telefoneValido(this.contatoForm.get('telefone')?.value)) {
      this.dialogRef.close({
        acao: this.editando ? 'editar' : 'adicionar', 
        contato: this.contatoForm.value
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  ajustarMascaraTelefone(): void {
    const telefone = this.contatoForm.get('telefone')?.value || '';
    const numeros = telefone.replace(/\D/g, '');
    this.maskTelefone = (numeros.length >= 3 && numeros.charAt(2) === '9') 
      ? '(00) 00000-0000' 
      : '(00) 0000-0000';
  }

  telefoneValido(telefone: string | undefined): boolean {
    if (!telefone) return false;
    const tel = telefone.trim();
    const regexFixo = /^\(\d{2}\) \d{4}-\d{4}$/;
    const regexCelular = /^\(\d{2}\) 9\d{4}-\d{4}$/;
    return regexFixo.test(tel) || regexCelular.test(tel);
  }
}