import { Cidade } from "./cidade";
import { Estado } from "./estado";

export class Endereco {
    logradouro!:  string;
    numero!:      string;
    complemento!: string;
    bairro!:      string;
    cep!:         string;
    cidade?: Cidade;
    estado = new Estado();
}