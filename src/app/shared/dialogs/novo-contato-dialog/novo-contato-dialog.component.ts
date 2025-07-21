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

  public confirmar(): void {
    if (this.contatoForm.invalid) {
      this.contatoForm.markAllAsTouched();
      return;
    }

    this.dialogRef.close({
      acao: this.editando ? 'editar' : 'adicionar',
      contato: this.contatoForm.value
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  public ajustarMascaraTelefone(): void {
    const telefone = this.contatoForm.get('telefone')?.value || '';
    const numeros = telefone.replace(/\D/g, '');
    this.maskTelefone = (numeros.length >= 3 && numeros.charAt(2) === '9')
      ? '(00) 00000-0000'
      : '(00) 0000-0000';
  }

  public telefoneValido(telefone: string | undefined): boolean {
    return true;
  }
}
