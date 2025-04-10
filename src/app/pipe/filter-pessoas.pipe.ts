import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPessoas'
})
export class FilterPessoasPipe implements PipeTransform {
  transform(pessoas: any[], filtro: string): any[] {
    if (!filtro) return pessoas;
    return pessoas.filter(p =>
      p.label.toLowerCase().includes(filtro.toLowerCase())
    );
  }
}
