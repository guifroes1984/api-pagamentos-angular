import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = ['pessoa', 'descricao', 'dataVencimento', 'dataPagamento', 'valor'];

  lancamentos = [
    { descricao: 'Compra de pão', dataVencimento: '30/06/2025', dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José' },
    { descricao: 'Venda de software', dataVencimento: '10/06/2024', dataPagamento: '09/06/2024', valor: 80000, pessoa: 'Atacado Brasil' },
    { descricao: 'Impostos', dataVencimento: '20/07/2024', dataPagamento: null, valor: 14312, pessoa: 'Ministério da Fazenda' },
    { descricao: 'Mensalidade de escola', dataVencimento: '06/05/2024', dataPagamento: '30/05/2024', valor: 800, pessoa: 'Escola Abelha Rainha' },
    { descricao: 'Venda de carro', dataVencimento: '18/08/2024', dataPagamento: null, valor: 55000, pessoa: 'Sebastião Souza' },
    { descricao: 'Aluguel', dataVencimento: '18/07/2024', dataPagamento: '09/07/2024', valor: 1750, pessoa: 'Casa Nova Imóveis' },
    { descricao: 'Mensalidade musculação', dataVencimento: '13/07/2024', dataPagamento: null, valor: 180, pessoa: 'Academia Top' }
  ];
}

