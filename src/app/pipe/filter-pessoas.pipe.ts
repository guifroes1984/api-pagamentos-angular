import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPessoas'
})
export class FilterPessoasPipe implements PipeTransform {
  transform(pessoas: any[], filtro: string): any[] {
    if (!Array.isArray(pessoas)) return [];
    if (!filtro) return pessoas;

    const filtroLower = filtro.toLowerCase();
    return pessoas.filter(p =>
      p.label?.toLowerCase().includes(filtroLower)
    );
  }
}
