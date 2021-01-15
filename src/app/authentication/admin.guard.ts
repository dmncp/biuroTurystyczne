import {Injectable} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {AuthService} from '../services/authService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate{
  actualUser: any;
  constructor(
    public authService: AuthService,
    public router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.usersList();
    this.actualUser = this.authService.actualUser;
    if (this.authService.isLoggedIn && (this.actualUser === undefined || this.actualUser.userType !== 'admin')) {
      this.router.navigate(['dashboard']);
    } else if (!this.authService.isLoggedIn){
      this.router.navigate(['signIn']);
    }
    return true;
  }
}
