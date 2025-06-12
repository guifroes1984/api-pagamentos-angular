import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  
  formLogin: FormGroup;

  constructor(
    private fb:           FormBuilder, 
    public auth:          AuthService, 
    private errorHandler: ErrorHandlerService, 
    private router:       Router, 
    private title:        Title
  ) {

    this.formLogin = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.title.setTitle('Login');
  }

  public login() {
    const { usuario, senha } = this.formLogin.value;
    this.auth.login(usuario, senha)
      .then(() => {
        this.router.navigate(['/painel-controle']);
      })
      .catch(error => {
        if (error === 'Usuário ou senha inválida!') {
          this.formLogin.get('senha')?.reset();
        }
      this.errorHandler.handle(error);
    });
  }
}
