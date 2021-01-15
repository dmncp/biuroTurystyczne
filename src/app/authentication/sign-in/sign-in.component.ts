import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/authService';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  modelForm: FormGroup;
  email: string;
  password: string;
  constructor(private formBuilder: FormBuilder, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  navigateToRegistration(): void{
    this.router.navigate(['signIn/signUp']);
  }

  save(): void{
    this.authService.SignIn(this.email, this.password);
  }

}
