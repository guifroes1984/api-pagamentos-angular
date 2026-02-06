import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Categoria } from 'src/app/core/model/categoria';
import { CategoriaService } from '../categoria.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-categoria-cadastro',
  templateUrl: './categoria-cadastro.component.html',
  styleUrls: ['./categoria-cadastro.component.css']
})
export class CategoriaCadastroComponent implements OnInit {
  formCategoria!: FormGroup;
  editando = false;
  carregando = false;
  codigoCategoria?: number;
  temPermissaoCadastro = false;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService, 
    private title: Title
  ) { }

  ngOnInit(): void {
    this.verificarPermissao();
    if (this.temPermissaoCadastro) {
      this.configurarFormulario();
      this.carregarDadosEdicao();
    } else {
      this.toastr.warning(
        'Apenas administradores podem cadastrar categorias',
        'Acesso Restrito',
        { timeOut: 4000, positionClass: 'toast-top-center' }
      );
    }
    this.title.setTitle('Cadastro de Categoria');
  }

  private verificarPermissao(): void {
    this.temPermissaoCadastro = this.authService.temPermissao('ROLE_CADASTRAR_CATEGORIA');
  }

  private configurarFormulario(): void {
    this.formCategoria = this.fb.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]]
    });
  }

  private carregarDadosEdicao(): void {
    this.route.params.subscribe(params => {
      if (params['codigo']) {
        this.codigoCategoria = +params['codigo'];
        this.editando = true;
        this.carregarCategoria(this.codigoCategoria);
      }
    });
    this.atualizarTituloEdicao();
  }

  private carregarCategoria(codigo: number): void {
    this.carregando = true;
    this.categoriaService.buscarPorCodigo(codigo)
      .then(categoria => {
        this.formCategoria.patchValue({
          nome: categoria.nome
        });
        this.title.setTitle(`Edição de Categoria: ${categoria.nome}`);
        this.carregando = false;
      })
      .catch(() => {
        this.carregando = false;
        this.toastr.error('Categoria não encontrada', 'Erro', { timeOut: 3000 });
        setTimeout(() => this.router.navigate(['/categorias']), 2000);
      });
  }

  salvar(): void {
    if (this.formCategoria.invalid) {
      this.marcarCamposComoTouch();

      if (this.nome?.hasError('required')) {
        this.toastr.warning('Informe o nome da categoria', 'Validação', { timeOut: 3000 });
      } else if (this.nome?.hasError('minlength')) {
        this.toastr.warning('Mínimo 3 caracteres', 'Validação', { timeOut: 3000 });
      } else if (this.nome?.hasError('maxlength')) {
        this.toastr.warning('Máximo 20 caracteres', 'Validação', { timeOut: 3000 });
      }

      return;
    }

    this.carregando = true;
    const categoria: Categoria = this.formCategoria.value;

    const operacao = this.editando && this.codigoCategoria
      ? this.categoriaService.atualizar(this.codigoCategoria, categoria)
      : this.categoriaService.adicionar(categoria);

    operacao
      .then(() => {
        if (this.editando) {
          this.toastr.success('Categoria atualizada com sucesso!', 'Sucesso', {
            timeOut: 3000,
            progressBar: true,
            closeButton: true
          });

          setTimeout(() => {
            this.router.navigate(['/categorias']);
          }, 2000);
        } else {
          this.toastr.success('Categoria cadastrada com sucesso!', 'Sucesso', {
            timeOut: 3000,
            progressBar: true,
            closeButton: true
          });

          setTimeout(() => {
            this.limparFormulario();
          }, 500);
        }
      })
      .catch(erro => {
        console.error('Erro ao salvar categoria:', erro);

        if (erro.status === 400) {
          this.toastr.error('Dados inválidos. Verifique as informações.', 'Erro', { timeOut: 4000 });
        } else if (erro.status === 403) {
          this.toastr.error('Você não tem permissão para esta ação', 'Acesso Negado', { timeOut: 4000 });
        } else {
          this.toastr.error('Erro ao salvar categoria. Tente novamente.', 'Erro', { timeOut: 4000 });
        }
      })
      .finally(() => {
        this.carregando = false;
      });
  }

  novo(): void {
    this.limparFormulario();
    this.title.setTitle('Cadastro de Categoria');
  }

  public atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formCategoria.get('nome')?.value}`);
  }

  private limparFormulario(): void {
    this.formCategoria.reset();
    this.editando = false;
    this.codigoCategoria = undefined;

    Object.values(this.formCategoria.controls).forEach(control => {
      control.markAsUntouched();
      control.markAsPristine();
    });

    setTimeout(() => {
      const input = document.querySelector('input[formControlName="nome"]') as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }, 100);
  }

  private marcarCamposComoTouch(): void {
    Object.values(this.formCategoria.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  get nome() {
    return this.formCategoria.get('nome');
  }
}