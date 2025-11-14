import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
import { Cidade } from 'src/app/core/model/cidade';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PessoasCadastroComponent implements OnInit, AfterViewInit {

  pessoa = new Pessoa();
  cidades: Cidade[] = [];
  estados: EstadoOption[] = [];
  estadosFiltrados: EstadoOption[] = [];
  cidadesFiltradas: Cidade[] = [];
  private dadosOriginais: any;

  formPessoa!: FormGroup;
  formEnviado = true;

  fonteDados = new MatTableDataSource<any>();
  readonly colunasExibidas = ['nome', 'email', 'telefone', 'acoes'];

  readonly filtroEstadoCtrl = new FormControl('');
  readonly filtroCidadeCtrl = new FormControl('');
  cidadeFiltro = '';

  @ViewChild('inputFiltroEstado') inputFiltroEstado!: ElementRef<HTMLInputElement>;
  @ViewChild('inputFiltroCidade') inputFiltroCidade!: ElementRef<HTMLInputElement>;
  @ViewChild('selectEstado') selectEstado!: MatSelect;
  @ViewChild('selectCidade') selectCidade!: MatSelect;

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
    this.inicializarComponente();
    if (!this.editando) {
      this.resetarFormulario();
    }
  }

  ngAfterViewInit(): void {
    this.configurarFocoInputs();
  }

  private inicializarComponente(): void {
    this.configurarFormulario();
    this.configurarObservables();
    this.carregarEstados();
    this.carregarPessoaSeExistir();
  }

  private configurarFormulario(): void {
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

    this.formPessoa.get('endereco.cidade')?.disable();
  }

  private configurarObservables(): void {
    this.filtroEstadoCtrl.valueChanges.subscribe(termo => {
      this.filtrarEstados(termo);
    });

    this.filtroCidadeCtrl.valueChanges.subscribe(valor => {
      this.filtrarCidadesPorTermo(valor);
    });

    this.formPessoa.get('endereco.estado')?.valueChanges.subscribe(codigoEstado => {
      this.handleEstadoSelecionado(codigoEstado);
    });
  }

  private configurarFocoInputs(): void {
    this.selectEstado.openedChange.subscribe(opened => {
      this.focarInputAoAbrir(opened, this.inputFiltroEstado);
    });

    this.selectCidade.openedChange.subscribe(opened => {
      this.focarInputAoAbrir(opened, this.inputFiltroCidade);
    });
  }

  private focarInputAoAbrir(aberto: boolean, input: ElementRef<HTMLInputElement>): void {
    if (aberto) {
      setTimeout(() => input.nativeElement.focus(), 0);
    }
  }

  private carregarPessoaSeExistir(): void {
    const codigoPessoa = this.route.snapshot.params['codigo'];
    this.title.setTitle('Nova pessoa');

    if (codigoPessoa) {
      this.carregarPessoa(Number(codigoPessoa));
    } else {
      this.dadosOriginais = this.formPessoa.getRawValue();
    }
  }

  private carregarEstados(): void {
    this.pessoaService.listarEstados()
      .then(estados => {
        this.estados = estados.map(uf => ({ label: uf.nome, value: uf.codigo }));
        this.estadosFiltrados = [...this.estados];
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  public async carregarCidades(codigoEstado: number): Promise<void> {
    try {
      this.cidades = await this.pessoaService.listarCidadesPorEstado(codigoEstado);
      this.cidadesFiltradas = this.cidades;

      if (!this.editando) {
        this.resetarFiltroCidade();
      } else {
        this.formPessoa.get('endereco.cidade')?.enable();
      }
    } catch (erro) {
      this.errorHandler.handle(erro);
    }
  }

  private resetarFiltroCidade(): void {
    this.cidadeFiltro = '';
    this.filtroCidadeCtrl.setValue('');
    this.formPessoa.get('endereco.cidade')?.reset();
  }

  public filtrarEstados(termo: string | null): void {
    const termoTratado = (termo || '').toLowerCase();
    this.estadosFiltrados = this.estados.filter(estado =>
      estado.label.toLowerCase().includes(termoTratado)
    );
  }

  private filtrarCidadesPorTermo(termo: string | null): void {
    const termoTratado = (termo || '').toLowerCase();
    this.cidadesFiltradas = this.cidades.filter(c =>
      c.nome.toLowerCase().includes(termoTratado)
    );
  }

  private handleEstadoSelecionado(codigoEstado: number): void {
    const cidadeControl = this.formPessoa.get('endereco.cidade');

    if (codigoEstado) {
      cidadeControl?.enable();
      this.carregarCidades(codigoEstado);
    } else {
      this.limparCidades(cidadeControl);
    }
  }

  private limparCidades(controleCidade: AbstractControl | null): void {
    this.cidades = [];
    controleCidade?.reset();
    controleCidade?.disable();
  }

  public prepararNovoContato(): void {
    const dialogRef = this.dialog.open(NovoContatoDialogComponent, {
      width: '600px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        contatosExistentes: this.pessoa.contatos || []
      }
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      this.processarResultadoContato(resultado);
    });
  }

  private processarResultadoContato(resultado: any): void {
    if (resultado?.acao === 'adicionar') {
      this.adicionarContato(resultado.contato);
    }
  }

  private adicionarContato(contato: any): void {
    if (!this.pessoa.contatos) {
      this.pessoa.contatos = [];
    }

    this.pessoa.contatos.push(contato);
    this.atualizarTabelaContatos();
    this.toastr.success(`Contato ${contato.nome} adicionado com sucesso!`);
  }

  public editarContato(index: number): void {
    const contatoOriginal = this.pessoa.contatos[index];

    const dialogRef = this.dialog.open(NovoContatoDialogComponent, {
      width: '600px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        contato: { ...contatoOriginal },
        contatosExistentes: this.pessoa.contatos,
        editando: true
      }
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado?.acao === 'editar') {
        this.atualizarContato(index, resultado.contato);
      }
    });
  }

  private atualizarContato(index: number, contato: any): void {
    this.pessoa.contatos[index] = contato;
    this.atualizarTabelaContatos();
    this.toastr.success(`Contato ${contato.nome} atualizado com sucesso!`);
  }

  public excluirContato(index: number): void {
    const contato = this.pessoa.contatos[index];
    const contatoNome = contato?.nome || 'Contato';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      maxWidth: '95vw',
      panelClass: 'no-scroll-dialog',
      disableClose: true,
      hasBackdrop: true,
      data: {
        titulo: 'Excluir Contato',
        mensagem: `Deseja realmente excluir o contato: ${contatoNome}?`,
        textoConfirmar: 'Excluir',
        cancelarLabel: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.removerContato(index, contatoNome);
      }
    });
  }

  private removerContato(index: number, nomeContato: string): void {
    this.pessoa.contatos.splice(index, 1);
    this.atualizarTabelaContatos();
    this.toastr.success(`Contato ${nomeContato} excluído com sucesso!`);
  }

  private atualizarTabelaContatos(): void {
    this.fonteDados.data = [...this.pessoa.contatos];
  }

  public carregarPessoa(codigo: number): void {
    this.pessoaService.buscarPessoaPorCodigo(codigo)
      .then(async pessoa => {
        this.pessoa = pessoa;
        await this.configurarPessoaCarregada(pessoa);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private async configurarPessoaCarregada(pessoa: Pessoa): Promise<void> {
    this.atualizarFormulario(pessoa);
    this.fonteDados.data = pessoa.contatos || [];

    const estadoCodigo = pessoa.endereco?.cidade?.estado?.codigo;
    const cidadeCodigo = pessoa.endereco?.cidade?.codigo;

    if (estadoCodigo) {
      await this.carregarCidades(estadoCodigo);

      this.formPessoa.patchValue({
        endereco: {
          estado: estadoCodigo,
          cidade: cidadeCodigo
        }
      });
    }

    this.formPessoa.markAsPristine();
    this.dadosOriginais = this.formPessoa.getRawValue();
    this.atualizarTituloEdicao();
  }

  private atualizarFormulario(pessoa: Pessoa): void {
    this.formPessoa.patchValue({
      nome: pessoa.nome,
      endereco: {
        logradouro: pessoa.endereco.logradouro,
        numero: pessoa.endereco.numero,
        complemento: pessoa.endereco.complemento,
        bairro: pessoa.endereco.bairro,
        cep: pessoa.endereco.cep,
      }
    });
  }

  public salvar(): void {
    if (this.formPessoa.invalid) {
      this.marcarFormularioComoInvalido();
      return;
    }

    this.formEnviado = false;
    this.prepararPessoaParaSalvar();

    this.editando ? this.atualizarPessoa() : this.adicionarPessoa();
  }

  private marcarFormularioComoInvalido(): void {
    this.formPessoa.markAllAsTouched();
    this.formEnviado = false;
  }

  private prepararPessoaParaSalvar(): void {
    this.pessoa.nome = this.formPessoa.value.nome;
    this.pessoa.endereco = this.prepararEndereco();
  }

  private prepararEndereco(): any {
    const enderecoForm = this.formPessoa.value.endereco;
    const cidadeSelecionada = this.cidades.find(c => c.codigo === enderecoForm.cidade);

    return {
      logradouro: enderecoForm.logradouro,
      numero: enderecoForm.numero,
      complemento: enderecoForm.complemento,
      bairro: enderecoForm.bairro,
      cep: enderecoForm.cep,
      cidade: cidadeSelecionada
    };
  }

  private adicionarPessoa(): void {
    this.pessoaService.adicionarPessoa(this.pessoa)
      .then(pessoaAdicionada => {
        this.processarSucessoSalvamento('adicionada', pessoaAdicionada);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private atualizarPessoa(): void {
    this.pessoaService.atualizarPessoa(this.pessoa)
      .then(pessoaAtualizada => {
        this.pessoa = pessoaAtualizada;
        this.processarSucessoSalvamento('alterada');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private processarSucessoSalvamento(acao: string, pessoa?: Pessoa): void {
    this.toastr.success(`Pessoa ${acao} com sucesso!`);
    this.formEnviado = true;
    this.formPessoa.markAsPristine();
    this.dadosOriginais = this.formPessoa.getRawValue();

    this.router.navigate(['/pessoas']);
  }

  get editando(): boolean {
    return Boolean(this.pessoa?.codigo);
  }

  public podeDesativar(): boolean {
    const formIgualOriginal = JSON.stringify(this.formPessoa.getRawValue()) ===
      JSON.stringify(this.dadosOriginais);
    return !this.formPessoa.dirty && formIgualOriginal;
  }

  public validarTamanhoMinimo(tamanho: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value || '';
      return valor.length >= tamanho ? null : { tamanhoMinimo: { tamanho } };
    };
  }

  public novo(): void {
    this.router.navigate(['/pessoas/novo']);
    this.title.setTitle('Nova pessoa');
  }

  private resetarFormulario(): void {
    this.pessoa = new Pessoa();
    this.formPessoa.reset();
    this.formPessoa.markAsPristine();
    this.dadosOriginais = this.formPessoa.getRawValue();
  }

  public atualizarTituloEdicao(): void {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }
}

interface EstadoOption {
  label: string;
  value: number;
}
