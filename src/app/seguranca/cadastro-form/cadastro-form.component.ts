import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CadastroService } from '../cadastro.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrls: ['./cadastro-form.component.css']
})
export class CadastroFormComponent implements OnInit {

  formCadastro: FormGroup;

  constructor(
    private fb:              FormBuilder,
    private cadastroService: CadastroService,
    private toastr:          ToastrService,
    private router:          Router, 
    private title:           Title
  ) {
    this.formCadastro = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-zÀ-ÿ\\s]+$')]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { 
    this.title.setTitle('Cadastro de usuário');
  }

  public cadastrarUsuario() {
    if (this.formCadastro.invalid) return;

    const dados = this.formCadastro.value;

    this.cadastroService.cadastrarUsuario(dados)
    .then(() => {
      this.toastr.success('Cadastro realizado com sucesso!');
      this.router.navigate(['/login']);
    })
    .catch(erro => {
      const msg = erro.error?.[0].mensagemUsuario || 'Erro ao realizar cadastro.';
      this.toastr.error(msg);
    });
  }

  public permitirSomenteLetras(event: KeyboardEvent) {
    const regex = /^[A-Za-zÀ-ÿ\s]$/;
    const inputChar = event.key;

    if (!regex.test(inputChar)) {
      event.preventDefault();
    }
  }

}
