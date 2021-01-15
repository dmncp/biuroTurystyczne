import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/authService';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  modelForm: FormGroup;
  userName: string;
  email: any;
  password: any;
  constructor(private formBuilder: FormBuilder, public authService: AuthService) { }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  save(): void{
    this.authService.SignUp(this.email, this.password);
  }

}
