import { Categoria } from "./categoria";
import { Pessoa } from "./pessoa";

export class Lancamento {
    codigo!: number;
    tipo: 'RECEITA' = 'RECEITA';
    descricao!: string;
    dataVencimento!: Date;
    dataPagamento!: Date;
    valor!: number;
    observacao!: string;
    pessoa = new Pessoa();
    categoria = new Categoria();
    anexo?: { 
        codigo: number; 
        nome: string; 
        tipo: string 
    };
}