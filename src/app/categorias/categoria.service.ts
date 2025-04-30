import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');
    
    return firstValueFrom(
      this.http.get(this.categoriaUrl, { headers }));
  }

}
