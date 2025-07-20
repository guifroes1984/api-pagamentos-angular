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

  emailEnviado = false;
  loading = false;
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

  public enviar() {
    if (this.formRecuperar.invalid) return;

    const email = this.formRecuperar.value.email;
    this.loading = true;

    this.authService.esqueciSenha(email).subscribe({
      next: () => {
        this.formRecuperar.reset();
        this.formRecuperar.get('email')?.setErrors(null);
        this.formRecuperar.get('email')?.markAsPristine();
        this.formRecuperar.get('email')?.markAsUntouched();

        this.loading = false;
        this.emailEnviado = true;
        this.toastr.success('Instruções enviadas para seu e-mail.');
      },
      error: () => {
        this.toastr.error('Erro ao enviar instruções. Verifique o e-mail informado.');
        this.loading = false;
      }
    });
  }
}
