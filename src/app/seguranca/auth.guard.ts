import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => { 

  const auth = inject(AuthService);
  const router = inject(Router);

   const roles = route.data?.['roles'] as string[];

  if (roles && !auth.temQualquerPermissao(roles)) {
    router.navigate(['/pagina-nao-autorizado']);
    return false;
  }

  return true;
};
