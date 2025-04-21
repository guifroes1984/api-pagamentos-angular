import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit, AfterViewInit {

  constructor(private lancamentoService: LancamentoService) {}

  colunasExibidas: string[] = ['pessoa', 'descricao', 'dataVencimento', 'dataPagamento', 'valor', 'acoes'];

  descricao: string = '';
  dataVencimentoInicio: Date | null = null; // Inicializado como null
  dataVencimentoFim: Date | null = null;    // Inicializado como null
  lancamentos = [];

  fonteDados = new MatTableDataSource(this.lancamentos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.pesquisar();
  }

  ngAfterViewInit(): void {
    this.fonteDados.paginator = this.paginator;
  }

  pesquisar(): void {

    let filtro: LancamentoFiltro = {
      descricao: this.descricao, 
      dataVencimentoInicio: this.dataVencimentoInicio, 
      dataVencimentoFim: this.dataVencimentoFim
    }

    this.lancamentoService.pesquisar(filtro)
      .then(lancamentos => {
        this.lancamentos = lancamentos;
        this.fonteDados.data = this.lancamentos;
      });
  }

  limpar(): void {
    this.descricao = '';
    this.dataVencimentoInicio = null;
    this.dataVencimentoFim = null;
    this.pesquisar();
  }

}
