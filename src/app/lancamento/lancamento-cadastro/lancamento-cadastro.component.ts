import { Component, OnInit } from '@angular/core';

import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoa/pessoa.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  recebimentoModel: Date | null = null;
  vencimentoModel: Date | null = null;
  tipoSelecionado: string | null = null;
  descricaoModel: string = '';
  pagamentoModel: string = '';

  vencimento: Date | null = null;

  valor: number = 0;

  categoriaSelecionada: string = '';
  pessoaSelecionada: string = '';
  filtroPessoa: string = '';

  categorias: any[] = [];
  pessoas: any[] = [];

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

  salvar() {
    
  }

}
