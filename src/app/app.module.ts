import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { BookingsComponent } from './admin-pages/bookings/bookings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { LoginComponent } from './login/login.component';
import { PlaceBookingComponent } from './admin-pages/place-booking/place-booking.component';
import { GuestBookComponent } from './admin-pages/guest-book/guest-book.component';
import { PropertiesComponent } from './admin-pages/properties/properties.component';
import { PropertyComponent } from './admin-pages/property/property.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { TableModule } from 'primeng/table';
import { AddPropertyComponent } from './admin-pages/add-property/add-property.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminPagesComponent,
    BookingsComponent,
    LoginComponent,
    PlaceBookingComponent,
    GuestBookComponent,
    PropertiesComponent,
    PropertyComponent,
    AddPropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
