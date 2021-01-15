import {Component, Input, OnInit} from '@angular/core';
import {TripsService} from '../../services/trips.service';
import {Router} from '@angular/router';
import {Trip} from '../../models/trip-model';

@Component({
  selector: 'app-see-offer-btn',
  templateUrl: './see-offer-btn.component.html',
  styleUrls: ['./see-offer-btn.component.css']
})
export class SeeOfferBtnComponent implements OnInit {
  @Input() trip: Trip;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  pushData(): void{
    this.router.navigate(['tripsList/offer-details/' + this.trip.key], {state: {data: this.trip}});
  }
}
