import {Component, Input, OnInit, Output} from '@angular/core';
import {TripsService} from '../../services/trips.service';
import {Trip} from '../../models/trip-model';
import {UserService} from '../../services/userService';
import {AuthService} from '../../services/authService';

@Component({
  selector: 'app-reserve-button',
  templateUrl: './reserve-button.component.html',
  styleUrls: ['./reserve-button.component.css']
})
export class ReserveButtonComponent implements OnInit {
  @Input() trip: Trip;
  actualUser: any;

  constructor(private tripService: TripsService, public userService: UserService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.usersList();
    this.actualUser = this.authService.actualUser;
  }

  clicker(): void{
    if (this.trip.reservedPlaces + 1 <= this.trip.places){
      this.trip.reservedPlaces++;

      if (this.actualUser !== null && !this.actualUser.trips.includes(this.trip.key)){
        this.userService.addNewTrip(this.actualUser, this.trip.key);
      } else{
        this.userService.tripReservedPlaces(this.actualUser, this.trip.key);
      }
      this.tripService.updateTrip(this.trip.key, {reservedPlaces: this.trip.reservedPlaces});
    }

  }
  resign(): void{
    if (this.trip.reservedPlaces - 1 >= 0){
      this.trip.reservedPlaces--;
      if (this.actualUser !== null && this.actualUser.trips.includes(this.trip.key)){
        this.userService.resignTrip(this.actualUser, this.trip.key);
      }
      this.tripService.updateTrip(this.trip.key, {reservedPlaces: this.trip.reservedPlaces});
    }
  }

  reserveDisab(): boolean{
    if (this.authService.userData === null){
      return true;
    }
    return this.trip.places === this.trip.reservedPlaces;
  }

  resignDisab(): boolean{
    if (this.authService.userData === null){
      return false;
    }

    if (this.actualUser !== null && this.actualUser !== undefined){
      if (!this.actualUser.trips.includes(this.trip.key)){
        return false;
      }
    }
    return this.trip.reservedPlaces > 0;
  }

}
