import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoa/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { Title } from '@angular/platform-browser';

import { IFormComPendencias } from 'src/app/core/guards/formComPendencias';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit, IFormComPendencias {

  public categorias: any[] = [];
  public pessoas: any[] = [];
  public filtroPessoa: string = '';

  formLancamento!: FormGroup;

  filtroPessoaCtrl = new FormControl('');

  public arquivoSelecionado: File | null = null;
  public uploadEmAndamento = false;
  public anexoRemovido = false;

  private dadosOriginais: any;
  public formEnviado = true;

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];


  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }
  
  ngOnInit(): void {
    this.configurarFormulario();
    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo lançamento');
    
    if (codigoLancamento) {
      this.carregarLancamentos(codigoLancamento);
    } else {
      this.dadosOriginais = this.formLancamento.value;
    }
    
    this.carregarCategorias();
    this.carregarPessoas();

    this.formLancamento.valueChanges.subscribe(() => {
      if (this.formLancamento.pristine) {
        this.formLancamento.markAsDirty();
      }
    });
  }

  get formulario(): FormGroup {
    return this.formLancamento;
  }
  
  public podeDesativar(): boolean {
    return !this.formLancamento.dirty || 
           JSON.stringify(this.formLancamento.value) === JSON.stringify(this.dadosOriginais);
  }

  public configurarFormulario() {
    this.formLancamento = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: [],
      anexo: this.formBuilder.group({
        codigo: [],
        nome: [],
        tipo: []
      })
    });
  }

  public validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  public validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      const inputValor = input.value || '';
      if (!inputValor) return null;
      return inputValor.length >= valor ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  public get editando(): boolean {
    return !!this.formLancamento.get('codigo')?.value;
  }

  public carregarLancamentos(codigo: number) {
    this.lancamentoService.buscarLancamentoPorCodigo(codigo)
      .then(lancamento => {
        this.formLancamento.patchValue(lancamento);
        this.dadosOriginais = this.formLancamento.value;

        if (lancamento.anexo) {
          this.formLancamento.get('anexo')?.patchValue({
            codigo: lancamento.anexo.codigo,
            nome: lancamento.anexo.nome,
            tipo: lancamento.anexo.tipo
          });
        }

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  public async salvar(): Promise<void> {
    try {
      this.formEnviado = false;
      this.uploadEmAndamento = true;

      const codigo = this.formLancamento.get('codigo')?.value;

      if (this.editando && this.anexoRemovido && codigo) {
        await this.lancamentoService.deletarAnexo(codigo);
        this.anexoRemovido = false;
      }

      let lancamentoSalvo: any;

      if (this.editando) {
        await this.atualizarLancamento();

        if (this.arquivoSelecionado) {
          lancamentoSalvo = await this.lancamentoService.atualizarAnexo(codigo, this.arquivoSelecionado);
          this.formLancamento.patchValue(lancamentoSalvo);
          this.arquivoSelecionado = null;
        }

      } else if (this.arquivoSelecionado) {
        lancamentoSalvo = await this.lancamentoService.adicionarLancamentoComAnexo(this.criarFormData());
        this.formLancamento.patchValue(lancamentoSalvo);
        this.arquivoSelecionado = null;
        this.router.navigate(['/lancamentos', lancamentoSalvo.codigo]);

      } else {
        await this.adicionarLancamento();
      }

      this.dadosOriginais = this.formLancamento.value;
      this.formLancamento.markAsPristine();
      this.formEnviado = true;

    } catch (erro) {
      this.formEnviado = false;
      this.errorHandler.handle(erro);
    } finally {
      this.uploadEmAndamento = false;
    }
  }

  private criarFormData(): FormData {
    const formData = new FormData();
    formData.append('lancamento', JSON.stringify(this.formLancamento.value));
    formData.append('file', this.arquivoSelecionado!);
    return formData;
  }

  public adicionarLancamento() {
    this.lancamentoService.adicionarLancamento(this.formLancamento.value)
      .then(lancamentoAdicionado => {
        this.toastr.success('Lançamento adicionado com sucesso!');
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  public atualizarLancamento() {
    this.lancamentoService.atualizarLancamento(this.formLancamento.value)
      .then(lancamentoAtualizado => {
        this.formLancamento.patchValue(lancamentoAtualizado);
        this.toastr.success('Lançamento alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  public carregarCategorias() {
    return this.categoriaService.listarTodasCategorias()
      .then((categorias: any[]) => {
        this.categorias = categorias.map(c => ({
          codigo: c.codigo,
          nome: c.nome
        }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  public carregarPessoas() {
    return this.pessoaService.listarTodasPessoas()
      .then((resposta: any) => {
        const pessoas = resposta.content || [];
        this.pessoas = pessoas.map((p: any) => ({
          label: p.nome,
          value: p.codigo
        }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  public novo() {
    if (this.podeDesativar() || confirm('Deseja descartar as alterações não salvas?')) {
      this.configurarFormulario();
      this.dadosOriginais = this.formLancamento.value;
      this.router.navigate(['/lancamentos/novo']);
      this.title.setTitle('Novo lançamento');
    }
  }

  public atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formLancamento.get('descricao')?.value}`);
  }

  public aoSelecionarArquivo(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.arquivoSelecionado = input.files[0];

      this.uploadEmAndamento = true;

      setTimeout(() => {
        this.uploadEmAndamento = false;
        this.formLancamento.patchValue({
          anexo: {
            nome: this.arquivoSelecionado?.name,
            tipo: this.arquivoSelecionado?.type,
            codigo: null
          }
        });
      }, 2000);
    }
  }

  public adicionarLancamentoComAnexo(): void {
    const formData = new FormData();
    formData.append('lancamento', JSON.stringify(this.formLancamento.value));
    formData.append('file', this.arquivoSelecionado!);

    this.lancamentoService.adicionarLancamentoComAnexo(formData)
      .then(lancamentoAdicionado => {
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  public baixarAnexo(): void {
    const codigo = this.formLancamento.get('codigo')?.value;

    this.lancamentoService.downloadAnexo(codigo)
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = this.formLancamento.get('anexo.nome')?.value || 'anexo.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  public removerAnexo() {
    this.anexoRemovido = true;
    this.formLancamento.get('anexo')?.reset();
    this.arquivoSelecionado = null;
  }

  public removerArquivoSelecionado() {
    this.arquivoSelecionado = null;
    this.formLancamento.get('anexo')?.reset();
  }

  public visualizarArquivoSelecionado() {
    if (this.arquivoSelecionado) {
      const url = URL.createObjectURL(this.arquivoSelecionado);
      window.open(url, '_blank');
    }
  }

}
