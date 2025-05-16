import { Component } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibindoMenu: boolean = false;

  constructor(public auth: AuthService ) { }
  
  alternarMenu() {
    this.exibindoMenu = !this.exibindoMenu;
  }

  public criarNovoAccessToken() {
    this.auth.obterNovoAccessToken();
  }

}
