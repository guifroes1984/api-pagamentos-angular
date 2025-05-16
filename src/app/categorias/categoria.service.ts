import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }

  listarTodasCategorias(): Promise<any> {
    
    return firstValueFrom(
      this.http.get(this.categoriaUrl));
  }

}
