import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibindoMenu: boolean = true;
  
  alternarMenu() {
    this.exibindoMenu = !this.exibindoMenu;
    console.log('Menu exibido:', this.exibindoMenu); // debug
  }

}
