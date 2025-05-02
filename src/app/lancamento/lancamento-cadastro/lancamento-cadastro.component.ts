import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoa/pessoa.service';
import { Lancamento } from 'src/app/core/model/lancamento';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  public lancamento = new Lancamento();

  public categorias: any[] = [];
  public pessoas: any[] = [];
  public filtroPessoa: string = '';


  tipos = [
    { label: 'Receita', value: 'RECEITA'}, 
    { label: 'Despesa', value: 'DESPESA'}
  ];


  constructor(
    private categoriaService:  CategoriaService, 
    private pessoaService:     PessoaService, 
    private errorHandler:      ErrorHandlerService, 
    private lancamentoService: LancamentoService, 
    private toastr:            ToastrService
  ) { }

  ngOnInit(): void {
    this.caregarCategorias();
    this.carregarPessoas();
  }

  public salvar(form: NgForm) {
    this.lancamentoService.adicionarLancamento(this.lancamento)
    .then(() => {
      this.toastr.success('Lançamento adicionado com sucesso!');

      this.lancamento = new Lancamento();
      form.resetForm(this.lancamento);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  public caregarCategorias() {
    return this.categoriaService.listarTodasCategorias()
      .then((categorias: any[]) => {
        this.categorias = categorias.map((cat: any) => ({ 
          label: cat.nome, 
          value: cat.codigo 
        }));
      })
    .catch(erro => this.errorHandler.handle(erro));
  }

  public carregarPessoas() {
    return this.pessoaService.listarTodasPessoas()
      .then((resposta: any) => {
        const pessoas = resposta.content || [];
        if (Array.isArray(pessoas)) {
          this.pessoas = pessoas.map((p: any) => ({
            label: p.nome,
            value: p.codigo
          }));
        }
      })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
