import { Component } from '@angular/core';
import { Pessoa } from 'src/app/core/model/pessoa';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent {

  // nomeModel: string = '';
  // logradouroModel: string = '';
  // numeroModel: string = '';
  // bairroModel: string = '';
  // cepModel: string = '';
  // cidadeModel: string = '';
  // estadoModel: string = '';
  // complementoModel: string = '';

  public pessoa = new Pessoa();

  salvar() {
    console.log(this.pessoa);
  }

}
