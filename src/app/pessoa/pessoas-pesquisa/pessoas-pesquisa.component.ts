import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  constructor(private pessoaService: PessoaService) { }
  
  colunasExibidas: string[] = ['pessoa', 'cidade', 'estado', 'status', 'acoes'];
  
  pessoas = [];
  
  fonteDados = new MatTableDataSource(this.pessoas);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.pesquisar();
  }
  
  ngAfterViewInit() {
    this.fonteDados.paginator = this.paginator;
  }

  pesquisar() {
    this.pessoaService.pesquisar()
      .then(response => {
        this.pessoas = response.content;
        this.fonteDados.data = response.content;
      });
  }
  

}
