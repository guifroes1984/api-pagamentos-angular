import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  constructor(private lancamentoService: LancamentoService) {}
  
  colunasExibidas: string[] = ['pessoa', 'descricao', 'dataVencimento', 'dataPagamento', 'valor', 'acoes'];
  
  lancamentos = [];
  
  fonteDados = new MatTableDataSource(this.lancamentos);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngOnInit(): void {
    this.pesquisar();
  }

  ngAfterViewInit() {
      this.fonteDados.paginator = this.paginator;
    }

    pesquisar() {
      this.lancamentoService.pesquisar()
        .then(lancamentos => this.lancamentos = lancamentos);
    }

}
