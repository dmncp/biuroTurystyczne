import { Component, OnInit } from '@angular/core';
import {TripsService} from '../../services/trips.service';
import { map } from 'rxjs/operators';
import {AuthService} from '../../services/authService';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.css']
})
export class TripsListComponent implements OnInit {
  public trips: any;
  filters: any = ['', '', '', '', '', ''];

  constructor(private tripService: TripsService, public authService: AuthService) { }

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

  prices(): number[]{ // do filtrowania przedzialu cenowego
    const prices = [];
    if (this.trips !== undefined){
      for (const i of this.trips){
        prices.push(i.price);
      }
      return prices;
    } else{
      return [0];
    }

  }

  receiveFilters(filters): void{
    this.filters[0] = filters.destination;
    this.filters[1] = reformatDate(filters.startDate);
    this.filters[2] = reformatDate(filters.endDate);
    // tslint:disable-next-line:max-line-length
    this.filters[3] = ['price', filters.minPrice]; // stringi sa tylko po to zeby sprawdzic w pipe'ie co porownujemy i dzieki temu nie musimy robic kolejnych piepe'ow
    this.filters[4] = ['price', filters.maxPrice];
    this.filters[5] = ['rate', filters.minRate];
    this.filters[6] = ['rate', filters.maxRate];
  }
}

function reformatDate(date: string): string{
  if (date === ''){
    return '';
  }
  const tmpArr = date.split('-');
  return tmpArr[0] + '.' + tmpArr[1] + '.' + tmpArr[2];
}
