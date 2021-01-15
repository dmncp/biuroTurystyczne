import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authService';
import {User} from '../../models/user';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
  option = this.authService.sessionType;
  users: User[];
  newRole: any;
  constructor(public authService: AuthService){}

  ngOnInit(): void {
    this.authService.usersList();
    this.users = this.authService.firebaseUsersList;
  }
  choosePersistence(option): any{
    this.option = option;
    this.authService.changePersistence(option);
  }
  choose(user: User): any{
    this.authService.changeRole(this.newRole, user);
  }
  roleActualization(event): any{
    this.newRole = event.value;
  }
}
