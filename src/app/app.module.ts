import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing-modules/app-routing.module';

// components
import { AppComponent } from './app.component';
import { TripsListComponent } from './trip-component/trips-list/trips-list.component';
import { TripDetailsComponent } from './trip-component/trip-details/trip-details.component';
import { AddTripComponent } from './trip-component/add-trip/add-trip.component';
import { ReserveButtonComponent } from './buttons/reserve-button/reserve-button.component';
import { StarRatingComponent } from './buttons/star-rating/star-rating.component';
import { ShoppingCartComponent } from './trip-component/shopping-cart/shopping-cart.component';
import { FiltersComponent } from './filters/filters.component';
import { OfferDetailsComponent } from './trip-component/offer-details/offer-details.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { DashboardComponent } from './authentication/dashboard/dashboard.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { AdminSettingsComponent } from './authentication/admin-settings/admin-settings.component';

// forms
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// databases
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';

// pipes
import {SearchLocationPipe, NumberPipe, DatePipe} from './filters/filters.component';
import { SeeOfferBtnComponent } from './buttons/see-offer-btn/see-offer-btn.component';
import {UserTripsPipe} from './services/userService';

// auth
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AuthService} from './services/authService';
import { EditTripsComponent } from './trip-component/edit-trips/edit-trips.component';
import { ModifyTripDetailsComponent } from './trip-component/modify-trip-details/modify-trip-details.component';
import { MobileMenuComponent } from './trip-component/mobile-menu/mobile-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    TripsListComponent,
    TripDetailsComponent,
    AddTripComponent,
    ReserveButtonComponent,
    StarRatingComponent,
    ShoppingCartComponent,
    FiltersComponent,
    SearchLocationPipe,
    DatePipe,
    NumberPipe,
    OfferDetailsComponent,
    SeeOfferBtnComponent,
    SignInComponent,
    DashboardComponent,
    RegistrationComponent,
    AdminSettingsComponent,
    UserTripsPipe,
    EditTripsComponent,
    ModifyTripDetailsComponent,
    MobileMenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
