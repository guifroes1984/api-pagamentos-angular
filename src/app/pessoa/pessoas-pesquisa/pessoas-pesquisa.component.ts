import { Component, ErrorHandler, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PessoaService } from '../pessoa.service';
import { NomeFiltro } from 'src/app/core/model/nome-filtro';

import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

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

  constructor(
    private pessoaService: PessoaService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de pessoas');
    this.pesquisar();
  }

  public pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;
    this.filtro.itensPorPagina = this.itensPorPagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => this.atualizarTabela(resultado))
      .catch(erro => this.errorHandler.handle(erro));
  }

  private atualizarTabela(resultado: any): void {
    this.fonteDados.data = resultado.content;
    this.totalRegistros = resultado.totalElements;
    this.paginaAtual = resultado.number;

    if (this.paginator) {
      this.paginator.pageIndex = this.paginaAtual;
    }
  }

  public habilitarPaginacao(): boolean {
    return this.totalRegistros > this.itensPorPagina;
  }

  public onPaginar(event: PageEvent): void {
    this.itensPorPagina = event.pageSize;
    this.paginaAtual = event.pageIndex;
    this.pesquisar(this.paginaAtual);
  }

  public limpar(): void {
    this.filtro = new NomeFiltro();
    this.itensPorPagina = 5;
    this.paginaAtual = 0;
    this.fonteDados.data = [];
    this.pesquisar();
  }

  public excluir(codigo: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        titulo: 'Confirmação de exclusão',
        mensagem: 'Tem certeza que deseja excluir esse item?'
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;

      this.pessoaService.excluir(codigo)
        .then(() => {
          this.toastr.success('Pessoa excluída com sucesso!');
          this.pesquisar(this.paginaAtual);
        })
        .catch(erro => this.errorHandler.handle(erro));
    });
  }

  public alterarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        pessoa.ativo = novoStatus;
        const acao = novoStatus ? 'ativada' : 'desativada';
        this.toastr.success(`Pessoa ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
