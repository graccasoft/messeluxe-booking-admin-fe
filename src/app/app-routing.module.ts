import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { BookingsComponent } from './admin-pages/bookings/bookings.component';
import { LoginComponent } from './login/login.component';
import { PlaceBookingComponent } from './admin-pages/place-booking/place-booking.component';
import { GuestBookComponent } from './admin-pages/guest-book/guest-book.component';
import { PropertiesComponent } from './admin-pages/properties/properties.component';
import { AddPropertyComponent } from './admin-pages/add-property/add-property.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'admin', component: AdminPagesComponent,
    canActivate: [],
    children: [
      { path: '', component: BookingsComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'place-booking', component: PlaceBookingComponent },
      { path: 'guest-book', component: GuestBookComponent },
      { path: 'properties', component: PropertiesComponent },
      { path: 'add-property', component: AddPropertyComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
