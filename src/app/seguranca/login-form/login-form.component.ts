import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder, 
    public auth: AuthService
  ) {

    this.formLogin = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  public login() {
    const { usuario, senha } = this.formLogin.value;
    this.auth.login(usuario, senha);
  }
}
