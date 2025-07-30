import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let msg = '';

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof HttpErrorResponse) {
      if (errorResponse.status === 401) {
        msg = 'Sua sessão expirou!';
        this.router.navigate(['/login']);

      } else if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar a sua solicitação.';

      } else if (errorResponse.status === 0) {
        msg = 'Erro de conexão ou o arquivo enviado excede o limite de 5MB.';

      } else if (errorResponse.status >= 400 && errorResponse.status <= 499) {
        msg = 'Ocorreu um erro ao processar a sua solicitação.';

        try {
          const errors = errorResponse.error;

          if (Array.isArray(errors) && errors[0]?.mensagemUsuario?.includes('Arquivo muito grande')) {
            msg = errors[0].mensagemUsuario;

          } else if (errors && errors.length > 0 && errors[0].mensagemUsuario) {
            msg = errors[0].mensagemUsuario;
          }

          if (
            msg === 'Operação não permitida' &&
            errors[0].mensagemDesenvolvedor?.includes('lancamento_ibfk_2')
          ) {
            msg = 'Não é possível excluir a pessoa: ela está vinculada a um lançamento.';
          }
        } catch (e) { }

      } else {
        msg = 'Erro ao processar serviço remoto. Tente novamente.';
      }

      console.error('Erro:', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Erro:', errorResponse);
    }

    this.toastr.error(msg);
  }
}
