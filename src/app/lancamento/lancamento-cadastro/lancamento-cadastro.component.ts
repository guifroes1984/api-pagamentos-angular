import { Component } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent {

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

  tipos = [
    { label: 'Receita', value: 'RECEITA'}, 
    { label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [
    { label: 'Alimentação', value: 1 },
    { label: 'Transporte', value: 2 }
  ];

  pessoas = [
    { label: 'João da Silva', value: 1 },
    { label: 'Sebastião Souza', value: 2 },
    { label: 'Maria Abadia', value: 3 }
  ];

  salvar() {
    
  }

}
