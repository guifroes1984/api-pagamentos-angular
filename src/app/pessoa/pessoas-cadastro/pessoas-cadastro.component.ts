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
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Estado } from 'src/app/core/model/estado';
import { HttpClient } from '@angular/common/http';
import { Cidade } from 'src/app/core/model/cidade';

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

  cidades: Cidade[] = [];
  estados: { label: string; value: number }[] = [];
  estadosFiltrados: { label: string; value: number }[] = [];
  filtroEstadoCtrl = new FormControl('');

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

    // Desabilita o campo cidade inicialmente
    this.formPessoa.get('endereco.cidade')?.disable();

    this.carregarEstados();

    this.filtroEstadoCtrl.valueChanges.subscribe(termo => {
      this.filtrarEstados(termo);
    });

    this.formPessoa.get('endereco.estado')?.valueChanges.subscribe(codigoEstado => {
      const cidadeControl = this.formPessoa.get('endereco.cidade');

      if (codigoEstado) {
        // Habilita o campo cidade e carrega as cidades
        cidadeControl?.enable();
        this.carregarCidades(codigoEstado);
      } else {
        // Limpa e desabilita o campo cidade
        this.cidades = [];
        cidadeControl?.reset();
        cidadeControl?.disable();
      }
    });

    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova pessoa');

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  private carregarEstados() {
    this.pessoaService.listarEstados().then(lista => {
      this.estados = lista.map(uf => ({ label: uf.nome, value: uf.codigo }));
      this.estadosFiltrados = [...this.estados];
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

  public async carregarCidades(codigoEstado: number): Promise<void> {
    try {
      const cidades = await this.pessoaService.listarCidadesPorEstado(codigoEstado);
      this.cidades = cidades;
      this.formPessoa.get('endereco.cidade')?.reset();
    } catch (erro) {
      this.errorHandler.handle(erro);
    }
  }

  public filtrarEstados(termo: string | null) {
    const termoTratado = (termo || '').toLowerCase();
    this.estadosFiltrados = this.estados.filter(estado =>
      estado.label.toLowerCase().includes(termoTratado)
    );
  }

  public prepararNovoContato() {
    const dialogRef = this.dialog.open(NovoContatoDialogComponent, {
      width: '600px',
      data: {
        contatosExistentes: this.pessoa.contatos || []
      }
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado?.acao === 'adicionar') {
        if (!this.pessoa.contatos) {
          this.pessoa.contatos = [];
        }
        this.pessoa.contatos.push(resultado.contato);
        this.atualizarTabelaContatos();
        this.toastr.success(`Contato ${resultado.contato.nome} adicionado com sucesso!`);
      }
    });
  }

  public editarContato(index: number): void {
    const contatoOriginal = this.pessoa.contatos[index];

    const dialogRef = this.dialog.open(NovoContatoDialogComponent, {
      width: '600px',
      data: {
        contato: { ...contatoOriginal },
        contatosExistentes: this.pessoa.contatos,
        editando: true
      }
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado?.acao === 'editar') {
        this.pessoa.contatos[index] = resultado.contato;
        this.atualizarTabelaContatos();
        this.toastr.success(`Contato ${resultado.contato.nome} atualizado com sucesso!`);
      }
    });
  }

  private atualizarTabelaContatos(): void {
    this.fonteDados.data = [...this.pessoa.contatos];
  }

  public excluirContato(index: number): void {
    const contato = this.pessoa.contatos[index];
    const contatoNome = contato?.nome || 'Contato';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        titulo: 'Confirmação',
        mensagem: `Deseja realmente excluir o contato: ${contatoNome}?`,
        textoConfirmar: 'Excluir',
        corConfirmar: 'warn'
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.pessoa.contatos.splice(index, 1);
        this.atualizarTabelaContatos();
        this.toastr.success(`Contato ${contatoNome} excluído com sucesso!`);
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
        cidade: [''],
        estado: ['']
      })
    });
  }

  get editando(): boolean {
    return !!this.pessoa?.codigo;
  }

  public carregarPessoa(codigo: number) {
    this.pessoaService.buscarPessoaPorCodigo(codigo)
      .then(async pessoa => {
        this.pessoa = pessoa;

        const estadoCodigo = pessoa.endereco?.cidade?.estado?.codigo;
        const cidadeCodigo = pessoa.endereco?.cidade?.codigo;

        this.atualizarFormulario();
        this.atualizarTituloEdicao();
        this.fonteDados.data = pessoa.contatos || [];

        if (estadoCodigo) {
          this.formPessoa.get('endereco.estado')?.setValue(estadoCodigo);
          await this.carregarCidades(estadoCodigo);
          this.formPessoa.get('endereco.cidade')?.setValue(cidadeCodigo);
        }
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
      }
    });

    if (this.pessoa.endereco.estado?.codigo) {
      this.carregarCidades(this.pessoa.endereco.estado.codigo);
    }

  }

  public validarTamanhoMinimo(tamanho: number) {
    return (input: FormControl) => {
      const valor = input.value || '';
      if (!valor) return null;
      return valor.length >= tamanho ? null : { tamanhoMinimo: { tamanho } };
    };
  }

  public salvar(): void {
    if (this.formPessoa.invalid) {
      this.formPessoa.markAllAsTouched();
      return;
    }

    this.pessoa.nome = this.formPessoa.value.nome;
    const enderecoForm = this.formPessoa.value.endereco;

    const codigoCidade = enderecoForm.cidade;
    const cidadeSelecionada = this.cidades.find(c => c.codigo === codigoCidade);

    const enderecoParaSalvar: any = {
      logradouro: enderecoForm.logradouro,
      numero: enderecoForm.numero,
      complemento: enderecoForm.complemento,
      bairro: enderecoForm.bairro,
      cep: enderecoForm.cep,
      cidade: cidadeSelecionada
    };

    delete enderecoParaSalvar.estado;

    this.pessoa.endereco = enderecoParaSalvar;

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
