import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastr: ToastrService) { }

  handle(errorResponse: any) {
    let msg = '';

    if (typeof errorResponse === 'string') {
      msg = errorResponse
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.toastr.error(msg);
  }

}
