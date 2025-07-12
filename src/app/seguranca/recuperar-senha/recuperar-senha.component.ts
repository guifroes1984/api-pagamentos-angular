import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent {
  formRecuperar!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.formRecuperar = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  enviar() {
    const email = this.formRecuperar.value.email;

    this.authService.esqueciSenha(email).subscribe({
      next: () => {
        this.toastr.success('Instruções enviadas para seu e-mail.');
        this.formRecuperar.reset();
      },
      error: () => {
        this.toastr.error('Erro ao enviar instruções. Verifique o e-mail informado.');
      }
    });
  }
}
