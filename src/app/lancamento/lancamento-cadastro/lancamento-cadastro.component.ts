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

  tipos = [
    { label: 'Receita', value: 'RECEITA'}, 
    { label: 'Despesa', value: 'DESPESA'}
  ];


  constructor(
    private categoriaService:  CategoriaService, 
    private pessoaService:     PessoaService, 
    private errorHandler:      ErrorHandlerService, 
    private lancamentoService: LancamentoService, 
    private toastr:            ToastrService, 
    private route:             ActivatedRoute, 
    private router:            Router, 
    private title:             Title, 
    private formBuilder:       FormBuilder
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
      descricao: [null, [Validators.required, Validators.minLength(5)]], 
      valor: [null, Validators.required], 
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required], 
        nome: []
      }), 
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required], 
        nome: []
      }), 
      observacao: []
    });
  }

  public get editando(): boolean {
    return !!this.formulario.get('codigo')?.value;
  }

  public carregarLancamentos(codigo: number) {
    this.lancamentoService.buscarLancamentoPorCodigo(codigo)
      .then(definirLancamento => {
        this.formulario.patchValue(definirLancamento);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  public salvar(): void {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
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

}
