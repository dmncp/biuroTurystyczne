import { Component, OnInit } from '@angular/core';
import {Trip} from '../../models/trip-model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateValidator, validEndDate} from '../add-trip/add-trip.component';
import {TripsService} from '../../services/trips.service';

@Component({
  selector: 'app-modify-trip-details',
  templateUrl: './modify-trip-details.component.html',
  styleUrls: ['./modify-trip-details.component.css']
})
export class ModifyTripDetailsComponent implements OnInit {
  tripDetails: Trip = null;
  submitted = false;
  modelForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private tripService: TripsService) {
  }

  ngOnInit(): void {
    this.tripDetails = history.state.data;
    this.modelForm = this.formBuilder.group({
      tripTitle: [''],
      destination: [''],
      startDate: ['', [DateValidator.validStartDate]],
      endDate: [''],
      price: [''],
      places: [''],
      description: [''],
      url: ''
    }, {validator: validEndDate});
  }

  onSubmit(): void{
    this.submitted = true;
    this.tripService.updateTrip(this.tripDetails.key, {description: this.tripDetails.description,
      destination: this.tripDetails.destination, endDate: this.tripDetails.endDate, places: this.tripDetails.places,
      price: this.tripDetails.price, startDate: this.tripDetails.startDate, tripTitle: this.tripDetails.tripTitle,
      url: this.tripDetails.url});
  }
}
