import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../categoria.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { Categoria } from 'src/app/core/model/categoria';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PessoaService } from 'src/app/pessoa/pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-categoria-listagem',
  templateUrl: './categoria-listagem.component.html',
  styleUrls: ['./categoria-listagem.component.css']
})
export class CategoriaListagemComponent implements OnInit {
  categorias: Categoria[] = [];
  carregando = false;
  filtro: string = '';

  // Permissões
  podeCadastrar = false;
  podePesquisar = false;
  podeExcluir = false;

  // Paginação
  paginaAtual = 1;
  itensPorPagina = 5;
  totalItens = 0;

  constructor(
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService, 
    private title: Title
  ) { }

  ngOnInit(): void {
    this.verificarPermissoes();
    if (this.podePesquisar) {
      this.carregarCategorias();
    }
    this.title.setTitle('Pesquisa de categorias');
  }

  private verificarPermissoes(): void {
    this.podeCadastrar = this.authService.temPermissao('ROLE_CADASTRAR_CATEGORIA');
    this.podePesquisar = this.authService.temPermissao('ROLE_PESQUISAR_CATEGORIA');
    this.podeExcluir = this.authService.temPermissao('ROLE_CADASTRAR_CATEGORIA');
  }

  carregarCategorias(): void {
    if (!this.podePesquisar) {
      this.toastr.warning('Você não tem permissão para visualizar categorias', 'Acesso Restrito');
      return;
    }

    this.carregando = true;

    this.categoriaService.listarTodasCategorias()
      .then(categorias => {
        this.categorias = categorias;
        this.totalItens = categorias.length;
        this.carregando = false;
      })
      .catch(erro => {
        console.error('Erro ao carregar categorias:', erro);
        this.toastr.error('Erro ao carregar categorias', 'Erro');
        this.carregando = false;
      });
  }

  novaCategoria(): void {
    this.router.navigate(['/categorias/nova']);
  }

  editarCategoria(codigo: number): void {
    this.router.navigate(['/categorias', codigo]);
  }

  // Filtro
  get categoriasFiltradas(): Categoria[] {
    if (!this.filtro.trim()) {
      return this.categorias;
    }

    const termo = this.filtro.toLowerCase();
    return this.categorias.filter(categoria => {
      const nome = categoria.nome?.toLowerCase() || '';
      const codigo = categoria.codigo?.toString() || '';

      return nome.includes(termo) || codigo.includes(termo);
    });
  }

  // Paginação
  get categoriasPaginadas(): Categoria[] {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.categoriasFiltradas.slice(inicio, fim);
  }

  mudarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaAtual = pagina;
  }

  get totalPaginas(): number {
    return Math.ceil(this.categoriasFiltradas.length / this.itensPorPagina);
  }

  limparFiltro(): void {
    this.filtro = '';
    this.paginaAtual = 1;
    this.carregarCategorias();
  }

  // Helper para exibir código seguro
  getCodigoSeguro(categoria: Categoria): string {
    return categoria.codigo?.toString() || 'N/A';
  }

  // Helper para verificar se pode editar/excluir
  podeEditarExcluir(categoria: Categoria): boolean {
    return this.podeCadastrar && !!categoria.codigo;
  }

  public excluir(categoria: Categoria): void {
    if (!categoria?.codigo) {
      this.toastr.error('Categoria inválida', 'Erro');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        titulo: 'Confirmação de exclusão',
        mensagem: `Deseja realmente excluir a categoria "${categoria.nome}"?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.categoriaService.excluir(categoria.codigo)
          .then(() => {
            this.toastr.success('Categoria excluída com sucesso!', 'Sucesso');
            this.carregarCategorias();
          })
          .catch(erro => {
            console.error('Erro ao excluir categoria:', erro);

            if (erro.status === 403) {
              this.toastr.error(
                'Você não tem permissão para excluir categorias',
                'Acesso Negado'
              );
            } else if (
              erro.status === 400 &&
              erro.error?.message?.includes('em uso')
            ) {
              this.toastr.error(
                'Esta categoria está em uso e não pode ser excluída',
                'Erro'
              );
            } else {
              this.toastr.error('Erro ao excluir categoria', 'Erro');
            }
          });
      }
    });
  }

  // Método para calcular exibição
  calcularExibicao(): string {
    if (this.categoriasFiltradas.length === 0) {
      return '0';
    }

    const inicio = (this.paginaAtual - 1) * this.itensPorPagina + 1;
    const fim = Math.min(this.paginaAtual * this.itensPorPagina, this.categoriasFiltradas.length);

    return `${inicio} a ${fim}`;
  }
}