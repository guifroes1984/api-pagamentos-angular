import { Contato } from "./contato";
import { Endereco } from "./endereco";

export class Pessoa {
    codigo!: number;
    nome!: string;
    endereco = new Endereco();
    ativo = true;
    contatos = new Array<Contato>();
}