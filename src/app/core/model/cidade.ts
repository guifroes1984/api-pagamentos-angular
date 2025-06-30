import { Estado } from "./estado";

export class Cidade {
    codigo!: number;
    nome!: string;
    estado = new Estado();
}