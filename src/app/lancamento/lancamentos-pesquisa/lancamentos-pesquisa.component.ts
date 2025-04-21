import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit, AfterViewInit {

  constructor(private lancamentoService: LancamentoService) {}

  colunasExibidas: string[] = ['pessoa', 'descricao', 'dataVencimento', 'dataPagamento', 'valor', 'acoes'];

  descricao: string = '';
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
    this.lancamentoService.pesquisar({ descricao: this.descricao })
      .then(lancamentos => {
        this.lancamentos = lancamentos;
        this.fonteDados.data = this.lancamentos; // ✅ atualiza a tabela com os novos dados
      });
  }
}
