import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/authService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Wycieczki-v2';

  constructor(public authService: AuthService) {}

  logOut(): any{
    this.authService.SignOut();
  }

  ngOnInit(): void {
    this.authService.usersList();
  }


}
