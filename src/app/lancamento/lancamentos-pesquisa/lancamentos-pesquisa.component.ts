import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { PessoaService } from 'src/app/pessoa/pessoa.service';
import { AuthService } from 'src/app/seguranca/auth.service';

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
  public Math = Math;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private lancamentoService: LancamentoService,
    public auth: AuthService,
    private pessoaService: PessoaService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

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

  public formatarDataParaInput(data: any): string {
    if (!data) return '';

    if (typeof data === 'string' && data.includes('-')) {
      return data;
    }

    if (data instanceof Date) {
      return data.toISOString().split('T')[0];
    }

    if (typeof data === 'string' && data.includes('/')) {
      const partes = data.split('/');
      if (partes.length === 3) {
        return `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
      }
    }

    return '';
  }

  public onDataInicioChange(dataString: string): void {
    this.filtro.dataVencimentoInicio = this.converterStringParaDate(dataString);
  }

  public onDataFimChange(dataString: string): void {
    this.filtro.dataVencimentoFim = this.converterStringParaDate(dataString);
  }

  private converterStringParaDate(dataString: string): Date | undefined {
    if (!dataString) return undefined;

    try {
      const partes = dataString.split('-');
      if (partes.length === 3) {
        const ano = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10) - 1;
        const dia = parseInt(partes[2], 10);
        return new Date(ano, mes, dia);
      }
    } catch (error) {
      console.error('Erro ao converter data:', error);
    }

    return undefined;
  }

  public irParaPagina(pagina: number): void {
    if (pagina >= 0 && pagina < this.totalPaginas) {
      this.paginaAtual = pagina;
      this.pesquisar(this.paginaAtual);
    }
  }

  public mudarItensPorPagina(novoValor: string): void {
    this.itensPorPagina = Number(novoValor);
    this.paginaAtual = 0;
    this.pesquisar(this.paginaAtual);
  }

  public get totalPaginas(): number {
    return Math.ceil(this.totalRegistros / this.itensPorPagina);
  }

  public bloquearDigitacao(event: KeyboardEvent): void {
    const teclasPermitidas = [
      'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End', 'Enter', 'Escape', 'Backspace', 'Delete'
    ];

    if (event.ctrlKey || event.metaKey) {
      return;
    }

    if (!teclasPermitidas.includes(event.key)) {
      event.preventDefault();
    }
  }
}