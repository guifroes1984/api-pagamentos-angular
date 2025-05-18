import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl: string;

  constructor(private http: HttpClient) {
    this.categoriaUrl = `${environment.apiUrl}/categorias`;
   }

  listarTodasCategorias(): Promise<any> {
    
    return firstValueFrom(
      this.http.get(this.categoriaUrl));
  }

}
