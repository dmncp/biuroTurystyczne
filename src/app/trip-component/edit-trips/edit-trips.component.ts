import { Component, OnInit } from '@angular/core';
import {TripsService} from '../../services/trips.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Trip} from '../../models/trip-model';
import {AuthService} from '../../services/authService';

@Component({
  selector: 'app-edit-trips',
  templateUrl: './edit-trips.component.html',
  styleUrls: ['./edit-trips.component.css']
})
export class EditTripsComponent implements OnInit {
  public trips: any;
  constructor(private tripService: TripsService, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.getTripsList();
    this.authService.usersList();
  }
  getTripsList(): void{
    this.tripService.getTripsList().snapshotChanges().pipe(
      map(
        changes => changes.map(c => ({key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data => {
      this.trips = data;
    });
  }

  addTripRoute(): void{
    this.router.navigate(['edit/add']);
  }

  deleteTrip(tripKey: string): void{
    this.tripService.deleteTrip(tripKey);
  }

  modifyTrip(trip: Trip): void{
    this.router.navigate(['edit/modifyTrip/' + trip.key], {state: {data: trip}});
  }
}
