import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { AuthService } from './service/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptorService } from './service/auth-http-interceptor.service';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { CalenderViewComponent } from './admin-pages/calender-view/calender-view.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BookingModalComponent } from './admin-pages/booking-modal/booking-modal.component';
import { ImageModule } from 'primeng/image';
import { AdditionalServicesComponent } from './admin-pages/additional-services/additional-services.component';

export function initializeAuth(authService: AuthService) {
  return (): Promise<any> => {
    return authService.initialize();
  }
}
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
    AddPropertyComponent,
    FileUploadComponent,
    CalenderViewComponent,
    BookingModalComponent,
    AdditionalServicesComponent
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
    TableModule,
    MatSnackBarModule,
    FileUploadModule,
    DialogModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ImageModule


  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
