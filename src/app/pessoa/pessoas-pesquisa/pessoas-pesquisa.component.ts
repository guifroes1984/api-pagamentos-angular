import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  colunasExibidas: string[] = ['pessoa', 'cidade', 'estado', 'status', 'acoes'];

  pessoas = [
    { nome: 'Ana Costa', endereco: { cidade: 'Belo Horizonte', estado: 'MG' }, ativo: true },
    { nome: 'Lucas Mendes', endereco: { cidade: 'Porto Alegre', estado: 'RS' }, ativo: false },
    { nome: 'Carla Lima', endereco: { cidade: 'Recife', estado: 'PE' }, ativo: true },
    { nome: 'Rafael Souza', endereco: { cidade: 'Curitiba', estado: 'PR' }, ativo: true },
    { nome: 'Mariana Ferreira', endereco: { cidade: 'Salvador', estado: 'BA' }, ativo: false },
    { nome: 'Thiago Rocha', endereco: { cidade: 'Fortaleza', estado: 'CE' }, ativo: true },
    { nome: 'Isabela Martins', endereco: { cidade: 'Manaus', estado: 'AM' }, ativo: false}
  ];

  fonteDados = new MatTableDataSource(this.pessoas);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.fonteDados.paginator = this.paginator;
  }
}
