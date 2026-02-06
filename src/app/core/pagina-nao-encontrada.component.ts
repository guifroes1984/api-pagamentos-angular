import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
    <div class="min-vh-100 bg-light d-flex align-items-center pt-3">
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-lg-8 col-xl-6">
            
            <div class="card shadow-lg border-0 rounded-4 overflow-hidden">
              
              <div class="card-header py-4" style="
                background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
                border-bottom: 0;
              ">
                <div class="text-center text-white">
                  <i class="bi bi-search display-1 mb-3"></i>
                  <h1 class="h2 fw-bold mb-2">Página Não Encontrada</h1>
                  <p class="opacity-75 mb-0">A página que você está procurando não existe ou foi movida</p>
                </div>
              </div>

              <div class="card-body p-4 p-md-5">
                <div class="alert alert-secondary border-secondary bg-secondary-subtle mb-4">
                  <div class="d-flex align-items-center">
                    <i class="bi bi-question-circle-fill fs-3 text-secondary me-3"></i>
                    <div class="text-start">
                      <h5 class="alert-heading mb-1">Erro 404</h5>
                      <p class="mb-0">Não foi possível encontrar o recurso solicitado.</p>
                    </div>
                  </div>
                </div>

                <div class="text-center my-4">
                  <i class="bi bi-emoji-dizzy display-1 text-muted"></i>
                </div>

                <div class="card border-light mb-4">
                  <div class="card-body text-center">
                    <h6 class="card-title text-muted mb-3">
                      <i class="bi bi-compass me-2"></i>
                      Possíveis causas
                    </h6>
                    <ul class="list-unstyled text-start mb-0">
                      <li class="mb-2">
                        <i class="bi bi-dot text-primary me-2"></i>
                        O endereço digitado pode estar incorreto
                      </li>
                      <li class="mb-2">
                        <i class="bi bi-dot text-primary me-2"></i>
                        A página pode ter sido removida ou renomeada
                      </li>
                      <li class="mb-2">
                        <i class="bi bi-dot text-primary me-2"></i>
                        Você pode não ter permissão para acessar este recurso
                      </li>
                      <li>
                        <i class="bi bi-dot text-primary me-2"></i>
                        Pode ser um erro temporário do sistema
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="alert alert-light border">
                  <div class="d-flex">
                    <i class="bi bi-lightbulb-fill text-warning me-3 mt-1"></i>
                    <div>
                      <p class="mb-2">
                        <strong>Sugestões para resolver:</strong>
                      </p>
                      <p class="mb-0 small">
                        Verifique se o endereço está correto, use a barra de navegação acima 
                        ou retorne à página inicial para continuar navegando.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="d-grid gap-3 mt-4">
                  <button class="btn btn-primary btn-lg" (click)="voltarParaHome()">
                    <i class="bi bi-house-door me-2"></i>
                    Voltar para o Painel
                  </button>
                  
                  <button class="btn btn-outline-secondary" (click)="voltarPaginaAnterior()">
                    <i class="bi bi-arrow-left me-2"></i>
                    Voltar à página anterior
                  </button>
                  
                  <button class="btn btn-outline-info" (click)="irParaContato()">
                    <i class="bi bi-headset me-2"></i>
                    Relatar problema
                  </button>
                </div>

                <div class="text-center mt-4 pt-3 border-top">
                  <small class="text-muted">
                    <i class="bi bi-info-circle me-1"></i>
                    Ainda com problemas? 
                    <a href="javascript:void(0)" class="text-decoration-none" (click)="irParaContato()">
                      Entre em contato com o suporte
                    </a>
                  </small>
                </div>
              </div>

              <div class="card-footer py-3 bg-light text-center">
                <small class="text-muted">
                  <i class="bi bi-shield-check me-1"></i>
                  Sistema de Controle Financeiro • Erro 404
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .min-vh-100 { min-height: 100vh; }
    .bg-light { background-color: #f8f9fa !important; }
    .rounded-4 { border-radius: 1rem !important; }
    .shadow-lg { box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important; }
    .overflow-hidden { overflow: hidden !important; }
    .bg-secondary-subtle { background-color: rgba(108, 117, 125, 0.1) !important; }
    .bg-secondary { background-color: #6c757d !important; }
    .border-secondary { border-color: #6c757d !important; }
    .text-secondary { color: #6c757d !important; }
    .text-muted { color: #6c757d !important; }
    .btn-lg { padding: 0.75rem 1.5rem; font-size: 1.1rem; }
    .d-grid { display: grid !important; }
    .gap-3 { gap: 1rem !important; }
    .border-light { border-color: #e9ecef !important; }
    .text-warning { color: #ffc107 !important; }
    .opacity-75 { opacity: 0.75 !important; }
    
    .list-unstyled li {
      padding: 0.25rem 0;
    }
    
    @media (max-width: 768px) {
      .display-1 { font-size: 3.5rem !important; }
      .card-body { padding: 1.5rem !important; }
    }
  `]
})
export class PaginaNaoEncontradaComponent {

  constructor(private router: Router) { }

  voltarParaHome(): void {
    this.router.navigate(['/painel-controle']);
  }

  voltarPaginaAnterior(): void {
    window.history.back();
  }

  irParaContato(): void {
    alert('Entre em contato com o suporte técnico:\n\nEmail: suporte@sistema.com\nTelefone: (11) 99999-9999');
  }
}