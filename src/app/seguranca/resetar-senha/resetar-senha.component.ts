import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SenhaService } from '../senha.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-resetar-senha',
  templateUrl: './resetar-senha.component.html',
  styleUrls: ['./resetar-senha.component.css']
})
export class ResetarSenhaComponent {

  loading = false;
  formResetar!: FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private senhaService: SenhaService,
    private toastr: ToastrService,
    private router: Router, 
    private title: Title
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')!;

    this.formResetar = this.fb.group({
      novaSenha: ['', [Validators.required]],
      confirmarSenha: ['', Validators.required]
    }, { validators: this.senhasIguais });

    this.title.setTitle('Redefinir Senha');
  }

  senhasIguais(group: AbstractControl): ValidationErrors | null {
    const senha = group.get('novaSenha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { senhasDiferentes: true };
  }

  public enviar() {
    if (this.formResetar.invalid) return;

    this.loading = true;

    const dto = {
      token: this.token,
      novaSenha: this.formResetar.value.novaSenha
    };

    this.senhaService.resetarSenha(dto).then(() => {
      this.toastr.success('Senha redefinida com sucesso!');
      this.router.navigate(['/login']);
    }).catch(() => {
      this.toastr.error('Erro ao redefinir senha. Verifique o link ou tente novamente.');
    }).finally(() => {
      setTimeout(() => {
        this.loading = false;
      }, 800);
    });
  }

}
