import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
  pessoas: any[] = [];
  totalRegistros = 0;
  totalPaginas = 0;

  filtro = new NomeFiltro();

  constructor(
    private pessoaService: PessoaService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de pessoas');
    this.filtro.pagina = 0;
    this.pesquisar(0);
  }

  public pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => this.atualizarTabela(resultado))
      .catch(erro => this.errorHandler.handle(erro));
  }

  private atualizarTabela(resultado: any): void {
    this.pessoas = JSON.parse(JSON.stringify(resultado.content));
    this.totalRegistros = resultado.totalElements;
    this.totalPaginas = resultado.totalPages;
  }

  public mudarPagina(pagina: number): void {
    if (pagina >= 0 && pagina < this.totalPaginas) {
      this.filtro.pagina = pagina;
      this.pesquisar(pagina);
    }
  }

  public limpar(): void {
    this.filtro = new NomeFiltro();
    this.pessoas = [];
    this.pesquisar();
  }

  public excluir(codigo: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        titulo: 'Confirmação de exclusão',
        mensagem: 'Tem certeza que deseja excluir essa pessoa?'
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;

      this.pessoaService.excluir(codigo)
        .then(() => {
          this.toastr.success('Pessoa excluída com sucesso!');
          this.pesquisar(this.filtro.pagina);
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
