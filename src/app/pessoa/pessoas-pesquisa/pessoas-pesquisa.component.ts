import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NomeFiltro, PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  fonteDados = new MatTableDataSource<any>();
  colunasExibidas: string[] = ['pessoa', 'cidade', 'estado', 'status', 'acoes'];

  totalRegistros = 0;
  itensPorPagina = 5;
  paginaAtual = 0;

  filtro = new NomeFiltro();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;
    this.filtro.itensPorPagina = this.itensPorPagina;

    this.pessoaService.pesquisar(this.filtro).then(resultado => {
      this.fonteDados.data = resultado.content;
      this.totalRegistros = resultado.totalElements;
      this.paginaAtual = resultado.number;
      if (this.paginator) {
        this.paginator.pageIndex = this.paginaAtual;
      }
    });
  }

  habilitarPaginacao(): boolean {
    return this.totalRegistros > 5;
  }

  onPaginar(event: PageEvent): void {
    this.itensPorPagina = event.pageSize;
    this.paginaAtual = event.pageIndex;
    this.pesquisar(this.paginaAtual);
  }

  limpar(): void {
    this.filtro = new NomeFiltro();
    this.itensPorPagina = 5;
    this.paginaAtual = 0;
    this.fonteDados.data = [];
    this.pesquisar();
  }

  excluir(codigo: number): void {
    this.pessoaService.excluir(codigo)
      .then(() => {
        this.pesquisar();
      })
  }

}
