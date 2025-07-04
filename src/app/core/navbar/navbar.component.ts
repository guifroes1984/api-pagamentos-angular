import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu: boolean = false;
  rotaAtual: string = '';

  constructor(
    public auth:           AuthService, 
    private logoutService: LogoutService, 
    private errorHandler:  ErrorHandler, 
    private router:        Router
  ) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.rotaAtual = event.urlAfterRedirects;
      });
  }

  alternarMenu(): void {
    this.exibindoMenu = !this.exibindoMenu;
  }

  criarNovoAccessToken(): void {
    this.auth.obterNovoAccessToken();
  }

  logout(): void {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handleError(erro));
  }

  rotaAtualEhLoginOuCadastro(): boolean {
    const url = this.router.url;
    return url === '/login' || url === '/login/cadastro-usuario';
  }

}
