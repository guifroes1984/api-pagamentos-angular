import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PessoaService } from '../pessoa.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { Pessoa } from 'src/app/core/model/pessoa';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent {

  constructor(
    private pessoaService:      PessoaService, 
    private errorHandler: ErrorHandlerService, 
    private toastr:             ToastrService, 
    private route:             ActivatedRoute
  ) { }

  public pessoa = new Pessoa();

  ngOnInit(): void {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    if (codigoPessoa) {
      this.carregarPessoas(codigoPessoa);
    }
  }

  public salvar(form: NgForm) {
    this.pessoaService.adicionarPessoa(this.pessoa)
    .then(() => {
      this.toastr.success('Pessoa adicionada com sucesso!');
      form.resetForm(new Pessoa());
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  public editando(): boolean {
    return !!this.pessoa?.codigo;
  }

  public carregarPessoas(codigo: number) {
    this.pessoaService.buscarPessoaPorCodigo(codigo)
      .then(definirPessoa => {
        this.pessoa = definirPessoa;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
