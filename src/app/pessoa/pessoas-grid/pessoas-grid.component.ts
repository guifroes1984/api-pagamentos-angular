import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas: any[] = [];

  colunasExibidas = ['pessoa', 'cidade', 'estado', 'status', 'acoes'];
  
  fonteDados = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
      this.fonteDados.paginator = this.paginator;
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['pessoas'] && this.pessoas) {
        this.fonteDados.data = this.pessoas;
      }
    }

}
