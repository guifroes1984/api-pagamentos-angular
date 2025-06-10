import { Component, OnInit } from '@angular/core';
import { PainelControleService } from '../painel-controle.service';

@Component({
  selector: 'app-painel-controle',
  templateUrl: './painel-controle.component.html',
  styleUrls: ['./painel-controle.component.css']
})
export class PainelControleComponent implements OnInit {

  dadosGraficoPizza: any;

  dadosGraficoLinha = {
    labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    datasets: [
      {
        label: 'Receitas',
        data: [4, 10, 18, 5, 1, 20, 3],
        borderColor: '#3366CC',
        fill: false
      },
      {
        label: 'Despesas',
        data: [10, 15, 8, 5, 1, 7, 9],
        borderColor: '#D62B00',
        fill: false
      }
    ]
  };

  constructor(
    private painelControleService: PainelControleService
  ) { }

  ngOnInit(): void {
    this.configurarGraficoPizza();
  }

  public configurarGraficoPizza() {
    this.painelControleService.lancamentosPorCategoria()
      .then(dados => {
        console.log('Dados retornados da API:', dados);
        this.dadosGraficoPizza = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', 
                                  '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      });
  }

}
