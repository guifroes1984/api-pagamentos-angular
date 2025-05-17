import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => { 

  const auth = inject(AuthService);
  const router = inject(Router);

   const roles = route.data?.['roles'] as string[];

  if (auth.isAccessTokenInvalido()) {
    console.log('Navegação com access token inválido. Obtendo novo token...');

    return auth.obterNovoAccessToken()
      .then(() => {
        if (auth.isAccessTokenInvalido()) {
          router.navigate(['/login']);
          return false;
        }
        return true;
      });
  } else if (roles && !auth.temQualquerPermissao(roles)) {
    router.navigate(['/pagina-nao-autorizado']);
    return false;
  }

  return true;
};
