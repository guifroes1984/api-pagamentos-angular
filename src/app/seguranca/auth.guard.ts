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
  } 
  
  // VERIFICAÇÃO ESPECIAL PARA ADMIN (pelo nome)
  if (roles && roles.includes('ROLE_ADMIN')) {
    // Usa o método isAdmin() que verifica pelo nome
    if (!auth.isAdmin()) {
      console.warn('Acesso negado: Usuário não é administrador');
      router.navigate(['/pagina-nao-autorizado']);
      return false;
    }
  } 
  // Verificação normal para outras roles
  else if (roles && !auth.temQualquerPermissao(roles)) {
    router.navigate(['/pagina-nao-autorizado']);
    return false;
  }

  return true;
};