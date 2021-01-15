import {Component, OnInit} from '@angular/core';
import {TripsService} from '../../services/trips.service';
import {map} from 'rxjs/operators';
import {AuthService} from '../../services/authService';
import {UserService} from '../../services/userService';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public trips: any;
  userTrips: any;
  actualUser: any;

  constructor(private userService: UserService, public authService: AuthService, private tripService: TripsService) { }

  ngOnInit(): void {
    this.getTripsList();
    this.authService.usersList();
    this.actualUser = this.authService.actualUser;
    this.userTrips = this.authService.actualUserReservedTrips;
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

  actualSum(): number{
    if (this.actualUser === null || this.actualUser === undefined){
      return 0;
    }
    let sum = 0;
    this.userTrips.filter(e => {
      if (this.tripDetails(e.tripKey) !== undefined){
        sum += this.getTripPrice(e.tripKey) * e.reservedPlaces;
      }
    });
    return sum;
  }
  getTripName(tripKey: string): any{
    if (this.tripDetails(tripKey) !== undefined){
      return this.tripDetails(tripKey).tripTitle;
    }
    return '';
  }
  getTripDestination(tripKey: string): any{
    if (this.tripDetails(tripKey) !== undefined){
      return this.tripDetails(tripKey).destination;
    }
    return '';
  }
  getTripPrice(tripKey: string): any{
    if (this.tripDetails(tripKey) !== undefined){
      return this.tripDetails(tripKey).price;
    }
    return 0;
  }
  tripDetails(tripKey: string): any{
    if (this.trips !== undefined){
      const trip = this.trips.filter(e => {
        return e.key === tripKey;
      });
      return trip[0];
    }
  }

}
