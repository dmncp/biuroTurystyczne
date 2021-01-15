import { Injectable } from '@angular/core';
import {Trip} from '../models/trip-model';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TripsService{
  trips: AngularFireList<Trip> = null;

  constructor(private db: AngularFireDatabase){
    this.trips = db.list('trips');
  }

  createTrip(trip: Trip): void{
    trip.reservedPlaces = 0;
    trip.sumOfRatings = 0;
    trip.numberOfRatings = 0;
    this.trips.push(trip);
  }
  updateTrip(key: string, value: any): void{
    this.trips.update(key, value);
  }
  deleteTrip(key: string): void{
    this.trips.remove(key);
  }
  getTripsList(): AngularFireList<Trip>{
    return this.trips;
  }
  deleteAll(): void{
    this.trips.remove();
  }

}
