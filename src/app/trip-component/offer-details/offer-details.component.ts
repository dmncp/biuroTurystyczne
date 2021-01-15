import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../models/trip-model';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {
  tripDetails: Trip = null;

  constructor() {
  }

  ngOnInit(): void {
    this.tripDetails = history.state.data;
  }

}
