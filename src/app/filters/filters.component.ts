import {Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform} from '@angular/core';
import {Trip} from '../models/trip-model';
import {FormGroup, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import {validEndDate} from '../trip-component/add-trip/add-trip.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  showFilterOption = false;
  modelForm: FormGroup;

  @Input() prices: number[] = [];
  @Output() sendFilters = new EventEmitter<FormGroup>();

  onSubmit(form): void {
    this.sendFilters.emit(form.value);
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      destination: '',
      startDate: '',
      endDate: '',
      minPrice: Math.min.apply(Math, this.prices),
      maxPrice: Math.max.apply(Math, this.prices),
      minRate: 0,
      maxRate: 5
    }, {validators: [validEndDate, validPrice, validRate]});
  }

}

@Pipe({name: 'searchLocationPipe'})
export class SearchLocationPipe implements PipeTransform{
  transform(trips: Trip[], searchLocation: string): Trip[] {
    if (!trips){
      return [];
    }
    if (!searchLocation){
      return trips;
    }
    searchLocation = searchLocation.toLowerCase();
    return trips.filter(e => {
      return e.destination.toLowerCase().includes(searchLocation);
    });
  }
}

@Pipe({name: 'datePipe'})
export class DatePipe implements PipeTransform{
  transform(trips: Trip[], startDate: string, endDate: string): Trip[] {
    if (!trips){
      return [];
    }
    if (!startDate && !endDate){
      return trips;
    }
    if (startDate === '' && endDate !== ''){
      return trips.filter(e => {
        return changeDateWriteMethod(e.endDate) <= endDate;
      });
    }
    if (startDate !== '' && endDate === ''){
      return trips.filter(e => {
        return changeDateWriteMethod(e.startDate) >= startDate;
      });
    }
    return trips.filter(e => {
      return changeDateWriteMethod(e.startDate) >= startDate && changeDateWriteMethod(e.endDate) <= endDate;
    });
  }
}

@Pipe({name: 'numberPipe'})
export class NumberPipe implements PipeTransform {
  transform(trips: Trip[], minNumber: any[], maxNumber: any[]): Trip[] {
    if (!trips) {
      return [];
    }
    if (!minNumber && !maxNumber) {
      return trips;
    }
    if (minNumber[0] === 'rate') {
      return trips.filter(e => {
        return e.rate >= minNumber[1] && e.rate <= maxNumber[1];
      });
    }
    else if (minNumber[0] === 'price') {
      return trips.filter(e => {
        return e.price >= minNumber[1] && e.price <= maxNumber[1];
      });
    }
  }
}

function validPrice(control: AbstractControl): { [key: string]: any } {
  if (control.get('maxPrice').value < control.get('minPrice').value){
    control.get('maxPrice').setErrors({validPrice: true});
    return {validPrice: true};
  }
  else{
    control.get('maxPrice').setErrors(null);
  }
  return null;
}
function validRate(control: AbstractControl): { [key: string]: any } {
  if (control.get('maxRate').value < control.get('minRate').value){
    control.get('maxRate').setErrors({validRate: true});
    return {validRate: true};
  }
  else{
    control.get('maxRate').setErrors(null);
  }
  return null;
}

// tslint:disable-next-line:max-line-length
function  changeDateWriteMethod(date: string): string{ // konieczne przy poprawnym porownywaniu dat - najpierw rok, pozniej miesiac a na koncu dzien
  const tmpArr = date.split('-');
  return tmpArr[0] + '.' + tmpArr[1] + '.' + tmpArr[2];
}
