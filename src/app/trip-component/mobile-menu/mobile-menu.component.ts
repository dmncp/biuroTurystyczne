import {Component, OnInit, Input, HostListener} from '@angular/core';
import {AuthService} from '../../services/authService';


@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent implements OnInit {
  navBarOpen = false;
  constructor(public authService: AuthService) {}


  @HostListener('document:click', ['$event'])
  onClick(ev: MouseEvent): void{
    const ul = document.getElementById('mobileMenu');
    const burger = document.getElementById('burgerNav');
    const burEle = document.getElementsByClassName('burgerElem');
    const targetElement = ev.target; // clicked element
    if (targetElement === ul) {
      this.navBarOpen = true;
    } else if (targetElement === burger || targetElement === burEle[0] || targetElement === burEle[1] || targetElement === burEle[2]){
      this.navBarOpen = !this.navBarOpen;
    } else{
      this.navBarOpen = false;
    }
  }
  ngOnInit(): void {
  }
}


