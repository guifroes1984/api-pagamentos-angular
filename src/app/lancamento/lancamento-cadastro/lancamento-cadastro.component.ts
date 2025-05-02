import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoa/pessoa.service';
import { Lancamento } from 'src/app/core/model/lancamento';

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
    private categoriaService: CategoriaService, 
    private pessoaService: PessoaService, 
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.caregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: NgForm) {
    console.log(this.lancamento);
  }

  caregarCategorias() {
    return this.categoriaService.listarTodasCategorias()
      .then((categorias: any[]) => {
        this.categorias = categorias.map((cat: any) => ({ 
          label: cat.nome, 
          value: cat.codigo 
        }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
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
