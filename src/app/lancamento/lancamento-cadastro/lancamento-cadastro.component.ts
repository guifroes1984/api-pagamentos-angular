import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoa/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  public categorias: any[] = [];
  public pessoas: any[] = [];
  public filtroPessoa: string = '';

  formulario!: FormGroup;

  filtroPessoaCtrl = new FormControl('');

  public arquivoSelecionado: File | null = null;
  public uploadEmAndamento = false;

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
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  public configurarFormulario() {
    this.formulario = this.formBuilder.group({
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

      return inputValor.length >= valor ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  public get editando(): boolean {
    return !!this.formulario.get('codigo')?.value;
  }

  public carregarLancamentos(codigo: number) {
    this.lancamentoService.buscarLancamentoPorCodigo(codigo)
      .then(lancamento => {
        this.formulario.patchValue(lancamento);

        // Garantir que anexo está no formulário
        if (lancamento.anexo) {
          this.formulario.get('anexo')?.patchValue({
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
      this.uploadEmAndamento = true;

      if (this.editando) {
        await this.atualizarLancamento();

        if (this.arquivoSelecionado) {
          const codigo = this.formulario.get('codigo')?.value;
          await this.lancamentoService.atualizarAnexo(codigo, this.arquivoSelecionado);
        }

      } else if (this.arquivoSelecionado) {
        await this.adicionarLancamentoComAnexo();

      } else {
        await this.adicionarLancamento();
      }
    } catch (erro) {
      this.errorHandler.handle(erro);
    } finally {
      this.uploadEmAndamento = false;
    }
  }

  public adicionarLancamento() {
    this.lancamentoService.adicionarLancamento(this.formulario.value)
      .then(lancamentoAdicionado => {
        this.toastr.success('Lançamento adicionado com sucesso!');
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  public atualizarLancamento() {
    this.lancamentoService.atualizarLancamento(this.formulario.value)
      .then(lancamentoAtualizado => {
        this.formulario.patchValue(lancamentoAtualizado);
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
    this.configurarFormulario();
    this.router.navigate(['/lancamentos/novo']);
    this.title.setTitle('Novo lancçamento');
  }

  public atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao')?.value}`);
  }

  public aoSelecionarArquivo(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.arquivoSelecionado = input.files[0];

      this.uploadEmAndamento = true;

      setTimeout(() => {
        this.uploadEmAndamento = false;
        this.formulario.patchValue({
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
    formData.append('lancamento', JSON.stringify(this.formulario.value));
    formData.append('file', this.arquivoSelecionado!);

    this.lancamentoService.adicionarLancamentoComAnexo(formData)
      .then(lancamentoAdicionado => {
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  public baixarAnexo(): void {
    const codigo = this.formulario.get('codigo')?.value;

    this.lancamentoService.downloadAnexo(codigo)
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = this.formulario.get('anexo.nome')?.value || 'anexo.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
