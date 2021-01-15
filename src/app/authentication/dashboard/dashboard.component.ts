import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authService';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.usersList();
  }
}
