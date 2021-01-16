import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {User} from '../models/user';
import {Trip} from "../models/trip-model";


@Injectable({
  providedIn: 'root'
})
export class UserService{
  users: AngularFireList<User> = null;

  constructor(private db: AngularFireDatabase){
    this.users = db.list('users');
  }

  createUser(user: User): void{
    this.users.push({uid: user.uid, email: user.email,
      reservedTrips: [{tripKey: 'test', reservedPlaces: 0, rate: 0}], trips: ['test'], userType: 'Reader'});
  }
  updateUser(key: string, value: any): void{
    this.users.update(key, value);
  }
  deleteUser(key: string): void{
    this.users.remove(key);
  }
  getUsersList(): AngularFireList<User>{
    return this.users;
  }
  deleteAll(): void{
    this.users.remove();
  }
  getTripsList(user: User): any{
    return user.reservedTrips;
  }
  addNewTrip(user: User, tripKey: string): any{
    user.reservedTrips.push({tripKey, reservedPlaces: 1, rate: 0});
    user.trips.push(tripKey);
    this.updateUser(user.key, {reservedTrips: user.reservedTrips, trips: user.trips});
  }

  deleteTrip(user: User, tripKey: string): any{
    user.trips = user.trips.filter(e => {
      return e !== tripKey;
    });
  }
  getTrip(user: User, tripKey: string): any{
    if (user === null || user === undefined || user.reservedTrips === undefined){
      return null;
    }
    const trip = user.reservedTrips.filter(e => {
      return e.tripKey === tripKey;
    });
    return trip[0];
  }
  findAndDelete(user: User, tripKey: string): any{
    const reservedTrips = user.reservedTrips.filter(e => {
      return e.tripKey === tripKey;
    });
    user.reservedTrips = user.reservedTrips.filter(e => {
      return e.tripKey !== tripKey;
    });
    return reservedTrips[0];
  }
  tripReservedPlaces(user: User, tripKey: string): any{
    const reservedTrips = this.findAndDelete(user, tripKey);
    reservedTrips.reservedPlaces++;
    user.reservedTrips.push(reservedTrips);
    this.updateUser(user.key, {reservedTrips: user.reservedTrips});
  }
  resignTrip(user: User, tripKey: string): any{
    const reservedTrips = this.findAndDelete(user, tripKey);
    reservedTrips.reservedPlaces--;
    if (reservedTrips.reservedPlaces > 0){
      user.reservedTrips.push(reservedTrips);
    } else{
      this.deleteTrip(user, tripKey);
    }
    this.updateUser(user.key, {reservedTrips: user.reservedTrips, trips: user.trips});
  }

  changeRating(user: User, tripKey: string, newRating: number): any{
    const reservedTrip = this.findAndDelete(user, tripKey);
    reservedTrip.rate = newRating;
    user.reservedTrips.push(reservedTrip);
    this.updateUser(user.key, {reservedTrips: user.reservedTrips});
  }
}

@Pipe({name: 'userTripsPipe'})
export class UserTripsPipe implements PipeTransform{
  transform(trips: Trip[], user: User): Trip[] {
    if (user === undefined || !trips){
      return [];
    }
    if (user === null || user.userType !== 'Reader'){
      return trips;
    }
    else{
      return trips.filter(e => {
        return e.places !== e.reservedPlaces;
      });
    }
  }
}
