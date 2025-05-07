import { Component, OnInit, ViewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { PessoaService } from 'src/app/pessoa/pessoa.service';

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

  public filtro = new LancamentoFiltro();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private lancamentoService: LancamentoService, 
    private pessoaService:     PessoaService, 
    private toastr:            ToastrService, 
    private dialog:            MatDialog, 
    private errorHandler:      ErrorHandlerService, 
    private title:             Title
  ) {}

  ngOnInit(): void {
    this.pesquisar();
    this.title.setTitle('Pesquisa de lançamentos');
  }

  public pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;
    this.filtro.itensPorPagina = this.itensPorPagina;
    this.lancamentoService.pesquisar(this.filtro).then(resultado => {
      this.fonteDados.data = resultado.lancamentos;
      this.totalRegistros = resultado.totalElements;
      this.paginaAtual = resultado.number;
      if (this.paginator) {
        this.paginator.pageIndex = this.paginaAtual;
      }
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  public habilitarPaginacao() {
    return this.totalRegistros > 5;
  }

  onPaginar(event: PageEvent): void {
    this.itensPorPagina = event.pageSize;
    this.paginaAtual = event.pageIndex;
    this.pesquisar(this.paginaAtual);
  }

  public limpar(): void {
    this.filtro = new LancamentoFiltro();
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
        titulo: 'Confirmação de Exclusão',
        mensagem: 'Tem certeza que deseja excluir este item?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lancamentoService.excluir(codigo)
          .then(() => {
            this.toastr.success('Lançamento excluído com sucesso!');
            this.pesquisar();
          })
          .catch(erro => this.errorHandler.handle(erro));
      }
    });
    
  }

}
