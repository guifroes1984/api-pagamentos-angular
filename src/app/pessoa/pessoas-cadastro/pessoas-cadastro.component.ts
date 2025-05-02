import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PessoaService } from '../pessoa.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { Pessoa } from 'src/app/core/model/pessoa';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent {

  constructor(
    private pessoaService:      PessoaService, 
    private errorHandler: ErrorHandlerService, 
    private toastr:             ToastrService
  ) { }

  public pessoa = new Pessoa();

  public salvar(form: NgForm) {
    this.pessoaService.adicionarPessoa(this.pessoa)
    .then(() => {
      this.toastr.success('Pessoa adicionada com sucesso!');
      form.resetForm(new Pessoa());
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

}
