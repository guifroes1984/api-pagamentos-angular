import { Component, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LogoutService } from 'src/app/seguranca/logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibindoMenu: boolean = false;

  constructor(
    public auth:           AuthService, 
    private logoutService: LogoutService, 
    private errorHandler:  ErrorHandler, 
    private router:        Router
   ) { }
  
  alternarMenu() {
    this.exibindoMenu = !this.exibindoMenu;
  }

  public criarNovoAccessToken() {
    this.auth.obterNovoAccessToken();
  }

  public logout() {
    this.logoutService.logout()
     .then(() => {
      this.router.navigate(['/login']);
     })
     .catch(erro => this.errorHandler.handleError(erro));
  }

}
