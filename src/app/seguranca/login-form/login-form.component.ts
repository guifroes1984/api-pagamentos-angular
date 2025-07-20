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

  loading = false;
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private title: Title
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
    if (this.formLogin.invalid) return;

    this.loading = true;
    this.formLogin.disable();

    setTimeout(() => {
      const { usuario, senha } = this.formLogin.getRawValue();
      this.auth.login(usuario, senha)
        .then(() => {
          this.loading = false;
          this.formLogin.enable();
          this.router.navigate(['/painel-controle']);
        })
        .catch(error => {
          this.loading = false;
          this.formLogin.enable();

          if (error === 'Usuário ou senha inválida!') {
            this.formLogin.get('usuario')?.reset();
            this.formLogin.get('usuario')?.setErrors(null);
            this.formLogin.get('usuario')?.markAsPristine();
            this.formLogin.get('usuario')?.markAsUntouched();

            this.formLogin.get('senha')?.reset();
            this.formLogin.get('senha')?.setErrors(null);
            this.formLogin.get('senha')?.markAsPristine();
            this.formLogin.get('senha')?.markAsUntouched();
          }

          this.errorHandler.handle(error);
        });
    }, 1000);
  }
}
