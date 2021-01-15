import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../models/trip-model';
import {TripsService} from '../../services/trips.service';
import {AuthService} from '../../services/authService';
import {UserService} from '../../services/userService';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnInit {
  @Input() trip: Trip;
  actualUser: any;
  rated = false;

  constructor(private tripService: TripsService, public authService: AuthService, public userService: UserService) { }

  ngOnInit(): void {
    this.authService.usersList();
    this.actualUser = this.authService.actualUser;
  }
  rate(rating: number): void{
    if (this.authService.isLoggedIn && this.actualUser.trips.includes(this.trip.key) &&
      this.userService.getTrip(this.actualUser, this.trip.key).rate === 0
    ){
      this.trip.rate = this.tripRatingActualization(rating);
      this.tripService.updateTrip(this.trip.key, {rate: this.trip.rate, numberOfRatings: this.trip.numberOfRatings,
        sumOfRatings: this.trip.sumOfRatings});
      this.userService.changeRating(this.actualUser, this.trip.key, rating);
      this.rated = true;
    }
  }
  changeColor = function(divNum: number, type: number): string{
    const trip = type === 1 ? this.trip : this.userService.getTrip(this.actualUser, this.trip.key);
    if (divNum <= trip.rate){
      return 'gold';
    }
    return 'black';
  };
  tripRatingActualization(addedRating: number): number{
      const rate = (this.trip.sumOfRatings + addedRating) / (this.trip.numberOfRatings + 1);
      this.trip.numberOfRatings++;
      this.trip.sumOfRatings += addedRating;
      return rate;
  }

  changeCursor(): string{
    const trip = this.userService.getTrip(this.actualUser, this.trip.key);
    if (trip === null || trip.rate !== 0){ return 'default'; }
    return 'pointer';
  }
}
