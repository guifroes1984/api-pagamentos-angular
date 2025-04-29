import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastr: ToastrService) { }

  handle(errorResponse: any) {
    let msg = '';

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = 'Ocorreu um erro ao processar a sua solicitação.';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar a sua solicitação.';
      }

      try {
        const errors = errorResponse.error;

        if (errors && errors.length > 0 && errors[0].mensagemUsuario) {
          msg = errors[0].mensagemUsuario;
        }
      } catch (e) { }

      console.error('Erro:', errorResponse);
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Erro:', errorResponse);
    }

    this.toastr.error(msg);
  }

}
