import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Categoria } from '../core/model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl: string;

  constructor(private http: HttpClient) {
    this.categoriaUrl = `${environment.apiUrl}/categorias`;
  }

  public listarTodasCategorias(): Promise<any> {

    return firstValueFrom(
      this.http.get(this.categoriaUrl));
  }

  public buscarPorCodigo(codigo: number): Promise<Categoria> {
    return firstValueFrom(
      this.http.get<Categoria>(`${this.categoriaUrl}/${codigo}`));
  }

  public adicionar(categoria: Categoria): Promise<Categoria> {
    return firstValueFrom(
      this.http.post<Categoria>(this.categoriaUrl, categoria));
  }

  public atualizar(codigo: number, categoria: Categoria): Promise<Categoria> {
    return firstValueFrom(
      this.http.put<Categoria>(`${this.categoriaUrl}/${codigo}`, categoria));
  }
  
  public excluir(codigo: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.categoriaUrl}/${codigo}`));
  }

}
