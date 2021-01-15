import {TripsListComponent} from '../trip-component/trips-list/trips-list.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddTripComponent} from '../trip-component/add-trip/add-trip.component';
import {ShoppingCartComponent} from '../trip-component/shopping-cart/shopping-cart.component';
import {OfferDetailsComponent} from '../trip-component/offer-details/offer-details.component';
import {SignInComponent} from '../authentication/sign-in/sign-in.component';
import {DashboardComponent} from '../authentication/dashboard/dashboard.component';
import {RegistrationComponent} from '../authentication/registration/registration.component';
import {AuthGuard} from '../authentication/auth.guard';
import {AdminSettingsComponent} from '../authentication/admin-settings/admin-settings.component';
import {AdminGuard} from '../authentication/admin.guard';
import {EditTripsComponent} from '../trip-component/edit-trips/edit-trips.component';
import {ModifyTripDetailsComponent} from '../trip-component/modify-trip-details/modify-trip-details.component';
import {EmployeeGuard} from '../authentication/employee.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tripsList', pathMatch: 'full' },
  { path: 'tripsList', component: TripsListComponent },
  { path: 'edit/add', component: AddTripComponent, canActivate: [EmployeeGuard]},
  { path: 'shoppingCart', component: ShoppingCartComponent},
  { path: 'tripsList/offer-details/:key', component: OfferDetailsComponent},
  { path: 'signIn', component: SignInComponent},
  { path: 'edit', component: EditTripsComponent, canActivate: [EmployeeGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'signIn/signUp', component: RegistrationComponent},
  { path: 'dashboard/adminSettings', component: AdminSettingsComponent, canActivate: [AdminGuard]},
  { path: 'edit/modifyTrip/:key', component: ModifyTripDetailsComponent, canActivate: [EmployeeGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
