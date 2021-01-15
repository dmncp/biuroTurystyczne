import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {Trip} from '../../models/trip-model';
import {TripsService} from '../../services/trips.service';
import {AuthService} from '../../services/authService';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {
  trip: Trip = new Trip();
  submitted = false;
  modelForm: FormGroup;

  constructor(private tripService: TripsService, private formBuilder: FormBuilder, public authService: AuthService) { }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      tripTitle: ['', [Validators.required, Validators.minLength(3)]],
      destination: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', [Validators.required, DateValidator.validStartDate]],
      endDate: ['', [Validators.required]],
      price: ['', Validators.required],
      places: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      url: ''
    }, {validator: validEndDate});
  }

  newTrip(): void{
    this.submitted = false;
    this.trip = new Trip();
  }
  save(): void{
    this.tripService.createTrip(this.trip);
    this.trip = new Trip();
  }

  onSubmit(): void{
    this.submitted = true;
    this.save();
  }
}

export class DateValidator{
  static validStartDate(control: FormControl): { [key: string]: any } {
    const today = new Date().toISOString().slice(0, 10);
    if (today > control.value){
      return {validDate: true};
    }
    return null;
  }
}

export function validEndDate(control: AbstractControl): { [key: string]: any } {
  if (!control.get('startDate').value || !control.get('endDate').value){
    return null;
  }
  if (control.get('endDate').value < control.get('startDate').value){
    control.get('endDate').setErrors({validEndDate: true});
    return {validEndDate: true};
  }
  else{
    control.get('endDate').setErrors(null);
  }
  return null;
}
