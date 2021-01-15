import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../models/trip-model';
import {TripsService} from '../../services/trips.service';
import {AuthService} from '../../services/authService';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  @Input() trip: Trip;
  @Input() prices: number[];

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.usersList();
  }
  divColor(): string{
    if (this.trip.places - this.trip.reservedPlaces <= 3){ return 'IndianRed'; }
    else if (this.trip.price === Math.min.apply(Math, this.prices)){ return 'LightGreen'; }
    else if (this.trip.price === Math.max.apply(Math, this.prices)) { return 'Salmon'; }
    return 'white';
  }
}

