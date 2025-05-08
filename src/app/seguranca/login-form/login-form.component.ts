import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  
  formLogin: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formLogin = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onLogin() {
    const { usuario, senha } = this.formLogin.value;
    console.log('Login com:', usuario, senha);
    //this.formLogin.get('senha')?.reset();
  }
}
