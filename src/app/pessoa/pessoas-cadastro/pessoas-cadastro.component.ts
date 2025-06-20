import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PessoaService } from '../pessoa.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { Pessoa } from 'src/app/core/model/pessoa';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NovoContatoDialogComponent } from 'src/app/shared/dialogs/novo-contato-dialog/novo-contato-dialog.component';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  fonteDados = new MatTableDataSource<any>();
  colunasExibidas = ['nome', 'email', 'telefone', 'acoes'];

  formPessoa!: FormGroup;
  pessoa = new Pessoa();

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();

    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova pessoa');

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  public prepararNovoContato() {
    const dialogRef = this.dialog.open(NovoContatoDialogComponent, {
      width: '600px',
      disableClose: true,
      hasBackdrop: true,
      panelClass: 'custom-dialog-container',
      data: {
        titulo: 'Novo Contato',
        contatosExistentes: this.pessoa.contatos || []
      }
    });

    dialogRef.afterClosed().subscribe((novoContato) => {
      if (novoContato) {
        if (!this.pessoa.contatos) {
          this.pessoa.contatos = [];
        }
        this.pessoa.contatos.push(novoContato);
        this.fonteDados.data = [...this.pessoa.contatos];
      }
    });
  }

  public editarContato(index: number): void {
    const contatoOriginal = this.pessoa.contatos[index];

    const dialogRef = this.dialog.open(NovoContatoDialogComponent, {
      width: '600px',
      disableClose: true,
      hasBackdrop: true,
      panelClass: 'custom-dialog-container',
      data: {
        titulo: 'Editar Contato',
        contato: contatoOriginal,
        contatosExistentes: this.pessoa.contatos || []
      }
    });

    dialogRef.afterClosed().subscribe((contatoEditado) => {
      if (contatoEditado) {
        this.pessoa.contatos[index] = contatoEditado;
        this.fonteDados.data = [...this.pessoa.contatos];
      }
    });
  }

  public configurarFormulario() {
    this.formPessoa = this.fb.group({
      nome: ['', [Validators.required, this.validarTamanhoMinimo(5)]],
      endereco: this.fb.group({
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: ['', Validators.required],
        cep: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]]
      })
    });
  }

  get editando(): boolean {
    return !!this.pessoa?.codigo;
  }

  public carregarPessoa(codigo: number) {
    this.pessoaService.buscarPessoaPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarFormulario();
        this.atualizarTituloEdicao();

        this.fonteDados.data = pessoa.contatos || [];
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  public atualizarFormulario() {
    this.formPessoa.patchValue({
      nome: this.pessoa.nome,
      endereco: {
        logradouro: this.pessoa.endereco.logradouro,
        numero: this.pessoa.endereco.numero,
        complemento: this.pessoa.endereco.complemento,
        bairro: this.pessoa.endereco.bairro,
        cep: this.pessoa.endereco.cep,
        cidade: this.pessoa.endereco.cidade,
        estado: this.pessoa.endereco.estado
      }
    });
  }

  public validarTamanhoMinimo = (valor: number) => {
    return (input: FormControl) => {
      const inputValor = (input.value || '').trim();
      return inputValor.length >= valor
        ? null
        : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  public salvar(): void {
    if (this.formPessoa.invalid) {
      this.formPessoa.markAllAsTouched();
      return;
    }

    this.pessoa.nome = this.formPessoa.value.nome;
    this.pessoa.endereco = this.formPessoa.value.endereco;

    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa();
    }
  }

  public adicionarPessoa() {
    this.pessoaService.adicionarPessoa(this.pessoa)
      .then(pessoaAdicionada => {
        this.toastr.success('Pessoa adicionada com sucesso!');
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  public atualizarPessoa() {
    this.pessoaService.atualizarPessoa(this.pessoa)
      .then(pessoaAtualizada => {
        this.pessoa = pessoaAtualizada;
        this.toastr.success('Pessoa alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  public novo() {
    this.pessoa = new Pessoa();
    this.formPessoa.reset();
    this.router.navigate(['/pessoas/novo']);
  }

  public atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoas: ${this.pessoa.nome}`);
  }

  public onEstadoInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.formPessoa.get('endereco.estado')?.setValue(input.value, { emitEvent: false });
  }

}
