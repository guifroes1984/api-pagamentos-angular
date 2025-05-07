import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PessoaService } from '../pessoa.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { Pessoa } from 'src/app/core/model/pessoa';
import { Title } from '@angular/platform-browser';

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
    private route:             ActivatedRoute, 
    private router:                    Router, 
    private title:                      Title
  ) { }

  public pessoa = new Pessoa();

  ngOnInit(): void {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova pessoa');

    if (codigoPessoa) {
      this.carregarPessoas(codigoPessoa);
    }
  }
  
  public get editando(): boolean {
    return !!this.pessoa?.codigo;
  }

  public salvar(form: NgForm): void {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  public adicionarPessoa(form: NgForm) {
    this.pessoaService.adicionarPessoa(this.pessoa)
    .then(pessoaAdicionada => {
      this.toastr.success('Pessoa adicionada com sucesso!');
      this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  public carregarPessoas(codigo: number) {
    this.pessoaService.buscarPessoaPorCodigo(codigo)
      .then(definirPessoa => {
        this.pessoa = definirPessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  public atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizarPessoa(this.pessoa)
      .then(pessoaAtualizada => {
        this.pessoa = pessoaAtualizada;

        this.toastr.success('Pessoa alterada com sucesso!')
        this.atualizarTituloEdicao();
      })
    .catch(erro => this.errorHandler.handle(erro));
  }

  public novo(form: NgForm) {
    form.resetForm(this.pessoa);
    this.pessoa = new Pessoa();
    this.router.navigate(['/pessoas/novo']);
  }

  public atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoas: ${this.pessoa.nome}`);
  }

}
