import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent {

  nomeModel: string = '';
  logradouroModel: string = '';
  numeroModel: string = '';
  bairroModel: string = '';
  cepModel: string = '';
  cidadeModel: string = '';
  estadoModel: string = '';
  complementoModel: string = '';

  salvar() {
    
  }

}
