import { Component, OnInit } from '@angular/core';

import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

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

  tipos = [
    { label: 'Receita', value: 'RECEITA'}, 
    { label: 'Despesa', value: 'DESPESA'}
  ];

  pessoas = [
    { label: 'João da Silva', value: 1 },
    { label: 'Sebastião Souza', value: 2 },
    { label: 'Maria Abadia', value: 3 }
  ];

  constructor(
    private categoriaService: CategoriaService, 
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.caregarCategorias();
  }

  caregarCategorias() {
    return this.categoriaService.listarTodas()
      .then((categorias: any[]) => {
        this.categorias = categorias.map((cat: any) => ({ 
          label: cat.nome, 
          value: cat.codigo 
        }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    
  }

}
