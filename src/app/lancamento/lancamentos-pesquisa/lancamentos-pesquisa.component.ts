import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  fonteDados = new MatTableDataSource<any>();
  colunasExibidas = ['pessoa', 'descricao', 'dataVencimento', 'dataPagamento', 'valor', 'acoes'];
  
  totalRegistros = 0;
  itensPorPagina = 5;
  paginaAtual = 0;

  filtro = new LancamentoFiltro();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private lancamentoService: LancamentoService, 
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;
    this.filtro.itensPorPagina = this.itensPorPagina;
    this.lancamentoService.pesquisar(this.filtro).then(resultado => {
      this.fonteDados.data = resultado.lancamentos;
      this.totalRegistros = resultado.totalElements;
      this.paginaAtual = resultado.number;
      if (this.paginator) {
        this.paginator.pageIndex = this.paginaAtual;
      }
    });
  }

  habilitarPaginacao() {
    return this.totalRegistros > 5;
  }

  onPaginar(event: PageEvent): void {
    this.itensPorPagina = event.pageSize;
    this.paginaAtual = event.pageIndex;
    this.pesquisar(this.paginaAtual);
  }

  limpar(): void {
    this.filtro = new LancamentoFiltro();
    this.itensPorPagina = 5;
    this.paginaAtual = 0;
    this.fonteDados.data = [];
    this.pesquisar();
  }

  excluir(codigo: number) {
    this.lancamentoService.excluir(codigo)
      .then(() => {
        this.toastr.success('Lançamento excluído com sucesso!');
        this.pesquisar();
      });
  }

}
