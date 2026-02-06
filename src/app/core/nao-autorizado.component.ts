import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../seguranca/auth.service';

@Component({
  selector: 'app-pagina-nao-autorizado',
  template: `
    <div class="min-vh-100 bg-light d-flex align-items-center pt-3">
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-lg-8 col-xl-6">

            <div class="card shadow-lg border-0 rounded-4 overflow-hidden">

              <div class="card-header py-4" style="
                background: linear-gradient(135deg, #dc3545 0%, #b02a37 100%);
                border-bottom: 0;
              ">
                <div class="text-center text-white">
                  <i class="bi bi-shield-lock display-1 mb-3"></i>
                  <h1 class="h2 fw-bold mb-2">Acesso Restrito</h1>
                  <p class="opacity-75 mb-0">Permissão insuficiente para acessar este recurso</p>
                </div>
              </div>

              <div class="card-body p-4 p-md-5">
                <div class="alert alert-warning border-warning bg-warning-subtle mb-4">
                  <div class="d-flex align-items-center">
                    <i class="bi bi-exclamation-triangle-fill fs-3 text-warning me-3"></i>
                    <div class="text-start">
                      <h5 class="alert-heading mb-1">Permissão Requerida</h5>
                      <p class="mb-0">Você não possui as permissões necessárias para acessar esta página.</p>
                    </div>
                  </div>
                </div>

                <div class="text-center my-4">
                  <i class="bi bi-person-x display-1 text-danger"></i>
                </div>

                <div class="card border-light mb-4">
                  <div class="card-body">
                    <h6 class="card-title text-muted mb-3">
                      <i class="bi bi-person-circle me-2"></i>
                      Informações da sua conta
                    </h6>
                    <div class="row text-start">
                      <div class="col-md-6 mb-2">
                        <small class="text-muted">Usuário:</small>
                        <p class="mb-0 fw-semibold">{{ usuarioNome || 'Não identificado' }}</p>
                      </div>
                      <div class="col-md-6 mb-2">
                        <small class="text-muted">Perfil:</small>
                        <p class="mb-0 fw-semibold">
                          <span class="badge" 
                        [class.bg-danger]="usuarioPerfil === 'Administrador'"
                        [class.bg-primary]="usuarioPerfil === 'Usuário Padrão'"
                        [class.bg-secondary]="usuarioPerfil === 'Visitante'">
                        {{ usuarioPerfil }}
                      </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="alert alert-info border-info bg-info-subtle">
                  <div class="d-flex">
                    <i class="bi bi-info-circle-fill text-info me-3 mt-1"></i>
                    <div>
                      <p class="mb-2">
                        <strong>Por que isso aconteceu?</strong>
                      </p>
                      <p class="mb-0 small">
                        Esta página requer permissões específicas que sua conta não possui.
                        Se você acredita que deveria ter acesso, entre em contato com o administrador do sistema.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="d-grid gap-3 mt-4">
                  <button class="btn btn-primary btn-lg" (click)="voltarParaHome()">
                    <i class="bi bi-house-door me-2"></i>
                    Voltar para o Painel
                  </button>
                  
                  <button class="btn btn-outline-danger" (click)="solicitarAcesso()">
                    <i class="bi bi-envelope me-2"></i>
                    Solicitar Acesso
                  </button>
                  
                  <button class="btn btn-outline-secondary" (click)="irParaLogin()">
                    <i class="bi bi-box-arrow-right me-2"></i>
                    Fazer Login com outra conta
                  </button>
                </div>

                <div class="text-center mt-4 pt-3 border-top">
                  <small class="text-muted">
                    <i class="bi bi-question-circle me-1"></i>
                    Precisa de ajuda? 
                    <a href="javascript:void(0)" class="text-decoration-none" (click)="solicitarAcesso()">
                      Entre em contato com o suporte
                    </a>
                  </small>
                </div>
              </div>

              <div class="card-footer py-3 bg-light text-center">
                <small class="text-muted">
                  <i class="bi bi-shield-check me-1"></i>
                  Sistema de Controle Financeiro • Acesso Seguro
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .min-vh-100 {
      min-height: 100vh;
    }
    
    .bg-light {
      background-color: #f8f9fa !important;
    }
    
    .rounded-4 {
      border-radius: 1rem !important;
    }
    
    .shadow-lg {
      box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
    }
    
    .overflow-hidden {
      overflow: hidden !important;
    }
    
    .bg-warning-subtle {
      background-color: rgba(255, 193, 7, 0.1) !important;
    }
    
    .bg-info-subtle {
      background-color: rgba(13, 202, 240, 0.1) !important;
    }
    
    .btn-lg {
      padding: 0.75rem 1.5rem;
      font-size: 1.1rem;
    }
    
    .d-grid {
      display: grid !important;
    }
    
    .gap-3 {
      gap: 1rem !important;
    }
    
    .border-light {
      border-color: #e9ecef !important;
    }
    
    .border-warning {
      border-color: #ffc107 !important;
    }
    
    .border-info {
      border-color: #0dcaf0 !important;
    }
    
    .text-warning {
      color: #ffc107 !important;
    }
    
    .text-info {
      color: #0dcaf0 !important;
    }
    
    .text-danger {
      color: #dc3545 !important;
    }
    
    .opacity-75 {
      opacity: 0.75 !important;
    }
    
    /* Responsividade */
    @media (max-width: 768px) {
      .display-1 {
        font-size: 3.5rem !important;
      }
      
      .card-body {
        padding: 1.5rem !important;
      }
    }
  `]
})
export class PaginaNaoAutorizadoComponent implements OnInit {

  usuarioNome: string = '';
  usuarioPerfil: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarInformacoesUsuario();
  }

  private carregarInformacoesUsuario(): void {
    if (this.authService.jwtPayload) {
      this.usuarioNome = this.authService.jwtPayload.nome || 'Não identificado';

      if (this.authService.temPermissao('ROLE_CADASTRAR_CATEGORIA')) {
        this.usuarioPerfil = 'Administrador';
      } else if (this.authService.temPermissao('ROLE_PESQUISAR_CATEGORIA')) {
        this.usuarioPerfil = 'Usuário Padrão';
      } else {
        this.usuarioPerfil = 'Visitante';
      }
    }
  }

  voltarParaHome(): void {
    this.router.navigate(['/painel-controle']);
  }

  irParaLogin(): void {
    this.router.navigate(['/login']);
  }

  solicitarAcesso(): void {
    alert('Para solicitar acesso, entre em contato com o administrador do sistema.\n\nEmail: admin@sistema.com');
  }
}